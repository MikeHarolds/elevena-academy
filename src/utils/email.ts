import { getSettings } from './settings';

export interface EmailLog {
  id: string;
  to: string;
  subject: string;
  status: 'sent' | 'failed' | 'pending';
  type: 'registration' | 'admin_notify' | 'test';
  sentAt: string;
  error?: string;
  childName?: string;
  parentName?: string;
}

function getEmailLogs(): EmailLog[] {
  return JSON.parse(localStorage.getItem('clap_email_logs') || '[]');
}

function saveEmailLogs(logs: EmailLog[]) {
  localStorage.setItem('clap_email_logs', JSON.stringify(logs));
}

function addLog(log: Omit<EmailLog, 'id' | 'sentAt'>): EmailLog {
  const entry: EmailLog = {
    ...log,
    id: `EML-${Date.now()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
    sentAt: new Date().toISOString(),
  };
  const logs = getEmailLogs();
  logs.unshift(entry);
  if (logs.length > 200) logs.length = 200;
  saveEmailLogs(logs);
  return entry;
}

export function getAllEmailLogs(): EmailLog[] {
  return getEmailLogs();
}

export function clearEmailLogs() {
  saveEmailLogs([]);
}

// ==================== TEMPLATE REPLACEMENT ====================
function processTemplate(template: string, data: Record<string, string>): string {
  let result = template;
  Object.entries(data).forEach(([key, value]) => {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  });
  return result;
}

// ==================== SEND VIA EMAILJS ====================
async function sendViaEmailJS(
  serviceId: string,
  templateId: string,
  publicKey: string,
  templateParams: Record<string, string>
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: templateParams,
      }),
    });

    if (response.ok || response.status === 200) {
      return { success: true };
    }
    const text = await response.text();
    return { success: false, error: text || `HTTP ${response.status}` };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : 'Network error' };
  }
}

// ==================== MAIN SEND FUNCTION ====================
interface RegistrationEmailData {
  parentName: string;
  parentEmail: string;
  childName: string;
  childAge: string;
  course: string;
  ticketType: string;
  numChildren: string;
}

export async function sendRegistrationEmail(data: RegistrationEmailData): Promise<{ parentEmail: boolean; adminEmail: boolean }> {
  const settings = getSettings();
  const smtp = settings.smtp;

  const templateData: Record<string, string> = {
    parentName: data.parentName,
    parentEmail: data.parentEmail,
    childName: data.childName,
    childAge: data.childAge,
    course: data.course || 'Not selected',
    ticketType: data.ticketType || 'Not selected',
    numChildren: data.numChildren || '1',
    adminEmail: settings.adminEmail,
    siteName: settings.siteName,
    contactEmail: settings.contactEmail,
    whatsappLink: settings.whatsappLink,
  };

  const parentSubject = processTemplate(smtp.registrationSubject, templateData);
  const parentBody = processTemplate(smtp.registrationBody, templateData);
  const adminSubject = processTemplate(smtp.adminNotifySubject, templateData);

  let parentResult = false;
  let adminResult = false;

  if (smtp.provider === 'none') {
    addLog({
      to: data.parentEmail,
      subject: smtp.registrationSubject,
      status: 'pending',
      type: 'registration',
      error: 'No email provider configured',
      childName: data.childName,
      parentName: data.parentName,
    });
    return { parentEmail: false, adminEmail: false };
  }

  if (smtp.provider === 'emailjs') {
    const baseParams = {
      ...templateData,
      from_name: smtp.smtpFromName || settings.siteName,
    };

    // Send parent confirmation
    const parentResp = await sendViaEmailJS(smtp.emailjsServiceId, smtp.emailjsTemplateId, smtp.emailjsPublicKey, {
      ...baseParams,
      to_email: data.parentEmail,
      to_name: data.parentName,
      subject: parentSubject,
      message: parentBody,
    });

    parentResult = parentResp.success;
    addLog({
      to: data.parentEmail,
      subject: parentSubject,
      status: parentResp.success ? 'sent' : 'failed',
      type: 'registration',
      error: parentResp.error,
      childName: data.childName,
      parentName: data.parentName,
    });

    // Send admin notification
    if (smtp.adminNotifyEnabled) {
      const adminResp = await sendViaEmailJS(smtp.emailjsServiceId, smtp.emailjsTemplateId, smtp.emailjsPublicKey, {
        ...baseParams,
        to_email: settings.adminEmail,
        to_name: 'Admin',
        subject: adminSubject,
        message: `New registration from ${data.parentName}\n\nChild: ${data.childName} (Age ${data.childAge})\nCourse: ${data.course}\nTicket: ${data.ticketType}\nChildren: ${data.numChildren}\nParent Email: ${data.parentEmail}`,
      });
      adminResult = adminResp.success;
      addLog({
        to: settings.adminEmail,
        subject: adminSubject,
        status: adminResp.success ? 'sent' : 'failed',
        type: 'admin_notify',
        error: adminResp.error,
        childName: data.childName,
        parentName: data.parentName,
      });
    }
  }

  return { parentEmail: parentResult, adminEmail: adminResult };
}

// ==================== TEST EMAIL ====================
export async function sendTestEmail(toEmail: string): Promise<{ success: boolean; error?: string }> {
  const settings = getSettings();
  const smtp = settings.smtp;

  if (smtp.provider === 'none') {
    return { success: false, error: 'No email provider configured. Select EmailJS and enter credentials.' };
  }

  if (smtp.provider === 'emailjs') {
    const result = await sendViaEmailJS(smtp.emailjsServiceId, smtp.emailjsTemplateId, smtp.emailjsPublicKey, {
      to_email: toEmail,
      to_name: 'Test Recipient',
      from_name: smtp.smtpFromName || settings.siteName,
      subject: `Test Email from ${settings.siteName}`,
      message: `Hello! This is a test email from ${settings.siteName}.\n\nIf you received this, your email configuration is working correctly! 🎉\n\nTimestamp: ${new Date().toLocaleString()}`,
    });

    addLog({
      to: toEmail,
      subject: `Test Email from ${settings.siteName}`,
      status: result.success ? 'sent' : 'failed',
      type: 'test',
      error: result.error,
    });

    return result;
  }

  return { success: false, error: 'Unknown provider' };
}
