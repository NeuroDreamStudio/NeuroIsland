import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
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
      href: '/rewards',
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
      id: 'ecosystem',
      label: '🗺️ Island Map',
      description: 'Explore the Neuro ecosystem',
      color: 'from-blue-400 via-teal-500 to-green-600',
      href: '#ecosystem',
      icon: '🌴',
    },
  ];

  return (
    <>
      <div 
        className="min-h-screen w-full overflow-hidden"
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

      {/* Menu Buttons Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {buttons.map((btn, index) => (
            <motion.div
              key={btn.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link href={btn.href}>
                <motion.div
                  className={`relative bg-gradient-to-r ${btn.color} p-6 rounded-xl cursor-pointer group overflow-hidden`}
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setHoveredBtn(btn.id)}
                  onMouseLeave={() => setHoveredBtn(null)}
                >
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-all duration-500" />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className="text-4xl"
                        animate={hoveredBtn === btn.id ? { rotate: 12, scale: 1.1 } : { rotate: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {btn.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{btn.label}</h3>
                        <p className="text-white/90 text-sm">{btn.description}</p>
                      </div>
                    </div>
                    <motion.div
                      className="text-white text-2xl font-bold"
                      animate={hoveredBtn === btn.id ? { x: 10 } : { x: 0 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      →
                    </motion.div>
                  </div>

                  {/* Border glow effect */}
                  <div className={`absolute inset-0 border-2 border-white/20 group-hover:border-white/50 rounded-xl transition-all duration-300 pointer-events-none`} />
                </motion.div>
              </Link>
            </motion.div>
          ))}
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
      </div>

      {/* FOOTER SECTION - Completely separate */}
      <Footer />
    </>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="relative mt-20 bg-black border-t-4 border-cyan-500">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-3 flex items-center justify-center space-x-3">
            <span>🏝️</span>
            <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
              NeuroIsland
            </span>
          </h3>
          <p className="text-cyan-200 text-lg max-w-2xl mx-auto">
            Your tropical paradise for gaming, NFTs, and Web3 adventures
          </p>
        </div>

        {/* Categories Grid */}
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-3 gap-12 w-full max-w-4xl">
            {/* Navigation */}
            <div className="flex flex-col items-start">
              <h4 className="text-lg font-bold mb-5 text-cyan-400 uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-3 text-left w-full">
                {['Home', 'NFT Gallery', 'Games', 'Rewards'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white visited:text-white hover:text-yellow-400 transition duration-200 font-medium">
                      {link}
                    </a>
                  </li>
                ))}  
              </ul>
            </div>

            {/* Community */}
            <div className="flex flex-col items-start">
              <h4 className="text-lg font-bold mb-5 text-emerald-400 uppercase tracking-wider">Community</h4>
              <ul className="space-y-3 text-left w-full">
                {['Discord', 'Twitter', 'Telegram', 'Instagram'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white visited:text-white hover:text-yellow-400 transition duration-200 font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="flex flex-col items-start">
              <h4 className="text-lg font-bold mb-5 text-teal-400 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-3 text-left w-full">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white visited:text-white hover:text-yellow-400 transition duration-200 font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cyan-500/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
            <p className="text-gray-400 text-sm">
              © 2026 NeuroIsland. All rights reserved. 🚀
            </p>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <span className="text-emerald-400 font-medium">💎 Powered by Web3</span>
              <span className="text-cyan-400 font-medium">✨ Built with Love</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomePage;
