'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LayoutWrapper from '@/components/LayoutWrapper';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface Club {
  id: string;
  name: string;
  emoji: string;
  members: number;
  description: string;
  founder: string;
  joined?: boolean;
}

const clubs: Club[] = [
  {
    id: '1',
    name: 'Crypto Masters',
    emoji: '💰',
    members: 234,
    description: 'For cryptocurrency and blockchain enthusiasts',
    founder: 'CryptoKing99',
    joined: true,
  },
  {
    id: '2',
    name: 'Science Nerds',
    emoji: '🔬',
    members: 567,
    description: 'All things science and technology',
    founder: 'ScienceGuy42',
    joined: true,
  },
  {
    id: '3',
    name: 'History Buffs',
    emoji: '📚',
    members: 189,
    description: 'History enthusiasts from around the world',
    founder: 'HistorianPro',
  },
  {
    id: '4',
    name: 'Pop Culture Central',
    emoji: '🎬',
    members: 812,
    description: 'Movies, TV shows, music, and entertainment',
    founder: 'PopCultureAddict',
  },
  {
    id: '5',
    name: 'Sports Talk',
    emoji: '⚽',
    members: 456,
    description: 'All sports - football, basketball, soccer and more',
    founder: 'SportsFanatic',
  },
  {
    id: '6',
    name: 'Tech Innovators',
    emoji: '💻',
    members: 345,
    description: 'Latest tech trends and innovations',
    founder: 'TechEnthusiast',
  },
];

const ClubsPage = () => {
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
                👥 Clubs
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                Join communities and compete together with like-minded players
              </p>
            </motion.div>

            {/* Create Club Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12 text-center"
            >
              <Button variant="primary" size="lg">
                ✨ Create Your Club
              </Button>
            </motion.div>

            {/* Clubs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {clubs.map((club, idx) => (
                <motion.div
                  key={club.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Card variant="elevated" hover className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-4xl">{club.emoji}</span>
                          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                            {club.name}
                          </h3>
                        </div>
                        {club.joined && (
                          <Badge variant="success" size="sm">
                            ✓ Member
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 flex-1">
                      {club.description}
                    </p>

                    <div className="space-y-2 pb-4 border-b border-neutral-200 dark:border-neutral-700 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600 dark:text-neutral-400">Members:</span>
                        <span className="font-bold">{club.members}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600 dark:text-neutral-400">Founder:</span>
                        <span className="font-bold text-orange-500">{club.founder}</span>
                      </div>
                    </div>

                    <Button
                      variant={club.joined ? 'outline' : 'primary'}
                      size="sm"
                      className="w-full"
                    >
                      {club.joined ? '✓ View Club' : '+ Join Club'}
                    </Button>
                  </Card>
                </motion.div>
              ))}
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
          </div>
        </section>
      </LayoutWrapper>
      <Footer />
    </>
  );
};

export default ClubsPage;
