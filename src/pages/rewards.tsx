import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const RewardsPage: React.FC = () => {
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const dailyRewards = [
    {
      id: 'login',
      title: 'Daily Login Bonus',
      reward: '+10 Points',
      description: 'Log in every day to earn bonus points',
      icon: '📅',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      id: 'trivia',
      title: 'Trivia Win Rewards',
      reward: '+50-500 Points',
      description: 'Earn points for each trivia game won',
      icon: '🧠',
      color: 'from-purple-400 to-pink-500',
    },
    {
      id: 'streak',
      title: 'Win Streak Bonus',
      reward: '+100 Points',
      description: 'Win 5 games in a row to get a bonus',
      icon: '🔥',
      color: 'from-orange-400 to-red-500',
    },
    {
      id: 'referral',
      title: 'Referral Program',
      reward: '+200 Points',
      description: 'Invite friends and earn rewards',
      icon: '👥',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      id: 'nft',
      title: 'NFT Holder Bonus',
      reward: '+25 Points/day',
      description: 'Earn daily bonus for holding Neuro NFTs',
      icon: '🎨',
      color: 'from-pink-400 to-rose-500',
    },
    {
      id: 'tournament',
      title: 'Tournament Prize',
      reward: '+1000 Points',
      description: 'Win tournaments to earn major rewards',
      icon: '🏆',
      color: 'from-yellow-400 to-amber-500',
    },
  ];

  const tiers = [
    {
      level: 'Bronze',
      points: '0-500',
      benefits: ['5% bonus multiplier', 'Basic NFT access', 'Discord role'],
      icon: '🥉',
    },
    {
      level: 'Silver',
      points: '501-2000',
      benefits: ['10% bonus multiplier', 'Exclusive NFTs', 'Priority support', 'Monthly draw'],
      icon: '🥈',
    },
    {
      level: 'Gold',
      points: '2001-5000',
      benefits: ['15% bonus multiplier', 'Rare NFT drops', 'VIP support', 'Weekly prizes'],
      icon: '🥇',
    },
    {
      level: 'Platinum',
      points: '5000+',
      benefits: ['25% bonus multiplier', 'Legendary NFTs', '24/7 VIP support', 'Daily rewards', 'Special events'],
      icon: '💎',
    },
  ];

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: 'url(/assets/images/base.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="fixed inset-0 -z-20 bg-black/30" />

      {/* Navigation */}
      <nav className="relative z-50 backdrop-blur-md bg-gradient-to-r from-blue-900/80 via-teal-900/80 to-cyan-900/80 border-b border-cyan-400/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" legacyBehavior>
              <a>
                <motion.div 
                  className="flex items-center space-x-3 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="text-4xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    🏝️
                  </motion.div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                    NeuroIsland
                  </h1>
                </motion.div>
              </a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="text-cyan-300 hover:text-yellow-400 transition font-medium">
                ← Back Home
              </a>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="relative pt-16 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
              🎁 Rewards Hub
            </h2>
            <p className="text-lg md:text-xl text-cyan-100 max-w-3xl mx-auto">
              Earn points and climb the ranks. The more you play, the more you earn!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Daily Rewards */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-cyan-300">
            💰 Daily Rewards
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyRewards.map((reward, idx) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedReward(reward.id)}
                className="group cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${reward.color} p-6 rounded-2xl backdrop-blur-xl border border-white/20 h-full hover:border-white/40 transition-all`}>
                  <div className="text-5xl mb-4">{reward.icon}</div>
                  <h4 className="text-xl font-bold text-white mb-2">{reward.title}</h4>
                  <p className="text-white/90 text-sm mb-3">{reward.description}</p>
                  <div className="text-2xl font-bold text-white">{reward.reward}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier System */}
      <section className="relative py-16 px-4 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-emerald-300">
            🏆 Tier System
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, idx) => (
              <motion.div
                key={tier.level}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-2xl backdrop-blur-xl border ${
                  tier.level === 'Platinum'
                    ? 'border-yellow-400/50 bg-gradient-to-br from-yellow-500/20 to-amber-500/20'
                    : tier.level === 'Gold'
                    ? 'border-yellow-300/30 bg-gradient-to-br from-yellow-400/10 to-amber-400/10'
                    : tier.level === 'Silver'
                    ? 'border-gray-300/30 bg-gradient-to-br from-gray-400/10 to-gray-500/10'
                    : 'border-orange-300/30 bg-gradient-to-br from-orange-400/10 to-orange-500/10'
                } hover:border-white/40 transition-all`}
              >
                <div className="text-5xl mb-3">{tier.icon}</div>
                <h4 className="text-2xl font-bold text-white mb-2">{tier.level}</h4>
                <p className="text-cyan-300 text-sm mb-4">{tier.points} points</p>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="text-cyan-100 text-sm flex items-start">
                      <span className="mr-2">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 px-4 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-pink-300">
            📊 Your Rewards Summary
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Points', value: '2,450', emoji: '⭐' },
              { label: 'Current Tier', value: 'Silver', emoji: '🥈' },
              { label: 'Streak Days', value: '12', emoji: '🔥' },
              { label: 'Rewards Claimed', value: '34', emoji: '🎁' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-cyan-400/30 p-6 rounded-2xl text-center"
              >
                <div className="text-4xl mb-3">{stat.emoji}</div>
                <p className="text-cyan-300 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <div style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
        <Footer />
      </div>
    </div>
  );
};

export default RewardsPage;
