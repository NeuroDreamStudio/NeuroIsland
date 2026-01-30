'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LayoutWrapper from '@/components/LayoutWrapper';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface Tournament {
  id: string;
  name: string;
  entryFee: number;
  prizePool: number;
  participants: number;
  status: 'upcoming' | 'active' | 'ended';
  startTime: string;
  timePerQuestion: number;
  totalQuestions: number;
}

const mockTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Crypto Masters Tournament',
    entryFee: 0.5,
    prizePool: 100,
    participants: 42,
    status: 'active',
    startTime: 'Now - 2 hours left',
    timePerQuestion: 30,
    totalQuestions: 10,
  },
  {
    id: '2',
    name: 'General Knowledge Challenge',
    entryFee: 0.1,
    prizePool: 50,
    participants: 128,
    status: 'active',
    startTime: 'Now - 4 hours left',
    timePerQuestion: 30,
    totalQuestions: 15,
  },
  {
    id: '3',
    name: 'Science & Tech Showdown',
    entryFee: 1.0,
    prizePool: 500,
    participants: 18,
    status: 'upcoming',
    startTime: 'Starts in 2 hours',
    timePerQuestion: 30,
    totalQuestions: 20,
  },
];

const TournamentMode = () => {
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);

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
                🏆 Tournament Mode
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                Compete against other players and earn real rewards
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
                    Active Tournaments
                  </p>
                  <p className="text-3xl font-bold text-orange-500">{mockTournaments.filter(t => t.status === 'active').length}</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="elevated" className="p-6 text-center">
                  <div className="text-4xl mb-2">👥</div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                    Total Players
                  </p>
                  <p className="text-3xl font-bold text-pink-500">{mockTournaments.reduce((sum, t) => sum + t.participants, 0)}</p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card variant="elevated" className="p-6 text-center">
                  <div className="text-4xl mb-2">💰</div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                    Prize Pool
                  </p>
                  <p className="text-3xl font-bold text-emerald-500">{mockTournaments.reduce((sum, t) => sum + t.prizePool, 0)} SOL</p>
                </Card>
              </motion.div>
            </div>

            {/* Tournaments List */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-neutral-900 dark:text-white">
                Available Tournaments
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockTournaments.map((tournament, idx) => (
                  <motion.div
                    key={tournament.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card variant="elevated" hover className="p-6 h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                            {tournament.name}
                          </h3>
                          <div className="flex gap-2">
                            <Badge
                              variant={
                                tournament.status === 'active'
                                  ? 'success'
                                  : tournament.status === 'upcoming'
                                  ? 'warning'
                                  : 'secondary'
                              }
                              size="sm"
                            >
                              {tournament.status === 'active' && '🟢 Active'}
                              {tournament.status === 'upcoming' && '🟡 Upcoming'}
                              {tournament.status === 'ended' && '⚪ Ended'}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Tournament Details */}
                      <div className="space-y-3 mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-600 dark:text-neutral-400">Entry Fee:</span>
                          <span className="font-bold text-neutral-900 dark:text-white">{tournament.entryFee} SOL</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-600 dark:text-neutral-400">Prize Pool:</span>
                          <span className="font-bold text-emerald-500">{tournament.prizePool} SOL</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-600 dark:text-neutral-400">Participants:</span>
                          <span className="font-bold text-neutral-900 dark:text-white">{tournament.participants}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-600 dark:text-neutral-400">Questions:</span>
                          <span className="font-bold text-neutral-900 dark:text-white">{tournament.totalQuestions} (30s each)</span>
                        </div>
                      </div>

                      {/* Info */}
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                        ⏰ {tournament.startTime}
                      </p>

                      {/* Actions */}
                      <Button
                        variant="primary"
                        size="md"
                        className="w-full"
                        onClick={() => setSelectedTournament(tournament)}
                      >
                        {tournament.status === 'active' ? '⚡ Join Now' : 'ℹ️ Learn More'}
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/neuro-trivia">
                <Button variant="outline" size="md">
                  ← Back to Neuro Trivia
                </Button>
              </Link>
            </motion.div>

            {/* Modal */}
            {selectedTournament && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setSelectedTournament(null)}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              >
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white dark:bg-neutral-900 rounded-2xl p-8 max-w-md w-full"
                >
                  <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                    {selectedTournament.name}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    Entry fee: {selectedTournament.entryFee} SOL
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full mb-3"
                  >
                    💰 Connect Wallet & Join
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => setSelectedTournament(null)}
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

export default TournamentMode;
