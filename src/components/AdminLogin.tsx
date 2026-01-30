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
    <div className="min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      {/* Back Button */}
      <Link href="/">
        <div className="absolute top-6 left-6 cursor-pointer">
          <span className="text-cyan-400 hover:text-pink-400 transition">← Back Home</span>
        </div>
      </Link>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-6"
      >
        <div className="relative">
          {/* Glowing Border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 opacity-20 blur-xl" />

          {/* Card */}
          <div className="relative backdrop-blur-xl bg-black/60 border border-emerald-500/30 rounded-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🛡️</div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">
                Admin Panel
              </h1>
              <p className="text-emerald-200 text-sm">
                Access the control panel
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Input */}
              <div>
                <label className="block text-sm font-semibold text-emerald-300 mb-2">
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
                  placeholder="Enter username"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-emerald-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-emerald-300 mb-2">
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
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-emerald-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition"
                />
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold hover:shadow-lg hover:shadow-emerald-500/50 transition disabled:opacity-50"
              >
                {loading ? '⏳ Signing in...' : '🔓 Login'}
              </motion.button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 pt-8 border-t border-emerald-500/20">
              <p className="text-gray-400 text-sm text-center mb-4">
                🔐 Demo Credentials:
              </p>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded bg-white/5 border border-emerald-500/20">
                  <p className="text-emerald-300 font-mono">admin / NeuroIsland2026!</p>
                </div>
                <div className="p-3 rounded bg-white/5 border border-emerald-500/20">
                  <p className="text-emerald-300 font-mono">moderator / ModPass123!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
