'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LayoutWrapper from '@/components/LayoutWrapper';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface Player {
  rank: number;
  name: string;
  points: number;
  wins: number;
  club?: string;
  avatar: string;
}

const players: Player[] = [
  { rank: 1, name: 'CryptoMaster99', points: 45230, wins: 127, club: 'Crypto Masters', avatar: '👑' },
  { rank: 2, name: 'TriviaStar42', points: 42890, wins: 118, club: 'Science Nerds', avatar: '⭐' },
  { rank: 3, name: 'QuizGenius7', points: 41560, wins: 115, club: 'History Buffs', avatar: '🧠' },
  { rank: 4, name: 'TechInnovator', points: 39870, wins: 108, club: 'Tech Innovators', avatar: '💻' },
  { rank: 5, name: 'PopCultureKing', points: 38450, wins: 102, club: 'Pop Culture Central', avatar: '🎬' },
  { rank: 6, name: 'ScienceNerd101', points: 36780, wins: 98, club: 'Science Nerds', avatar: '🔬' },
  { rank: 7, name: 'HistoryBuff88', points: 35620, wins: 94, club: 'History Buffs', avatar: '📚' },
  { rank: 8, name: 'SportsFanatic23', points: 34190, wins: 89, avatar: '⚽' },
  { rank: 9, name: 'QuizMaster555', points: 32870, wins: 85, avatar: '🏆' },
  { rank: 10, name: 'BrainChampion99', points: 31450, wins: 81, avatar: '🧠' },
];

const LeaderboardPage = () => {
  const [timeFilter, setTimeFilter] = useState<'all' | 'month' | 'week'>('all');

  return (
    <>
      <LayoutWrapper showFooter={false}>
        <section className="relative py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                🏅 Global Leaderboard
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                See where you stand against the best trivia players worldwide
              </p>
            </motion.div>

            {/* Your Position */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <Card variant="elevated" className="p-6 bg-gradient-to-r from-orange-500/10 to-pink-500/10 border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                      Your Ranking
                    </p>
                    <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
                      #156 • 18,420 Points
                    </h2>
                  </div>
                  <div className="text-5xl">🎯</div>
                </div>
              </Card>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 flex gap-4"
            >
              {(['all', 'month', 'week'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    timeFilter === filter
                      ? 'bg-orange-500 text-white'
                      : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-700'
                  }`}
                >
                  {filter === 'all' && 'All Time'}
                  {filter === 'month' && 'This Month'}
                  {filter === 'week' && 'This Week'}
                </button>
              ))}
            </motion.div>

            {/* Leaderboard Table */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card variant="elevated" className="overflow-hidden">
                <div className="hidden md:block">
                  {/* Header */}
                  <div className="grid grid-cols-12 gap-4 p-6 bg-neutral-100 dark:bg-neutral-800 font-bold text-sm text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-700">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-5">Player</div>
                    <div className="col-span-2">Points</div>
                    <div className="col-span-2">Wins</div>
                    <div className="col-span-2">Club</div>
                  </div>

                  {/* Rows */}
                  {players.map((player, idx) => (
                    <motion.div
                      key={player.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      className="grid grid-cols-12 gap-4 p-6 border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                    >
                      <div className="col-span-1">
                        {player.rank === 1 && <div className="text-2xl">🥇</div>}
                        {player.rank === 2 && <div className="text-2xl">🥈</div>}
                        {player.rank === 3 && <div className="text-2xl">🥉</div>}
                        {player.rank > 3 && (
                          <span className="text-lg font-bold text-neutral-600 dark:text-neutral-400">
                            #{player.rank}
                          </span>
                        )}
                      </div>

                      <div className="col-span-5 flex items-center gap-3">
                        <span className="text-2xl">{player.avatar}</span>
                        <span className="font-bold text-neutral-900 dark:text-white">
                          {player.name}
                        </span>
                      </div>

                      <div className="col-span-2">
                        <span className="font-bold text-lg text-orange-500">
                          {player.points.toLocaleString()}
                        </span>
                      </div>

                      <div className="col-span-2">
                        <Badge variant="secondary" size="sm">
                          {player.wins}
                        </Badge>
                      </div>

                      <div className="col-span-2 text-sm text-neutral-600 dark:text-neutral-400">
                        {player.club ? player.club : '—'}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Version */}
                <div className="md:hidden">
                  {players.map((player, idx) => (
                    <motion.div
                      key={player.rank}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      className="p-4 border-b border-neutral-200 dark:border-neutral-700 last:border-b-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {player.rank === 1 && <span>🥇</span>}
                          {player.rank === 2 && <span>🥈</span>}
                          {player.rank === 3 && <span>🥉</span>}
                          {player.rank > 3 && <span className="font-bold">#{player.rank}</span>}
                          <span className="text-lg">{player.avatar}</span>
                          <span className="font-bold">{player.name}</span>
                        </div>
                        <span className="font-bold text-orange-500">{player.points.toLocaleString()}</span>
                      </div>
                      <div className="flex gap-2 text-sm">
                        <Badge variant="secondary" size="sm">{player.wins} Wins</Badge>
                        {player.club && (
                          <span className="text-neutral-600 dark:text-neutral-400">{player.club}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12"
            >
              <Link href="/neuro-trivia">
                <Button variant="outline" size="md">
                  ← Back to Neuro Trivia
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </LayoutWrapper>
      <Footer />
    </>
  );
};

export default LeaderboardPage;
