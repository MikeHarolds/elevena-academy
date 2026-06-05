import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import WhatsAppButton from './components/WhatsAppButton';

type Page = 'home' | 'login' | 'dashboard';

export default function App() {

  
      {/* Your application */}
      <WhatsAppButton />
    

  const [currentPage, setCurrentPage] = useState<Page>(() => {
    // Check if admin is already logged in
    if (localStorage.getItem('clap_admin_auth') === 'true') {
      return 'dashboard';
    }
    return 'home';
  });

  // Listen for storage changes (multi-tab support)
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === 'clap_admin_auth') {
        if (!e.newValue) {
          setCurrentPage('home');
        }
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const handleLogin = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('clap_admin_auth');
    setCurrentPage('home');
  };

  const handleAdminClick = () => {
    setCurrentPage('login');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  switch (currentPage) {
    case 'login':
      return <LoginPage onLogin={handleLogin} onBack={handleBackToHome} />;
    case 'dashboard':
      return <DashboardPage onLogout={handleLogout} />;
    default:
      return <LandingPage onAdminClick={handleAdminClick} />;
  }
}
