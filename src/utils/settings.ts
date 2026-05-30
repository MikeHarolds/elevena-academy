export interface SmtpSettings {
  provider: 'emailjs' | 'custom' | 'none';
  // EmailJS fields
  emailjsServiceId: string;
  emailjsTemplateId: string;
  emailjsPublicKey: string;
  // Custom SMTP fields (for documentation / future backend)
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPass: string;
  smtpFromName: string;
  smtpFromEmail: string;
  smtpEncryption: 'tls' | 'ssl' | 'none';
  // Email content
  registrationSubject: string;
  registrationBody: string;
  adminNotifySubject: string;
  adminNotifyEnabled: boolean;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  adminEmail: string;
  adminPassword: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  whatsappLink: string;
  socialFacebook: string;
  socialTwitter: string;
  socialInstagram: string;
  socialLinkedin: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  currency: string;
  registrationOpen: boolean;
  showCountdown: boolean;
  campStartDate: string;
  metaTitle: string;
  metaDescription: string;
  googleAnalyticsId: string;
  smtp: SmtpSettings;
  updatedAt: string;
}

export function getSettings(): SiteSettings {
  const stored = localStorage.getItem('clap_settings');
  if (stored) return JSON.parse(stored);
  const defaults = getDefaultSettings();
  localStorage.setItem('clap_settings', JSON.stringify(defaults));
  return defaults;
}

export function saveSettings(settings: SiteSettings) {
  localStorage.setItem('clap_settings', JSON.stringify({ ...settings, updatedAt: new Date().toISOString() }));
}

export function getDefaultSettings(): SiteSettings {
  return {
    siteName: 'Clap Academy',
    tagline: 'Empowering the next generation with AI, coding, and digital creativity skills.',
    adminEmail: 'admin@clapacademy.co.uk',
    adminPassword: 'Admin@2025',
    contactEmail: 'hello@clapacademy.co.uk',
    contactPhone: '+44 20 1234 5678',
    whatsappNumber: '+44 20 1234 5678',
    whatsappLink: 'https://wa.me/442012345678',
    socialFacebook: 'https://facebook.com/clapacademy',
    socialTwitter: 'https://twitter.com/clapacademy',
    socialInstagram: 'https://instagram.com/clapacademy',
    socialLinkedin: 'https://linkedin.com/company/clapacademy',
    heroTitle: 'Turn Your Child\'s Holiday Into a Superpower! 🦸',
    heroSubtitle: 'A fun, safe 3-day online camp where kids learn to create with AI, build digital skills, and have a blast — all from home!',
    heroCtaText: 'Reserve Your Child\'s Spot',
    currency: '£',
    registrationOpen: true,
    showCountdown: false,
    campStartDate: '',
    metaTitle: 'Clap Academy – AI Creator Camp for Kids',
    metaDescription: 'Fun online AI and coding camps for kids aged 5-16. Web dev, Canva design, French, Python and more.',
    googleAnalyticsId: '',
    smtp: {
      provider: 'none',
      emailjsServiceId: '',
      emailjsTemplateId: '',
      emailjsPublicKey: '',
      smtpHost: '',
      smtpPort: '587',
      smtpUser: '',
      smtpPass: '',
      smtpFromName: 'Clap Academy',
      smtpFromEmail: 'hello@clapacademy.co.uk',
      smtpEncryption: 'tls',
      registrationSubject: '🎉 Registration Confirmed – Clap Academy Camp',
      registrationBody: `Hello {parentName},

Thank you for registering {childName} for the Clap Academy Online Camp! 🚀

Here are your registration details:

📋 Registration Summary
━━━━━━━━━━━━━━━━━━━━
• Child: {childName} (Age {childAge})
• Course: {course}
• Ticket: {ticketType}
• Number of Children: {numChildren}

We'll send you more details closer to the camp start date. If you have any questions, reply to this email or WhatsApp us!

See you soon,
The Clap Academy Team 💜`,
      adminNotifySubject: '📋 New Camp Registration',
      adminNotifyEnabled: true,
    },
    updatedAt: new Date().toISOString(),
  };
}
