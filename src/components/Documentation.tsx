import { useState } from 'react';
import {
  Download, ChevronDown, ChevronUp, FileText, Globe,
  Database, Shield, Terminal, Settings, Monitor, Cloud,
  CheckCircle, ArrowRight, Code, BookOpen, Zap, Lock,
  Copy, Check, AlertCircle
} from 'lucide-react';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-white transition-colors" title="Copy">
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  return (
    <div className="relative my-3 rounded-xl overflow-hidden border border-gray-700">
      <div className="bg-gray-800 px-4 py-1.5 text-xs text-gray-400 font-mono flex items-center justify-between">
        <span>{language}</span>
      </div>
      <div className="relative">
        <pre className="bg-gray-900 text-gray-200 p-4 text-sm font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap break-all">
          <code>{code}</code>
        </pre>
        <CopyButton text={code} />
      </div>
    </div>
  );
}

function Section({ id, icon, title, children }: { id: string; icon: React.ReactNode; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div id={id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 p-5 hover:bg-gray-50 transition-colors text-left">
        <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 shrink-0">{icon}</div>
        <h2 className="text-xl font-bold text-gray-900 flex-1">{title}</h2>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {open && <div className="px-5 pb-6 space-y-4 border-t border-gray-100 pt-4">{children}</div>}
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5">{n}</div>
      <div className="flex-1">
        <h4 className="font-bold text-gray-800 mb-2">{title}</h4>
        <div className="text-gray-600 text-sm leading-relaxed space-y-2">{children}</div>
      </div>
    </div>
  );
}

function Note({ type, children }: { type: 'info' | 'warning' | 'tip'; children: React.ReactNode }) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    tip: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  };
  const icons = { info: '💡', warning: '⚠️', tip: '✅' };
  return (
    <div className={`${styles[type]} border rounded-xl p-4 text-sm leading-relaxed`}>
      <span className="mr-1">{icons[type]}</span> {children}
    </div>
  );
}

// ==================== MAIN DOCUMENTATION PAGE ====================
export default function Documentation({ onBack }: { onBack?: () => void }) {
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back button */}
      {onBack && (
        <div className="print:hidden bg-gray-100 border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-3">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-violet-600 font-semibold text-sm transition-colors">
              ← Back to Website
            </button>
          </div>
        </div>
      )}
      {/* Header - hidden in print */}
      <div className="print:hidden bg-gradient-to-r from-violet-600 via-blue-600 to-violet-700 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8" />
            <span className="text-violet-200 font-semibold text-sm uppercase tracking-wider">Technical Documentation</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-[Fredoka_One] mb-3">
            Clap Academy Installation Manual
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mb-6">
            Complete guide for installing, configuring, and deploying the Clap Academy Kids Learning Platform — locally and online with Vercel.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={handlePrint} className="inline-flex items-center gap-2 bg-white text-violet-700 px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all">
              <Download className="w-5 h-5" /> Save as PDF
            </button>
            <div className="flex items-center gap-2 text-blue-200 text-sm">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Last Updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Print-only header */}
      <div className="hidden print:block mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Clap Academy — Installation Manual</h1>
        <p className="text-gray-500">Version 1.0.0 | {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        <hr className="mt-4 border-gray-300" />
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 print:space-y-4 print:px-0 print:py-4">

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 print:hidden">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-violet-500" /> Table of Contents</h3>
          <div className="grid md:grid-cols-2 gap-2">
            {[
              { id: 'overview', label: '1. System Overview' },
              { id: 'requirements', label: '2. System Requirements' },
              { id: 'local-setup', label: '3. Local Installation' },
              { id: 'project-structure', label: '4. Project Structure' },
              { id: 'configuration', label: '5. Configuration' },
              { id: 'database', label: '6. Database Setup' },
              { id: 'admin-setup', label: '7. Admin Access' },
              { id: 'vercel-deploy', label: '8. Deploying to Vercel' },
              { id: 'custom-domain', label: '9. Custom Domain' },
              { id: 'environment', label: '10. Environment Variables' },
              { id: 'migrations', label: '11. Production Database Migration' },
              { id: 'troubleshooting', label: '12. Troubleshooting' },
              { id: 'api-reference', label: '13. API & Data Reference' },
              { id: 'security', label: '14. Security Best Practices' },
              { id: 'maintenance', label: '15. Maintenance & Backups' },
            ].map(item => (
              <a key={item.id} href={`#${item.id}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-violet-600 py-1.5 px-3 rounded-lg hover:bg-violet-50 transition-colors">
                <ArrowRight className="w-3 h-3" /> {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* ===== 1. SYSTEM OVERVIEW ===== */}
        <Section id="overview" icon={<Monitor className="w-5 h-5" />} title="1. System Overview">
          <p className="text-gray-600 text-sm leading-relaxed">
            Clap Academy is a modern, full-stack kids learning platform built with <strong>React 19</strong>, <strong>Vite 7</strong>, <strong>TypeScript</strong>, and <strong>Tailwind CSS 4</strong>. It features a public-facing landing page with course listings, registration, and an admin dashboard for managing courses, registrations, and analytics.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
              <h5 className="font-bold text-violet-800 text-sm mb-2">Frontend Stack</h5>
              <ul className="text-sm text-violet-700 space-y-1">
                <li>• React 19 + TypeScript 5.9</li>
                <li>• Vite 7 (build tool)</li>
                <li>• Tailwind CSS 4.1</li>
                <li>• Lucide React (icons)</li>
                <li>• Single-file build output</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h5 className="font-bold text-blue-800 text-sm mb-2">Data Layer</h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• localStorage (current / default)</li>
                <li>• Ready for Supabase / Firebase / MongoDB</li>
                <li>• Structured CRUD interfaces</li>
                <li>• Real-time sync between pages</li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h5 className="font-bold text-gray-800 text-sm mb-2">Key Features</h5>
            <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Public landing page with 8+ courses</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Course detail modals with curriculum</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Parent registration form</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Admin login & dashboard</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Course CRUD management</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Student registration data grid</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Analytics & reporting</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> CSV export functionality</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Dark theme, mobile responsive</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Cartoon-style course imagery</div>
            </div>
          </div>
        </Section>

        {/* ===== 2. SYSTEM REQUIREMENTS ===== */}
        <Section id="requirements" icon={<Settings className="w-5 h-5" />} title="2. System Requirements">
          <p className="text-gray-600 text-sm">Before installing, ensure your system meets these minimum requirements:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-gray-50"><th className="text-left p-3 font-bold text-gray-700 border-b border-gray-200">Requirement</th><th className="text-left p-3 font-bold text-gray-700 border-b border-gray-200">Minimum Version</th><th className="text-left p-3 font-bold text-gray-700 border-b border-gray-200">Recommended</th></tr></thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100"><td className="p-3 font-medium">Node.js</td><td className="p-3">v18.0.0</td><td className="p-3">v20.x LTS</td></tr>
                <tr className="border-b border-gray-100"><td className="p-3 font-medium">npm</td><td className="p-3">v9.0.0</td><td className="p-3">v10.x (comes with Node 20)</td></tr>
                <tr className="border-b border-gray-100"><td className="p-3 font-medium">Git</td><td className="p-3">v2.30</td><td className="p-3">Latest stable</td></tr>
                <tr className="border-b border-gray-100"><td className="p-3 font-medium">Operating System</td><td className="p-3">Any (Windows/Mac/Linux)</td><td className="p-3">macOS / Ubuntu 22+</td></tr>
                <tr className="border-b border-gray-100"><td className="p-3 font-medium">RAM</td><td className="p-3">4 GB</td><td className="p-3">8 GB+</td></tr>
                <tr><td className="p-3 font-medium">Browser</td><td className="p-3">Chrome 90+, Firefox 90+, Safari 15+</td><td className="p-3">Chrome latest</td></tr>
              </tbody>
            </table>
          </div>
          <Note type="info">To check your Node.js version, run <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">node -v</code> in your terminal. Download Node.js from <a href="https://nodejs.org" className="text-blue-600 underline" target="_blank">nodejs.org</a>.</Note>
        </Section>

        {/* ===== 3. LOCAL INSTALLATION ===== */}
        <Section id="local-setup" icon={<Terminal className="w-5 h-5" />} title="3. Local Installation (Step-by-Step)">
          <div className="space-y-6">
            <Step n={1} title="Clone or Download the Project">
              <p>Obtain the project files. If using Git:</p>
              <CodeBlock code={`git clone <your-repository-url>
cd clap-academy`} />
              <p>Or extract the project ZIP file to your desired directory and open a terminal in that folder.</p>
            </Step>

            <Step n={2} title="Install Dependencies">
              <p>Navigate to the project root folder and install all required packages:</p>
              <CodeBlock code={`cd clap-academy
npm install`} />
              <p>This installs React, Vite, Tailwind CSS, TypeScript, Lucide icons, and all other dependencies defined in <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">package.json</code>.</p>
            </Step>

            <Step n={3} title="Start the Development Server">
              <p>Launch the local development server with hot-reload:</p>
              <CodeBlock code={`npm run dev`} />
              <p>The terminal will display output like:</p>
              <CodeBlock code={`  VITE v7.3.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/`} />
              <Note type="tip">Open <strong>http://localhost:5173</strong> in your browser to view the site. Changes to source files will automatically reload the page.</Note>
            </Step>

            <Step n={4} title="Build for Production">
              <p>When ready to deploy, create an optimized production build:</p>
              <CodeBlock code={`npm run build`} />
              <p>This generates a single <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">dist/index.html</code> file with all JS and CSS inlined (using vite-plugin-singlefile). The output is typically under 500KB.</p>
            </Step>

            <Step n={5} title="Preview the Production Build">
              <p>Test the production build locally before deploying:</p>
              <CodeBlock code={`npm run preview`} />
              <p>This serves the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">dist/</code> folder at <strong>http://localhost:4173</strong>.</p>
            </Step>
          </div>
        </Section>

        {/* ===== 4. PROJECT STRUCTURE ===== */}
        <Section id="project-structure" icon={<Code className="w-5 h-5" />} title="4. Project Structure">
          <CodeBlock language="text" code={`clap-academy/
├── public/
│   └── images/
│       ├── course-webdev.png       # Cartoon course images
│       ├── course-canva.png
│       ├── course-french.png
│       ├── course-ai.png
│       ├── course-scratch.png
│       └── course-python.png
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx         # Public website (all sections)
│   │   ├── LoginPage.tsx           # Admin login page
│   │   ├── DashboardPage.tsx       # Admin dashboard (registrations + analytics)
│   │   └── CourseManager.tsx       # Admin course CRUD data grid
│   ├── utils/
│   │   ├── courses.ts              # Course data layer + CRUD + seed
│   │   └── cn.ts                   # Tailwind class merge utility
│   ├── App.tsx                     # Main app with page routing
│   ├── main.tsx                    # React DOM entry point
│   └── index.css                   # Tailwind + custom CSS + fonts
├── index.html                      # HTML entry point
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite build configuration
└── Documentation.tsx               # This documentation file`} />
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
              <h5 className="font-bold text-violet-800 text-sm mb-2">Available npm Scripts</h5>
              <div className="text-sm text-violet-700 space-y-1.5">
                <div><code className="bg-violet-100 px-1.5 py-0.5 rounded text-xs font-mono">npm run dev</code> — Start dev server</div>
                <div><code className="bg-violet-100 px-1.5 py-0.5 rounded text-xs font-mono">npm run build</code> — Production build</div>
                <div><code className="bg-violet-100 px-1.5 py-0.5 rounded text-xs font-mono">npm run preview</code> — Preview production build</div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h5 className="font-bold text-blue-800 text-sm mb-2">Key Dependencies</h5>
              <div className="text-sm text-blue-700 space-y-1.5">
                <div><code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs font-mono">react@19.2</code> — UI framework</div>
                <div><code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs font-mono">tailwindcss@4.1</code> — Utility CSS</div>
                <div><code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs font-mono">lucide-react</code> — Icon library</div>
                <div><code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs font-mono">vite@7.3</code> — Build tool</div>
              </div>
            </div>
          </div>
        </Section>

        {/* ===== 5. CONFIGURATION ===== */}
        <Section id="configuration" icon={<Settings className="w-5 h-5" />} title="5. Configuration">
          <h5 className="font-bold text-gray-800 text-sm">vite.config.ts</h5>
          <p className="text-sm text-gray-600">The Vite configuration includes the singlefile plugin which inlines all assets into one HTML file — ideal for simple deployments:</p>
          <CodeBlock language="typescript" code={`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile(),
  ],
});`} />
          <h5 className="font-bold text-gray-800 text-sm mt-4">tsconfig.json</h5>
          <p className="text-sm text-gray-600">TypeScript is pre-configured with strict mode. The path alias <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">@/</code> can be added if desired.</p>
          <Note type="tip">No configuration changes are needed for a standard local setup. The defaults work out of the box.</Note>
        </Section>

        {/* ===== 6. DATABASE SETUP ===== */}
        <Section id="database" icon={<Database className="w-5 h-5" />} title="6. Database Setup">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <strong>⚠️ Current Architecture:</strong> The system uses the browser's <code className="bg-amber-100 px-1 rounded">localStorage</code> for data persistence. This means:
            <ul className="mt-2 ml-4 space-y-1 list-disc">
              <li>Data persists across browser sessions on the same device</li>
              <li>Data is NOT shared between users or devices</li>
              <li>Each admin manages their own local data</li>
              <li>For multi-user production use, a real database is required (see Section 11)</li>
            </ul>
          </div>

          <h5 className="font-bold text-gray-800 text-sm mt-4">localStorage Data Structure</h5>
          <p className="text-sm text-gray-600">The system uses three localStorage keys:</p>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h6 className="font-bold text-gray-800 text-sm flex items-center gap-2"><Lock className="w-4 h-4 text-violet-500" /> clap_admin_auth</h6>
              <p className="text-xs text-gray-500 mt-1">Stores admin authentication state. Value: <code className="bg-gray-200 px-1 rounded">"true"</code> when logged in.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h6 className="font-bold text-gray-800 text-sm flex items-center gap-2"><Database className="w-4 h-4 text-blue-500" /> clap_registrations</h6>
              <p className="text-xs text-gray-500 mt-1">JSON array of student registration objects. Each includes: parent info, child info, course selection, ticket type, consent, status, and timestamp.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h6 className="font-bold text-gray-800 text-sm flex items-center gap-2"><Database className="w-4 h-4 text-emerald-500" /> clap_courses</h6>
              <p className="text-xs text-gray-500 mt-1">JSON array of course objects. Auto-seeded with 8 default courses on first load. Full CRUD via admin panel.</p>
            </div>
          </div>

          <h5 className="font-bold text-gray-800 text-sm mt-4">Viewing localStorage Data</h5>
          <p className="text-sm text-gray-600">Open browser DevTools → Application tab → Local Storage → your domain. You can inspect and edit the stored data directly.</p>

          <h5 className="font-bold text-gray-800 text-sm mt-4">Resetting Data</h5>
          <p className="text-sm text-gray-600">To reset all data, open the browser console and run:</p>
          <CodeBlock code={`localStorage.removeItem('clap_registrations');
localStorage.removeItem('clap_courses');
localStorage.removeItem('clap_admin_auth');
location.reload();`} />
        </Section>

        {/* ===== 7. ADMIN SETUP ===== */}
        <Section id="admin-setup" icon={<Shield className="w-5 h-5" />} title="7. Admin Access & Credentials">
          <div className="bg-violet-50 rounded-xl p-5 border border-violet-200">
            <h5 className="font-bold text-violet-800 mb-3">Default Admin Credentials</h5>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 border border-violet-100">
                <p className="text-xs text-gray-500 mb-1">Email Address</p>
                <p className="font-mono font-bold text-violet-700 text-sm">admin@clapacademy.co.uk</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-violet-100">
                <p className="text-xs text-gray-500 mb-1">Password</p>
                <p className="font-mono font-bold text-violet-700 text-sm">Admin@2025</p>
              </div>
            </div>
          </div>
          <h5 className="font-bold text-gray-800 text-sm mt-4">Accessing the Admin Panel</h5>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Method 1:</strong> Click the small <Lock className="w-4 h-4 inline" /> icon in the top-right of the navbar on the public website.</p>
            <p><strong>Method 2:</strong> On mobile, open the hamburger menu and tap "Admin Login".</p>
            <p><strong>Method 3:</strong> Navigate directly to the login page (it's shown when you click the admin icon).</p>
          </div>
          <h5 className="font-bold text-gray-800 text-sm mt-4">Changing Admin Credentials</h5>
          <p className="text-sm text-gray-600">To change the admin email/password, edit the file <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">src/components/LoginPage.tsx</code> and update these constants:</p>
          <CodeBlock language="typescript" code={`// Near the top of the LoginPage component
const ADMIN_EMAIL = 'admin@clapacademy.co.uk';
const ADMIN_PASSWORD = 'Admin@2025';`} />
          <Note type="warning">For production, you should always change the default credentials. For a fully secure system, implement server-side authentication (see Section 11).</Note>
        </Section>

        {/* ===== 8. VERCEL DEPLOYMENT ===== */}
        <Section id="vercel-deploy" icon={<Cloud className="w-5 h-5" />} title="8. Deploying to Vercel (Step-by-Step)">
          <p className="text-sm text-gray-600">Vercel is the recommended platform for deploying this React application. It's free for personal projects and offers automatic HTTPS, CDN, and continuous deployment.</p>

          <div className="space-y-6">
            <Step n={1} title="Create a GitHub Repository">
              <p>Push your project to GitHub:</p>
              <CodeBlock code={`cd clap-academy
git init
git add .
git commit -m "Initial commit - Clap Academy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/clap-academy.git
git push -u origin main`} />
              <Note type="info">Create a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">.gitignore</code> file with <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">node_modules</code> and <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">dist</code> before pushing.</Note>
            </Step>

            <Step n={2} title="Create a Vercel Account">
              <p>Go to <a href="https://vercel.com" className="text-blue-600 underline" target="_blank">vercel.com</a> and sign up using your GitHub account. This enables seamless integration.</p>
            </Step>

            <Step n={3} title="Import Your Project">
              <div className="text-sm text-gray-600 space-y-2">
                <p>1. From the Vercel dashboard, click <strong>"Add New..."</strong> → <strong>"Project"</strong></p>
                <p>2. Select <strong>"Import Git Repository"</strong></p>
                <p>3. Find and select your <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">clap-academy</code> repository</p>
                <p>4. Click <strong>"Import"</strong></p>
              </div>
            </Step>

            <Step n={4} title="Configure Build Settings">
              <p>Vercel auto-detects Vite projects. Verify these settings:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead><tr className="bg-gray-50"><th className="text-left p-3 font-bold text-gray-700 border-b">Setting</th><th className="text-left p-3 font-bold text-gray-700 border-b">Value</th></tr></thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-100"><td className="p-3 font-medium">Framework Preset</td><td className="p-3">Vite (auto-detected)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3 font-medium">Root Directory</td><td className="p-3">./ (default)</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3 font-medium">Build Command</td><td className="p-3 font-mono text-xs">npm run build</td></tr>
                    <tr className="border-b border-gray-100"><td className="p-3 font-medium">Output Directory</td><td className="p-3 font-mono text-xs">dist</td></tr>
                    <tr><td className="p-3 font-medium">Install Command</td><td className="p-3 font-mono text-xs">npm install</td></tr>
                  </tbody>
                </table>
              </div>
            </Step>

            <Step n={5} title="Deploy">
              <p>Click <strong>"Deploy"</strong> and wait 1-2 minutes. Vercel will:</p>
              <ul className="text-sm text-gray-600 ml-4 list-disc space-y-1">
                <li>Install all npm dependencies</li>
                <li>Run <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">npm run build</code></li>
                <li>Deploy the output to their CDN</li>
                <li>Provide a live URL (e.g. <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">clap-academy.vercel.app</code>)</li>
              </ul>
            </Step>

            <Step n={6} title="Automatic Deployments">
              <p>Once connected, every <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">git push</code> to the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">main</code> branch triggers an automatic redeployment on Vercel.</p>
              <CodeBlock code={`# Make changes, commit and push
git add .
git commit -m "Update course content"
git push origin main`} />
            </Step>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h5 className="font-bold text-blue-800 text-sm mb-2">📁 Alternative: Direct Upload (No Git)</h5>
            <p className="text-sm text-blue-700">If you prefer not to use Git, you can deploy directly:</p>
            <CodeBlock code={`# Install Vercel CLI globally
npm install -g vercel

# Navigate to project and deploy
cd clap-academy
npm run build
vercel --prod`} />
            <p className="text-sm text-blue-700 mt-2">Follow the prompts to configure your project. Vercel CLI handles the rest.</p>
          </div>
        </Section>

        {/* ===== 9. CUSTOM DOMAIN ===== */}
        <Section id="custom-domain" icon={<Globe className="w-5 h-5" />} title="9. Custom Domain Setup">
          <div className="space-y-4">
            <Step n={1} title="Add Domain in Vercel">
              <p className="text-sm text-gray-600">In your Vercel project dashboard: Settings → Domains → Add. Enter your domain (e.g. <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">www.clapacademy.co.uk</code>).</p>
            </Step>
            <Step n={2} title="Update DNS Records">
              <p className="text-sm text-gray-600">In your domain registrar (GoDaddy, Namecheap, etc.), add these DNS records:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead><tr className="bg-gray-50"><th className="p-3 font-bold text-gray-700 border-b text-left">Type</th><th className="p-3 font-bold text-gray-700 border-b text-left">Name</th><th className="p-3 font-bold text-gray-700 border-b text-left">Value</th></tr></thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-100"><td className="p-3 font-mono">CNAME</td><td className="p-3">www</td><td className="p-3 font-mono text-xs">cname.vercel-dns.com</td></tr>
                    <tr><td className="p-3 font-mono">A</td><td className="p-3">@</td><td className="p-3 font-mono text-xs">76.76.21.21</td></tr>
                  </tbody>
                </table>
              </div>
            </Step>
            <Step n={3} title="SSL Certificate">
              <p className="text-sm text-gray-600">Vercel automatically provisions a free SSL certificate. HTTPS is enabled by default — no configuration needed.</p>
            </Step>
          </div>
        </Section>

        {/* ===== 10. ENVIRONMENT VARIABLES ===== */}
        <Section id="environment" icon={<Zap className="w-5 h-5" />} title="10. Environment Variables">
          <p className="text-sm text-gray-600">Currently the application uses no environment variables. When migrating to a production database, you'll need to add them.</p>
          <h5 className="font-bold text-gray-800 text-sm mt-4">Creating Environment Files</h5>
          <p className="text-sm text-gray-600">Create a <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">.env</code> file in the project root:</p>
          <CodeBlock language="env" code={`# .env.local (for local development)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_EMAIL=admin@clapacademy.co.uk
VITE_ADMIN_PASSWORD_HASH=your-hashed-password`} />
          <Note type="info">All Vite environment variables must start with <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">VITE_</code> to be exposed to the client. Never put secrets like API keys with write access in <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">VITE_</code> variables — use a backend instead.</Note>
          <h5 className="font-bold text-gray-800 text-sm mt-4">Adding to Vercel</h5>
          <p className="text-sm text-gray-600">In Vercel: Project Settings → Environment Variables → Add each variable. They'll be available at build time.</p>
        </Section>

        {/* ===== 11. PRODUCTION DATABASE MIGRATION ===== */}
        <Section id="migrations" icon={<Database className="w-5 h-5" />} title="11. Production Database Migration">
          <p className="text-sm text-gray-600">For a real multi-user production deployment, replace localStorage with a cloud database. <strong>Supabase</strong> (PostgreSQL) is the recommended option — it's free to start and provides authentication, real-time subscriptions, and REST APIs.</p>

          <div className="space-y-6">
            <Step n={1} title="Create a Supabase Project">
              <p className="text-sm text-gray-600">Go to <a href="https://supabase.com" className="text-blue-600 underline" target="_blank">supabase.com</a>, create a free account, then create a new project. Note your Project URL and anon/public key from Settings → API.</p>
            </Step>

            <Step n={2} title="Create Database Tables">
              <p className="text-sm text-gray-600">In the Supabase SQL Editor, run:</p>
              <CodeBlock language="sql" code={`-- Registrations table
CREATE TABLE registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_name TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  parent_phone TEXT,
  child_name TEXT NOT NULL,
  child_age TEXT NOT NULL,
  course TEXT,
  ticket_type TEXT NOT NULL,
  num_children INTEGER DEFAULT 1,
  consent BOOLEAN DEFAULT false,
  updates_opt_in BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending','paid','confirmed')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Courses table
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  desc TEXT,
  full_desc TEXT,
  image TEXT,
  icon TEXT DEFAULT '📚',
  age TEXT,
  duration TEXT,
  sessions TEXT,
  price TEXT,
  color TEXT DEFAULT 'from-violet-500 to-blue-500',
  border_color TEXT DEFAULT 'border-violet-500/25',
  tag TEXT,
  gradient_bg BOOLEAN DEFAULT false,
  highlights JSONB DEFAULT '[]',
  curriculum JSONB DEFAULT '[]',
  outcomes JSONB DEFAULT '[]',
  requirements JSONB DEFAULT '[]',
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Public can read active courses
CREATE POLICY "Courses are publicly readable"
  ON courses FOR SELECT
  USING (active = true);

-- Public can insert registrations
CREATE POLICY "Anyone can register"
  ON registrations FOR INSERT
  WITH CHECK (true);

-- Admin policies (authenticated users)
CREATE POLICY "Admin full access registrations"
  ON registrations FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access courses"
  ON courses FOR ALL
  USING (auth.role() = 'authenticated');`} />
            </Step>

            <Step n={3} title="Install Supabase Client">
              <CodeBlock code={`npm install @supabase/supabase-js`} />
            </Step>

            <Step n={4} title="Create Database Utility">
              <p className="text-sm text-gray-600">Create <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">src/utils/supabase.ts</code>:</p>
              <CodeBlock language="typescript" code={`import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);`} />
            </Step>

            <Step n={5} title="Migrate Data Functions">
              <p className="text-sm text-gray-600">Replace localStorage calls with Supabase queries. For example, in <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">src/utils/courses.ts</code>:</p>
              <CodeBlock language="typescript" code={`// Example: Replace getCourses()
export async function getCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data;
}

// Example: Replace addCourse()
export async function addCourse(course: CourseData) {
  const { data, error } = await supabase
    .from('courses')
    .insert([course])
    .select()
    .single();
  if (error) throw error;
  return data;
}`} />
            </Step>

            <Step n={6} title="Seed Default Courses to Supabase">
              <p className="text-sm text-gray-600">Run this once to populate the database with default courses. You can do this via the Supabase dashboard or a script.</p>
            </Step>
          </div>

          <div className="mt-4 bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h5 className="font-bold text-blue-800 text-sm mb-2">Other Database Options</h5>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• <strong>Firebase Firestore</strong> — Google's NoSQL database, free tier available</p>
              <p>• <strong>MongoDB Atlas</strong> — Document database with free M0 cluster</p>
              <p>• <strong>PlanetScale</strong> — Serverless MySQL, excellent for Vercel</p>
              <p>• <strong>Neon</strong> — Serverless PostgreSQL, native Vercel integration</p>
            </div>
          </div>
        </Section>

        {/* ===== 12. TROUBLESHOOTING ===== */}
        <Section id="troubleshooting" icon={<AlertCircle className="w-5 h-5" />} title="12. Troubleshooting">
          <div className="space-y-4">
            {[
              { q: 'npm install fails with permission errors', a: 'Run: sudo chown -R $(whoami) ~/.npm && sudo chown -R $(whoami) /usr/local/lib/node_modules. Or use nvm to manage Node versions without sudo.' },
              { q: 'Build fails with "Cannot find module"', a: 'Delete node_modules and reinstall: rm -rf node_modules package-lock.json && npm install' },
              { q: 'Dev server shows blank page', a: 'Check the browser console for errors. Ensure port 5173 is not blocked by firewall. Try: npm run dev -- --host 0.0.0.0' },
              { q: 'Vercel build fails', a: 'Check that Node.js version in Vercel settings matches your local version. Go to Project Settings → Node.js Version. Set to 20.x.' },
              { q: 'Images not loading on Vercel', a: 'Ensure all images in public/images/ are committed to Git and pushed. Check case sensitivity of filenames.' },
              { q: 'Admin data not persisting between users', a: 'This is expected with localStorage. Each browser/device has its own data. For shared data, migrate to Supabase (see Section 11).' },
              { q: 'Courses disappear after clearing browser data', a: 'localStorage is cleared with browser data. Default courses will re-seed automatically. Custom courses need to be re-added or migrated to a database.' },
              { q: 'CSS looks different on Vercel vs local', a: 'Ensure you\'re comparing production builds both sides. Run npm run build && npm run preview locally to test.' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h5 className="font-bold text-gray-800 text-sm">❓ {item.q}</h5>
                <p className="text-sm text-gray-600 mt-1">💡 {item.a}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ===== 13. API REFERENCE ===== */}
        <Section id="api-reference" icon={<FileText className="w-5 h-5" />} title="13. API & Data Reference">
          <h5 className="font-bold text-gray-800 text-sm">Registration Object</h5>
          <CodeBlock language="typescript" code={`interface Registration {
  id: string;                    // Auto-generated: REG-1718483600000-ABC12
  parentName: string;            // Parent/guardian full name
  parentEmail: string;           // Parent/guardian email
  parentPhone: string;           // Parent/guardian phone number
  childName: string;             // Child's first name
  childAge: string;              // Child's age (5-16)
  course: string;                // Selected course title
  ticketType: string;            // early | standard | sibling | family
  numChildren: string;           // 1 | 2 | 3
  consent: boolean;              // Parent consent given
  updates: boolean;              // Opt-in to marketing
  registeredAt: string;          // ISO date string
  status: 'pending'|'paid'|'confirmed';  // Registration status
}`} />

          <h5 className="font-bold text-gray-800 text-sm mt-4">Course Object</h5>
          <CodeBlock language="typescript" code={`interface CourseData {
  id: string;                    // Auto-generated or CRS-DEF-xxx
  title: string;                 // Course title
  desc: string;                  // Short description
  fullDesc: string;              // Full description for modal
  image: string | null;          // Path: /images/course-xxx.png
  icon: string;                  // Emoji fallback: 💻 🎨 🤖 etc.
  age: string;                   // e.g. "Ages 7–16"
  duration: string;              // e.g. "3 Days"
  sessions: string;              // e.g. "6 sessions (2hrs each)"
  price: string;                 // e.g. "£75"
  color: string;                 // Tailwind gradient classes
  borderColor: string;           // Tailwind border color class
  tag: string;                   // Badge text: "💻 Most Popular"
  gradientBg: boolean;           // Use gradient if no image
  highlights: string[];          // 4 highlight items
  curriculum: {                  // Curriculum array
    day: string;                 // "Day 1"
    title: string;               // Day title
    topics: string[];            // Topics array
  }[];
  outcomes: string[];            // Learning outcomes
  requirements: string[];        // Prerequisites
  active: boolean;               // Visible on website
  createdAt: string;             // ISO date
  updatedAt: string;             // ISO date
}`} />
        </Section>

        {/* ===== 14. SECURITY ===== */}
        <Section id="security" icon={<Lock className="w-5 h-5" />} title="14. Security Best Practices">
          <div className="space-y-3">
            <div className="bg-red-50 rounded-xl p-4 border border-red-200 text-sm text-red-800">
              <strong>🔴 Critical for Production:</strong> The default admin login uses hardcoded credentials in the source code. This is intentional for the demo but MUST be changed before any public deployment.
            </div>
            {[
              { t: 'Change Default Credentials', d: 'Update ADMIN_EMAIL and ADMIN_PASSWORD in LoginPage.tsx to strong, unique values.' },
              { t: 'Implement Server-Side Auth', d: 'Use Supabase Auth, Firebase Auth, or Auth0 for production. Client-side only auth is not secure for real applications.' },
              { t: 'Enable Row Level Security', d: 'If using Supabase, always enable RLS on all tables. Never expose service role keys to the client.' },
              { t: 'Validate User Input', d: 'The registration form uses basic required-field validation. Add server-side validation for email format, phone format, and sanitization.' },
              { t: 'HTTPS Only', d: 'Vercel provides HTTPS by default. Never deploy to HTTP — cookies and auth tokens require HTTPS.' },
              { t: 'Content Security Policy', d: 'Add CSP headers in vercel.json to prevent XSS attacks and restrict resource loading.' },
              { t: 'Rate Limiting', d: 'For public registration endpoints, implement rate limiting to prevent spam. Vercel Edge Functions can handle this.' },
              { t: 'Regular Backups', d: 'If using a database, set up automated daily backups. Supabase provides point-in-time recovery on paid plans.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div><p className="font-bold text-gray-800 text-sm">{item.t}</p><p className="text-gray-600 text-sm">{item.d}</p></div>
              </div>
            ))}
          </div>
        </Section>

        {/* ===== 15. MAINTENANCE ===== */}
        <Section id="maintenance" icon={<Settings className="w-5 h-5" />} title="15. Maintenance & Backups">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-violet-50 rounded-xl p-4 border border-violet-100">
              <h5 className="font-bold text-violet-800 text-sm mb-2">Regular Tasks</h5>
              <ul className="text-sm text-violet-700 space-y-1.5">
                <li>• Update npm packages monthly: <code className="bg-violet-100 px-1 rounded text-xs">npm update</code></li>
                <li>• Check for security vulnerabilities: <code className="bg-violet-100 px-1 rounded text-xs">npm audit</code></li>
                <li>• Review Vercel deployment logs</li>
                <li>• Monitor application performance</li>
                <li>• Back up course data from admin panel (CSV export)</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h5 className="font-bold text-blue-800 text-sm mb-2">Backup Strategy</h5>
              <ul className="text-sm text-blue-700 space-y-1.5">
                <li>• Export registrations as CSV from admin dashboard</li>
                <li>• Use browser DevTools to export localStorage JSON</li>
                <li>• For Supabase: enable automated daily backups</li>
                <li>• Keep Git repository as code backup</li>
                <li>• Document any custom configuration changes</li>
              </ul>
            </div>
          </div>

          <h5 className="font-bold text-gray-800 text-sm mt-4">Updating the Application</h5>
          <CodeBlock code={`# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Test locally
npm run dev

# Build and verify
npm run build
npm run preview

# Deploy (Vercel auto-deploys on git push)
git push origin main`} />

          <h5 className="font-bold text-gray-800 text-sm mt-4">Adding New Course Images</h5>
          <div className="text-sm text-gray-600 space-y-2">
            <p>1. Generate or obtain a cartoon-style course image (recommended: 1200×800px PNG)</p>
            <p>2. Place it in the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">public/images/</code> directory</p>
            <p>3. Add the filename to the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">PRESET_IMAGES</code> array in <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">src/utils/courses.ts</code></p>
            <p>4. Rebuild and redeploy</p>
          </div>
        </Section>

        {/* Footer */}
        <div className="text-center py-8 text-gray-400 text-sm border-t border-gray-200 print:hidden">
          <p>Clap Academy Installation Manual v1.0.0</p>
          <p className="mt-1">Generated on {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <p className="mt-2">Click "Save as PDF" at the top to download this documentation.</p>
        </div>
      </div>
    </div>
  );
}
