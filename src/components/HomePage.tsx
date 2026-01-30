import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const HomePage: React.FC = () => {
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  const buttons = [
    {
      id: 'neuro-trivia',
      label: '🧠 Neuro Trivia',
      description: 'Challenge yourself and win crypto',
      color: 'from-cyan-400 via-blue-500 to-indigo-600',
      href: '/neuro-trivia',
      icon: '🎮',
    },
    {
      id: 'nft-island',
      label: '🖼️ NFT Gallery',
      description: 'Explore Neuro in the Barrel 3D',
      color: 'from-purple-400 via-pink-500 to-rose-600',
      href: '/nft-island',
      icon: '🎨',
    },
    {
      id: 'rewards',
      label: '🎁 Rewards Hub',
      description: 'Claim daily rewards & bonuses',
      color: 'from-yellow-400 via-orange-500 to-red-600',
      href: '#rewards',
      icon: '⭐',
    },
    {
      id: 'tournaments',
      label: '🏆 Tournaments',
      description: 'Compete for legendary prizes',
      color: 'from-emerald-400 via-teal-500 to-cyan-600',
      href: '#tournaments',
      icon: '🥇',
    },
    {
      id: 'wallet',
      label: '💎 Wallet Hub',
      description: 'Multi-chain crypto management',
      color: 'from-amber-400 via-yellow-500 to-orange-600',
      href: '/wallet',
      icon: '🔗',
    },
    {
      id: 'ecosystem',
      label: '🗺️ Island Map',
      description: 'Explore the Neuro ecosystem',
      color: 'from-blue-400 via-teal-500 to-green-600',
      href: '#ecosystem',
      icon: '🌴',
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-950 via-blue-900 to-teal-900">
      {/* Animated Ocean Background */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900 via-blue-900 to-teal-800" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-20 right-1/3 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 left-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000" />
        <div className="absolute top-0 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse" />
      </div>

      <svg className="absolute bottom-0 w-full h-32 opacity-30" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,50 Q300,100 600,50 T1200,50 L1200,120 L0,120 Z" fill="url(#wave-gradient)" className="animate-wave" />
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Navigation Bar */}
      <nav className="relative z-50 backdrop-blur-md bg-gradient-to-r from-blue-900/80 via-teal-900/80 to-cyan-900/80 border-b border-cyan-400/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="text-5xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                🏝️
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                  NeuroIsland
                </h1>
                <p className="text-xs text-cyan-300">Your Digital Tropical Hub</p>
              </div>
            </motion.div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-cyan-300 hover:text-yellow-400 transition font-medium">Features</a>
              <a href="#about" className="text-cyan-300 hover:text-yellow-400 transition font-medium">About</a>
              <a href="#contact" className="text-cyan-300 hover:text-yellow-400 transition font-medium">Community</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 min-h-[calc(100vh-80px)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-teal-300 to-green-400 bg-clip-text text-transparent drop-shadow-lg"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Welcome to NeuroIsland 🏝️
            </motion.h2>
            <motion.p 
              className="text-lg md:text-2xl text-cyan-100 mb-3 max-w-3xl mx-auto font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Your tropical paradise for gaming, collecting NFTs, and earning crypto
            </motion.p>
            <motion.p 
              className="text-sm md:text-lg text-emerald-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ✨ Dive into the digital ocean • Play & Win Rewards • Join the Web3 Community
            </motion.p>
          </motion.div>

          <motion.div
            className="flex justify-center mb-8"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <div className="text-7xl md:text-9xl opacity-70 drop-shadow-lg">🌴</div>
          </motion.div>
        </div>
      </section>

      {/* Main Buttons Grid */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            className="text-center text-3xl md:text-4xl font-bold mb-12 text-cyan-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            🗺️ Explore the Island
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {buttons.map((btn, index) => (
              <motion.div
                key={btn.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredBtn(btn.id)}
                onMouseLeave={() => setHoveredBtn(null)}
                whileHover={{ y: -15 }}
              >
                <Link href={btn.href}>
                  <motion.div
                    className="relative h-full cursor-pointer group"
                    animate={hoveredBtn === btn.id ? { scale: 1.02 } : { scale: 1 }}
                  >
                    <div className={`relative bg-gradient-to-br ${btn.color} p-8 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl border border-white/20 transition-all duration-300 h-full flex flex-col justify-between`}>
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${btn.color} opacity-0 group-hover:opacity-30 transition-all duration-300 blur-xl -z-10`} />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-all duration-500" />

                      <div className="relative z-10">
                        <motion.div 
                          className="text-6xl mb-4"
                          animate={hoveredBtn === btn.id ? { rotate: 12, scale: 1.1 } : { rotate: 0, scale: 1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          {btn.icon}
                        </motion.div>
                        <h3 className="text-2xl md:text-xl font-bold text-white mb-3 text-left">
                          {btn.label}
                        </h3>
                        <p className="text-white/90 text-sm text-left leading-relaxed">
                          {btn.description}
                        </p>
                      </div>

                      <motion.div
                        className="mt-6 text-yellow-400 text-2xl"
                        animate={hoveredBtn === btn.id ? { x: 5 } : { x: 0 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        →
                      </motion.div>
                    </div>

                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${btn.color} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left`} />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-4 border-t border-cyan-400/20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            ✨ Why NeuroIsland?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '🎮 Play & Earn',
                desc: 'Engage in trivia games and tournaments to earn real cryptocurrency rewards',
              },
              {
                title: '🎨 Collect NFTs',
                desc: 'Own exclusive "Neuro in the Barrel 3D" digital art pieces',
              },
              {
                title: '🌐 Multi-Chain',
                desc: 'Connect wallets from Solana, Ethereum, and Cronos seamlessly',
              },
              {
                title: '🤝 Community',
                desc: 'Join thousands of players in a vibrant Web3 community',
              },
              {
                title: '🔒 Secure',
                desc: 'Enterprise-grade security for your digital assets',
              },
              {
                title: '🚀 Instant',
                desc: 'Fast transactions and instant reward distribution',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-2xl backdrop-blur-sm bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-300/30 hover:border-emerald-300/50 transition-all"
              >
                <h4 className="text-xl font-bold mb-3 text-cyan-200">{feature.title}</h4>
                <p className="text-cyan-100/80">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-cyan-400/20 backdrop-blur-sm bg-gradient-to-b from-blue-900/50 to-teal-900/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <span>🏝️</span>
              <span className="bg-gradient-to-r from-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                NeuroIsland
              </span>
            </h3>
            <p className="text-cyan-200/70">
              Your tropical paradise for gaming, NFTs, and Web3 adventures
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-cyan-300">Navigation</h4>
            <ul className="space-y-2">
              {['Home', 'NFT Gallery', 'Games', 'Wallet'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-cyan-200/70 hover:text-yellow-400 transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-cyan-300">Community</h4>
            <ul className="space-y-2">
              {['Discord', 'Twitter', 'Telegram', 'Instagram'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-cyan-200/70 hover:text-yellow-400 transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-cyan-300">Legal</h4>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-cyan-200/70 hover:text-yellow-400 transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-cyan-400/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-cyan-200/60 text-sm">
              © 2026 NeuroIsland. All rights reserved. 🚀
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-emerald-400">💎 Powered by Web3</span>
              <span className="text-cyan-400">✨ Built with Love</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomePage;
