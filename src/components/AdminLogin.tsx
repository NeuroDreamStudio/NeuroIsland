import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const AdminLogin: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Admin Credentials (In production use secure database)
  const ADMIN_USERS = {
    admin: 'NeuroIsland2026!',
    moderator: 'ModPass123!',
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulates login with validation
    setTimeout(() => {
      if (ADMIN_USERS[username as keyof typeof ADMIN_USERS] === password) {
        // Save token in localStorage (for demo)
        localStorage.setItem('adminToken', btoa(username));
        localStorage.setItem('adminUser', username);
        router.push('/admin/dashboard');
      } else {
        setError('Invalid credentials. Please try again!');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div 
      className="min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: 'url(/assets/images/base.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="fixed inset-0 -z-20 bg-black/30" />

      {/* Back Button */}
      <Link href="/">
        <div className="absolute top-6 left-6 cursor-pointer z-50">
          <span className="text-cyan-400 hover:text-cyan-300 transition font-medium">← Back Home</span>
        </div>
      </Link>

      {/* Login Card - Centered */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xs z-10 mx-auto px-4"
      >
        {/* Card with glassmorphism */}
        <div 
          className="backdrop-blur-xl border border-white/20 rounded-3xl p-10"
          style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(34, 211, 238, 0.15) 100%)',
            boxShadow: '0 8px 32px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(255,255,255,0.1)',
          }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-7xl mb-4">🛡️</div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Admin Panel
            </h1>
            <p className="text-cyan-200 text-sm">
              Access control center
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username Input */}
            <div>
              <label className="block text-sm font-semibold text-cyan-300 mb-2">
                Username
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/60 transition"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-cyan-300 mb-2">
                Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/60 transition"
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm"
              >
                ⚠️ {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Signing in...' : '🔓 Login'}
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-white/70 text-xs text-center mb-4 font-medium uppercase tracking-wider">
              🔐 Demo Credentials
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-cyan-300 font-mono text-center">admin / NeuroIsland2026!</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-cyan-300 font-mono text-center">moderator / ModPass123!</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
