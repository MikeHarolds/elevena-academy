import { useState } from 'react';
import { Sparkles, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';

export default function LoginPage({ onLogin, onBack }: { onLogin: () => void; onBack: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const ADMIN_EMAIL = 'admin@clapacademy.co.uk';
  const ADMIN_PASSWORD = 'Admin@2025';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem('clap_admin_auth', 'true');
        onLogin();
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0F0A1E] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Glowing orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-violet-500/5 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-blue-500/5 rounded-full blur-xl animate-bounce-slow" />

      <div className="w-full max-w-md relative z-10">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-violet-400 font-semibold mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Website
        </button>

        {/* Login Card */}
        <div className="bg-[#1A1230]/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-violet-500/10 p-8 md:p-10 border border-violet-500/15">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-[Fredoka_One] text-white text-center mb-1">
            Clap<span className="text-violet-400">Academy</span>
          </h1>
          <p className="text-center text-gray-500 text-sm mb-8">Admin Dashboard Login</p>

          {/* Admin Badge */}
          <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-3 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center">
              <Lock className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-violet-400">Secure Admin Access</p>
              <p className="text-[11px] text-gray-500">Authorized personnel only</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@clapacademy.co.uk"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-violet-500/20 bg-[#0F0A1E] text-white placeholder-gray-600 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-violet-500/20 bg-[#0F0A1E] text-white placeholder-gray-600 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-blue-500 text-white py-3.5 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-violet-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
            <p className="text-xs font-bold text-amber-400 mb-2">🔑 Demo Credentials</p>
            <div className="space-y-1">
              <p className="text-xs text-amber-300/70"><span className="font-semibold">Email:</span> admin@clapacademy.co.uk</p>
              <p className="text-xs text-amber-300/70"><span className="font-semibold">Password:</span> Admin@2025</p>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          © {new Date().getFullYear()} Clap Academy. All rights reserved.
        </p>
      </div>
    </div>
  );
}
