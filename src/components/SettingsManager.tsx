import { useState, useEffect } from 'react';
import { Settings, Save, AlertCircle, CheckCircle, Mail, Phone, Globe, Shield, Eye, EyeOff, MessageSquare, Send, Server, FileText, Bell, TestTube } from 'lucide-react';
import { getSettings, saveSettings } from '../utils/settings';
import type { SiteSettings, SmtpSettings } from '../utils/settings';
import { sendTestEmail } from '../utils/email';

function SettingGroup({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 border-b border-gray-100">
        {icon}
        <h3 className="font-bold text-gray-800">{title}</h3>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
}

export default function SettingsManager() {
  const [form, setForm] = useState<SiteSettings>(getSettings);
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => { setForm(getSettings()); }, []);

  const set = (key: string, value: string | boolean | Record<string, unknown>) => setForm(p => ({ ...p, [key]: value }));
  const setSmtp = (key: keyof SmtpSettings, value: string | boolean) => setForm(p => ({ ...p, smtp: { ...p.smtp, [key]: value } }));

  const handleSave = () => {
    saveSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const ic = "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-sm";
  const lb = "block text-sm font-bold text-gray-700 mb-1.5";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Settings className="w-5 h-5 text-violet-500" /> System Settings</h3>
            <p className="text-sm text-gray-400">Configure your site, contact info, and admin credentials</p>
          </div>
          <button onClick={handleSave} className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-violet-300 transition-all">
            {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save All Settings</>}
          </button>
        </div>
        {saved && (
          <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-sm text-emerald-700 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Settings saved successfully. Changes take effect immediately.
          </div>
        )}
      </div>

      {/* Site Info */}
      <SettingGroup icon={<Globe className="w-5 h-5 text-violet-500" />} title="Site Information">
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className={lb}>Site Name</label><input type="text" value={form.siteName} onChange={e => set('siteName', e.target.value)} className={ic} /></div>
          <div><label className={lb}>Tagline</label><input type="text" value={form.tagline} onChange={e => set('tagline', e.target.value)} className={ic} /></div>
          <div><label className={lb}>Page Title (Meta)</label><input type="text" value={form.metaTitle} onChange={e => set('metaTitle', e.target.value)} className={ic} /></div>
          <div><label className={lb}>Meta Description</label><input type="text" value={form.metaDescription} onChange={e => set('metaDescription', e.target.value)} className={ic} /></div>
        </div>
      </SettingGroup>

      {/* Hero Section */}
      <SettingGroup icon={<MessageSquare className="w-5 h-5 text-blue-500" />} title="Hero Section">
        <div className="space-y-4">
          <div><label className={lb}>Hero Title</label><input type="text" value={form.heroTitle} onChange={e => set('heroTitle', e.target.value)} className={ic} /></div>
          <div><label className={lb}>Hero Subtitle</label><textarea rows={2} value={form.heroSubtitle} onChange={e => set('heroSubtitle', e.target.value)} className={ic + ' resize-none'} /></div>
          <div><label className={lb}>CTA Button Text</label><input type="text" value={form.heroCtaText} onChange={e => set('heroCtaText', e.target.value)} className={ic} /></div>
        </div>
      </SettingGroup>

      {/* Contact & Social */}
      <SettingGroup icon={<Phone className="w-5 h-5 text-emerald-500" />} title="Contact & Social Media">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={lb}>Contact Email</label>
            <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="email" value={form.contactEmail} onChange={e => set('contactEmail', e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 focus:ring-2 focus:ring-violet-500 outline-none text-sm" /></div>
          </div>
          <div>
            <label className={lb}>Contact Phone</label>
            <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" value={form.contactPhone} onChange={e => set('contactPhone', e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 focus:ring-2 focus:ring-violet-500 outline-none text-sm" /></div>
          </div>
          <div>
            <label className={lb}>WhatsApp Number</label>
            <input type="text" value={form.whatsappNumber} onChange={e => set('whatsappNumber', e.target.value)} className={ic} />
          </div>
          <div>
            <label className={lb}>WhatsApp Link</label>
            <input type="url" value={form.whatsappLink} onChange={e => set('whatsappLink', e.target.value)} className={ic} />
          </div>
          <div><label className={lb}>Facebook URL</label><input type="url" value={form.socialFacebook} onChange={e => set('socialFacebook', e.target.value)} className={ic} placeholder="https://facebook.com/..." /></div>
          <div><label className={lb}>Twitter / X URL</label><input type="url" value={form.socialTwitter} onChange={e => set('socialTwitter', e.target.value)} className={ic} placeholder="https://twitter.com/..." /></div>
          <div><label className={lb}>Instagram URL</label><input type="url" value={form.socialInstagram} onChange={e => set('socialInstagram', e.target.value)} className={ic} placeholder="https://instagram.com/..." /></div>
          <div><label className={lb}>LinkedIn URL</label><input type="url" value={form.socialLinkedin} onChange={e => set('socialLinkedin', e.target.value)} className={ic} placeholder="https://linkedin.com/..." /></div>
        </div>
      </SettingGroup>

      {/* Admin Credentials */}
      <SettingGroup icon={<Shield className="w-5 h-5 text-red-500" />} title="Admin Credentials">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800 mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Changing these credentials will update the admin login for this browser session immediately.</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className={lb}>Admin Email</label><input type="email" value={form.adminEmail} onChange={e => set('adminEmail', e.target.value)} className={ic} /></div>
          <div>
            <label className={lb}>Admin Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.adminPassword}
                onChange={e => set('adminPassword', e.target.value)}
                className="w-full px-4 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 focus:ring-2 focus:ring-violet-500 outline-none text-sm"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </SettingGroup>

      {/* Other */}
      <SettingGroup icon={<Settings className="w-5 h-5 text-gray-500" />} title="Other Settings">
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className={lb}>Currency Symbol</label><input type="text" value={form.currency} onChange={e => set('currency', e.target.value)} className={ic} /></div>
          <div><label className={lb}>Camp Start Date</label><input type="date" value={form.campStartDate} onChange={e => set('campStartDate', e.target.value)} className={ic} /></div>
          <div><label className={lb}>Google Analytics ID</label><input type="text" value={form.googleAnalyticsId} onChange={e => set('googleAnalyticsId', e.target.value)} className={ic} placeholder="G-XXXXXXXXXX" /></div>
          <div className="flex flex-col gap-3 justify-center">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
              <input type="checkbox" checked={form.registrationOpen} onChange={e => set('registrationOpen', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
              Registration Open
            </label>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
              <input type="checkbox" checked={form.showCountdown} onChange={e => set('showCountdown', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
              Show Countdown Timer
            </label>
          </div>
        </div>
      </SettingGroup>

      {/* SMTP / Email Configuration */}
      <SettingGroup icon={<Send className="w-5 h-5 text-blue-500" />} title="Email / SMTP Configuration">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm text-blue-700 mb-4">
          <strong>📧 How it works:</strong> This system uses <strong>EmailJS</strong> to send emails directly from the browser — no backend server needed. Create a free account at <a href="https://www.emailjs.com" target="_blank" rel="noopener" className="underline text-blue-600">emailjs.com</a>, set up a service and template, then paste the IDs below.
        </div>

        {/* Provider Selection */}
        <div className="space-y-3 mb-6">
          <label className="block text-sm font-bold text-gray-700">Email Provider</label>
          <div className="flex gap-3">
            {[
              { value: 'none', label: 'None (disabled)', desc: 'No emails sent' },
              { value: 'emailjs', label: 'EmailJS (recommended)', desc: 'Free, works from browser' },
              { value: 'custom', label: 'Custom SMTP', desc: 'For backend integration' },
            ].map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSmtp('provider', opt.value as SmtpSettings['provider'])}
                className={`flex-1 p-3 rounded-xl border-2 text-left transition-all ${
                  form.smtp.provider === opt.value
                    ? 'border-violet-500 bg-violet-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="text-sm font-bold text-gray-800">{opt.label}</p>
                <p className="text-xs text-gray-400">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* EmailJS Config */}
        {form.smtp.provider === 'emailjs' && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className={lb}>Service ID</label>
                <input type="text" value={form.smtp.emailjsServiceId} onChange={e => setSmtp('emailjsServiceId', e.target.value)} placeholder="service_xxxxxxx" className={ic} />
              </div>
              <div>
                <label className={lb}>Template ID</label>
                <input type="text" value={form.smtp.emailjsTemplateId} onChange={e => setSmtp('emailjsTemplateId', e.target.value)} placeholder="template_xxxxxxx" className={ic} />
              </div>
              <div>
                <label className={lb}>Public Key</label>
                <input type="text" value={form.smtp.emailjsPublicKey} onChange={e => setSmtp('emailjsPublicKey', e.target.value)} placeholder="xxxxxxxxxxxxxxx" className={ic} />
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h5 className="text-sm font-bold text-gray-700 mb-2">📋 EmailJS Template Variables</h5>
              <p className="text-xs text-gray-500 mb-2">Use these variables in your EmailJS template:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                {['to_email', 'to_name', 'from_name', 'subject', 'message', 'parentName', 'childName', 'childAge', 'course', 'ticketType', 'numChildren', 'siteName', 'contactEmail', 'whatsappLink'].map(v => (
                  <code key={v} className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 text-violet-600">{`{{${v}}}`}</code>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Custom SMTP (for documentation / future backend) */}
        {form.smtp.provider === 'custom' && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-700">
              Custom SMTP requires a backend server. These settings are saved for reference and can be read by your serverless functions.
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className={lb}>SMTP Host</label><input type="text" value={form.smtp.smtpHost} onChange={e => setSmtp('smtpHost', e.target.value)} placeholder="smtp.gmail.com" className={ic} /></div>
              <div><label className={lb}>SMTP Port</label><input type="text" value={form.smtp.smtpPort} onChange={e => setSmtp('smtpPort', e.target.value)} placeholder="587" className={ic} /></div>
              <div><label className={lb}>SMTP Username</label><input type="text" value={form.smtp.smtpUser} onChange={e => setSmtp('smtpUser', e.target.value)} placeholder="your@email.com" className={ic} /></div>
              <div>
                <label className={lb}>SMTP Password</label>
                <input type="password" value={form.smtp.smtpPass} onChange={e => setSmtp('smtpPass', e.target.value)} placeholder="••••••••" className={ic} />
              </div>
              <div><label className={lb}>From Name</label><input type="text" value={form.smtp.smtpFromName} onChange={e => setSmtp('smtpFromName', e.target.value)} placeholder="Clap Academy" className={ic} /></div>
              <div><label className={lb}>From Email</label><input type="email" value={form.smtp.smtpFromEmail} onChange={e => setSmtp('smtpFromEmail', e.target.value)} placeholder="hello@clapacademy.co.uk" className={ic} /></div>
              <div>
                <label className={lb}>Encryption</label>
                <select value={form.smtp.smtpEncryption} onChange={e => setSmtp('smtpEncryption', e.target.value as 'tls' | 'ssl' | 'none')} className={ic}>
                  <option value="tls">TLS (recommended)</option>
                  <option value="ssl">SSL</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Email Content */}
        {form.smtp.provider !== 'none' && (
          <div className="mt-4 space-y-4 pt-4 border-t border-gray-100">
            <h4 className="font-bold text-gray-800 text-sm">✉️ Registration Email Content</h4>
            <div>
              <label className={lb}>Subject Line</label>
              <input type="text" value={form.smtp.registrationSubject} onChange={e => setSmtp('registrationSubject', e.target.value)} className={ic} />
            </div>
            <div>
              <label className={lb}>Email Body (use {'{parentName}'}, {'{childName}'}, {'{childAge}'}, {'{course}'}, {'{ticketType}'}, {'{numChildren}'} as placeholders)</label>
              <textarea rows={10} value={form.smtp.registrationBody} onChange={e => setSmtp('registrationBody', e.target.value)} className={ic + ' resize-y font-mono text-xs' } />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={lb}>Admin Notification Subject</label>
                <input type="text" value={form.smtp.adminNotifySubject} onChange={e => set('smtp', { ...form.smtp, adminNotifySubject: e.target.value })} className={ic} />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2.5">
                  <input type="checkbox" checked={form.smtp.adminNotifyEnabled} onChange={e => set('smtp', { ...form.smtp, adminNotifyEnabled: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                  Send admin notification on new registration
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Test Email */}
        {form.smtp.provider !== 'none' && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <TestEmailSender />
          </div>
        )}
      </SettingGroup>

      {/* Save button bottom */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-500 text-white px-8 py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-violet-300 transition-all">
          {saved ? <><CheckCircle className="w-4 h-4" /> Settings Saved!</> : <><Save className="w-4 h-4" /> Save All Settings</>}
        </button>
      </div>
    </div>
  );
}
