import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import Documentation from './components/Documentation';

type Page = 'home' | 'login' | 'dashboard' | 'docs';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    if (localStorage.getItem('clap_admin_auth') === 'true') {
      return 'dashboard';
    }
    return 'home';
  });

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === 'clap_admin_auth' && !e.newValue) {
        setCurrentPage('home');
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  switch (currentPage) {
    case 'login':
      return <LoginPage onLogin={() => setCurrentPage('dashboard')} onBack={() => setCurrentPage('home')} />;
    case 'dashboard':
      return <DashboardPage onLogout={() => { localStorage.removeItem('clap_admin_auth'); setCurrentPage('home'); }} onDocs={() => setCurrentPage('docs')} />;
    case 'docs':
      return <Documentation onBack={() => setCurrentPage('home')} />;
    default:
      return <LandingPage onAdminClick={() => setCurrentPage('login')} onDocsClick={() => setCurrentPage('docs')} />;
  }
}
