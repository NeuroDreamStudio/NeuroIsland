'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LayoutWrapper from './LayoutWrapper';
import Footer from './Footer';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

const NeuroTrivia: React.FC = () => {
  const gameModes = [
    {
      id: 'tournament',
      name: 'Tournament Mode',
      emoji: '🏆',
      description: 'Compete in tournaments with real prizes',
      details: '30 seconds per question | Earn SOL rewards',
      color: 'from-yellow-500 to-orange-500',
      href: '/pages/tournament-mode',
      badge: 'Popular',
    },
    {
      id: 'challenge',
      name: 'Challenge Mode',
      emoji: '⚡',
      description: '1v1 battles against other players',
      details: '15 seconds per question | Real-time competition',
      color: 'from-purple-500 to-pink-500',
      href: '/pages/challenge-mode',
      badge: 'Trending',
    },
    {
      id: 'free-play',
      name: 'Free Play',
      emoji: '🎮',
      description: 'Practice and learn at your own pace',
      details: '10 seconds per question | No stakes',
      color: 'from-cyan-500 to-blue-500',
      href: '/pages/free-play-mode',
      badge: null,
    },
  ];

  const tutorialSteps = [
    {
      step: 1,
      title: 'Choose Your Mode',
      description: 'Select Tournament, Challenge, or Free Play based on your preference',
      icon: '🎯',
    },
    {
      step: 2,
      title: 'Answer Questions',
      description: 'Read each question carefully and select the correct answer within the time limit',
      icon: '💭',
    },
    {
      step: 3,
      title: 'Earn Rewards',
      description: 'Earn SOL tokens for correct answers and unlock achievements',
      icon: '🎁',
    },
    {
      step: 4,
      title: 'Climb the Leaderboard',
      description: 'Track your progress and compete with players worldwide',
      icon: '📈',
    },
  ];

  const communityLinks = [
    {
      id: 'clubs',
      title: '👥 Clubs',
      description: 'Join communities and compete together',
      href: '/pages/clubs',
    },
    {
      id: 'leaderboard',
      title: '🏅 Leaderboard',
      description: 'See global rankings and achievements',
      href: '/pages/leaderboard',
    },
  ];

  return (
    <>
      <LayoutWrapper showFooter={false}>
        <section className="relative py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-20"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                🧠 <span className="bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent">Neuro Trivia</span>
              </h1>
              <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-2">
                Test your knowledge and earn real rewards
              </p>
              <p className="text-lg text-neutral-500 dark:text-neutral-500">
                Multiple game modes • Global competition • Web3 integration
              </p>
            </motion.div>

            {/* Game Modes Section */}
            <div className="mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-neutral-900 dark:text-white">
                Choose Your Challenge
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {gameModes.map((mode, idx) => (
                  <motion.div
                    key={mode.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link href={mode.href}>
                      <Card
                        variant="elevated"
                        hover
                        className="h-full overflow-hidden cursor-pointer relative group"
                      >
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                        <div className="relative z-10 p-8">
                          {/* Badge */}
                          {mode.badge && (
                            <div className="mb-4">
                              <Badge
                                variant={
                                  mode.badge === 'Popular'
                                    ? 'accent'
                                    : mode.badge === 'Trending'
                                    ? 'secondary'
                                    : 'primary'
                                }
                                size="sm"
                              >
                                {mode.badge}
                              </Badge>
                            </div>
                          )}

                          {/* Icon & Title */}
                          <div className="mb-6">
                            <div className="text-6xl mb-3">{mode.emoji}</div>
                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                              {mode.name}
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                              {mode.description}
                            </p>
                          </div>

                          {/* Details */}
                          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                            <span>{mode.details}</span>
                          </div>

                          {/* Play Button */}
                          <Button
                            variant="primary"
                            size="md"
                            className="w-full"
                          >
                            Play Now →
                          </Button>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* How to Play Section */}
            <div className="mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-neutral-900 dark:text-white">
                📚 How to Play
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tutorialSteps.map((step, idx) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card variant="outlined" className="p-6 text-center h-full">
                      <div className="text-5xl mb-4">{step.icon}</div>
                      <div className="text-3xl font-bold text-orange-500 mb-3">{step.step}</div>
                      <h3 className="font-bold text-lg mb-3 text-neutral-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        {step.description}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Community Section */}
            <div className="mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-neutral-900 dark:text-white">
                Join the Community
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {communityLinks.map((link, idx) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link href={link.href}>
                      <Card
                        variant="elevated"
                        hover
                        className="p-8 text-center cursor-pointer h-full flex flex-col items-center justify-center"
                      >
                        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
                          {link.title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          {link.description}
                        </p>
                        <div className="mt-6">
                          <Badge variant="secondary" size="sm">
                            Coming Soon
                          </Badge>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <Card
                variant="elevated"
                className="p-12 bg-gradient-to-r from-orange-500/10 to-pink-500/10 border-0"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
                  Ready to Test Your Knowledge?
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                  Connect your wallet and start earning rewards today
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/pages/free-play-mode" className="flex-1 sm:flex-none">
                    <Button variant="primary" size="lg">
                      🚀 Get Started
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg">
                    📖 Learn More
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </LayoutWrapper>
      <Footer />
    </>
  );
};

export default NeuroTrivia;
