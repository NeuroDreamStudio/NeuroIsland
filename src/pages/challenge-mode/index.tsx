'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LayoutWrapper from '@/components/LayoutWrapper';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface Challenge {
  id: string;
  opponent: string;
  opponentAvatar: string;
  status: 'waiting' | 'in-progress' | 'completed';
  yourScore?: number;
  theirScore?: number;
  timeLeft?: number;
}

const mockChallenges: Challenge[] = [
  {
    id: '1',
    opponent: 'CryptoMaster99',
    opponentAvatar: '👤',
    status: 'in-progress',
    yourScore: 7,
    theirScore: 6,
    timeLeft: 45,
  },
  {
    id: '2',
    opponent: 'TriviaKing42',
    opponentAvatar: '👤',
    status: 'waiting',
  },
  {
    id: '3',
    opponent: 'QuizGenius7',
    opponentAvatar: '👤',
    status: 'completed',
    yourScore: 8,
    theirScore: 5,
  },
];

const ChallengeMode = () => {
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    // Simulate timer for in-progress challenges
    const timer = setInterval(() => {
      setChallenges((prev) =>
        prev.map((challenge) => ({
          ...challenge,
          timeLeft:
            challenge.status === 'in-progress' && challenge.timeLeft
              ? Math.max(0, challenge.timeLeft - 1)
              : challenge.timeLeft,
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: Challenge['status']) => {
    switch (status) {
      case 'waiting':
        return 'from-yellow-500 to-orange-500';
      case 'in-progress':
        return 'from-blue-500 to-cyan-500';
      case 'completed':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-neutral-500 to-neutral-600';
    }
  };

  return (
    <>
      <LayoutWrapper showFooter={false}>
        <section className="relative py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                ⚡ Challenge Mode
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                1v1 real-time battles - 15 seconds per question
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card variant="elevated" className="p-6 text-center">
                  <div className="text-4xl mb-2">🎮</div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                    Challenges
                  </p>
                  <p className="text-3xl font-bold text-blue-500">{challenges.length}</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="elevated" className="p-6 text-center">
                  <div className="text-4xl mb-2">🟢</div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                    In Progress
                  </p>
                  <p className="text-3xl font-bold text-emerald-500">
                    {challenges.filter((c) => c.status === 'in-progress').length}
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card variant="elevated" className="p-6 text-center">
                  <div className="text-4xl mb-2">🏆</div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                    Wins
                  </p>
                  <p className="text-3xl font-bold text-pink-500">
                    {challenges.filter(
                      (c) => c.status === 'completed' && c.yourScore! > c.theirScore!
                    ).length}
                  </p>
                </Card>
              </motion.div>
            </div>

            {/* Challenges List */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-neutral-900 dark:text-white">
                Your Challenges
              </h2>
              <div className="space-y-4">
                {challenges.map((challenge, idx) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card variant="elevated" hover className="p-6 cursor-pointer">
                      <div className="flex items-center justify-between">
                        {/* Opponent Info */}
                        <div className="flex items-center gap-4 flex-1">
                          <div className="text-5xl">{challenge.opponentAvatar}</div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                              {challenge.opponent}
                            </h3>
                            <Badge
                              variant={
                                challenge.status === 'waiting'
                                  ? 'warning'
                                  : challenge.status === 'in-progress'
                                  ? 'success'
                                  : 'secondary'
                              }
                              size="sm"
                            >
                              {challenge.status === 'waiting' && '🟡 Waiting for response'}
                              {challenge.status === 'in-progress' && '🟢 In Progress'}
                              {challenge.status === 'completed' && '⚪ Completed'}
                            </Badge>
                          </div>
                        </div>

                        {/* Score & Actions */}
                        <div className="text-right">
                          {challenge.status === 'in-progress' && (
                            <div className="mb-2">
                              <div className="flex items-center gap-2 justify-end">
                                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                  You: <span className="font-bold">{challenge.yourScore}</span>
                                </div>
                                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                  {challenge.opponent.substring(0, 8)}: <span className="font-bold">{challenge.theirScore}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {challenge.status === 'completed' && (
                            <div className="mb-2">
                              <div className={`text-lg font-bold ${
                                challenge.yourScore! > challenge.theirScore!
                                  ? 'text-emerald-500'
                                  : challenge.yourScore! < challenge.theirScore!
                                  ? 'text-red-500'
                                  : 'text-yellow-500'
                              }`}>
                                {challenge.yourScore! > challenge.theirScore!
                                  ? '✅ Win'
                                  : challenge.yourScore! < challenge.theirScore!
                                  ? '❌ Loss'
                                  : '🤝 Draw'}
                              </div>
                            </div>
                          )}

                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setSelectedChallenge(challenge)}
                          >
                            {challenge.status === 'waiting' && 'Accept'}
                            {challenge.status === 'in-progress' && 'Continue'}
                            {challenge.status === 'completed' && 'View'}
                          </Button>
                        </div>
                      </div>

                      {/* Timer */}
                      {challenge.status === 'in-progress' && challenge.timeLeft !== undefined && (
                        <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-600 dark:text-neutral-400">Time remaining:</span>
                            <span className={`font-bold ${challenge.timeLeft < 30 ? 'text-red-500' : 'text-neutral-900 dark:text-white'}`}>
                              ⏱️ {Math.floor(challenge.timeLeft / 60)}:{String(challenge.timeLeft % 60).padStart(2, '0')}
                            </span>
                          </div>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* New Challenge Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-16"
            >
              <Card variant="elevated" className="p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-0">
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                  Challenge a Friend
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Invite a friend to a 1v1 battle and see who\'s the better trivia master!
                </p>
                <Button variant="primary" size="lg">
                  🔗 Create Challenge
                </Button>
              </Card>
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/neuro-trivia">
                <Button variant="outline" size="md">
                  ← Back to Neuro Trivia
                </Button>
              </Link>
            </motion.div>

            {/* Modal */}
            {selectedChallenge && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setSelectedChallenge(null)}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              >
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white dark:bg-neutral-900 rounded-2xl p-8 max-w-md w-full"
                >
                  <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                    Challenge with {selectedChallenge.opponent}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    Status: {selectedChallenge.status}
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full mb-3"
                  >
                    ⚡ Continue Challenge
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => setSelectedChallenge(null)}
                  >
                    Cancel
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </div>
        </section>
      </LayoutWrapper>
      <Footer />
    </>
  );
};

export default ChallengeMode;
