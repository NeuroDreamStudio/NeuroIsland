'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';

interface Player {
  rank: number;
  name: string;
  points: number;
  wins: number;
  level: string;
  emoji: string;
  isYou?: boolean;
}

const mockPlayers: Player[] = [
  { rank: 1, name: 'CryptoMaster99', points: 45890, wins: 234, level: '🔴 Legend', emoji: '👑', isYou: false },
  { rank: 2, name: 'TriviaKing42', points: 42350, wins: 198, level: '🟠 Master', emoji: '🧠', isYou: false },
  { rank: 3, name: 'QuizGenius7', points: 39120, wins: 176, level: '🟡 Elite', emoji: '⚡', isYou: false },
  { rank: 4, name: 'NeuralStrike', points: 37890, wins: 165, level: '🟢 Expert', emoji: '🎯', isYou: false },
  { rank: 5, name: 'PixelMind', points: 35670, wins: 152, level: '🔵 Expert', emoji: '🌟', isYou: false },
  { rank: 6, name: 'You', points: 28450, wins: 124, level: '🟣 Advanced', emoji: '😎', isYou: true },
  { rank: 7, name: 'IceBreaker22', points: 25890, wins: 112, level: '⚪ Advanced', emoji: '❄️', isYou: false },
  { rank: 8, name: 'SonicWave99', points: 23450, wins: 98, level: '⚪ Intermediate', emoji: '🌊', isYou: false },
  { rank: 9, name: 'PhantomX', points: 21340, wins: 87, level: '⚪ Intermediate', emoji: '👻', isYou: false },
  { rank: 10, name: 'CosmicRay', points: 19870, wins: 76, level: '⚪ Intermediate', emoji: '🚀', isYou: false },
];

const LeaderboardPage = () => {
  const [filter, setFilter] = useState('all');

  const filteredPlayers = filter === 'all' ? mockPlayers : mockPlayers.slice(0, 10);

  return (
    <>
      <div 
        className="min-h-screen w-full overflow-visible"
        style={{
          backgroundImage: 'url(/assets/images/base.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="fixed inset-0 -z-20 bg-black/30" />

        <section className="relative pt-16 pb-32 px-4 md:px-16 lg:px-24 min-h-screen flex items-center justify-center overflow-x-hidden">
          <div className="w-full max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-black mb-4">
                🏆 <span style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Leaderboard</span>
              </h1>
              <p className="text-lg md:text-xl text-cyan-100">Compete and climb the ranks</p>
            </motion.div>

            {/* Your Position Card */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              style={{
                padding: '24px',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(34, 197, 94, 0.5)',
                background: 'rgba(34, 197, 94, 0.2)',
                boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3)',
                color: 'white',
                marginBottom: '24px',
                maxWidth: '512px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                <div>
                  <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>YOUR CURRENT RANK</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold' }}>
                    #6 - 😎 You
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px', textAlign: 'right' }}>Points</p>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'right' }}>28,450</p>
                  <p style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px', color: 'rgba(34, 197, 94, 0.8)' }}>↑ 2 spots this week</p>
                </div>
              </div>
            </motion.div>

            {/* Filter Buttons */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
              {['all', 'this week', 'this month'].map((period, idx) => (
                <motion.button
                  key={period}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1, duration: 0.8 }}
                  onClick={() => setFilter(period)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '12px',
                    border: filter === period ? '2px solid rgba(168, 85, 247, 0.6)' : '1px solid rgba(255,255,255,0.2)',
                    background: filter === period ? 'rgba(168, 85, 247, 0.3)' : 'transparent',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = filter === period ? 'rgba(168, 85, 247, 0.5)' : 'rgba(168, 85, 247, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = filter === period ? 'rgba(168, 85, 247, 0.3)' : 'transparent';
                  }}
                >
                  {period === 'all' && '📊 All Time'}
                  {period === 'this week' && '📅 This Week'}
                  {period === 'this month' && '📆 This Month'}
                </motion.button>
              ))}
            </div>

            {/* Players Table - Grid Layout */}
            <div className="max-w-4xl mx-auto mb-16">
              {filteredPlayers.map((player, idx) => (
                <motion.div
                  key={player.rank}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05, duration: 0.6 }}
                  style={{
                    padding: '20px 24px',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    border: player.isYou ? '2px solid rgba(34, 197, 94, 0.5)' : '1px solid rgba(255,255,255,0.1)',
                    background: player.isYou ? 'rgba(34, 197, 94, 0.1)' : idx % 2 === 0 ? 'rgba(99, 102, 241, 0.1)' : 'rgba(168, 85, 247, 0.1)',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(8px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                    <div style={{ 
                      fontSize: '24px', 
                      fontWeight: 'bold', 
                      minWidth: '40px',
                      color: player.rank <= 3 ? idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : '#CD7F32' : 'rgba(255,255,255,0.6)',
                    }}>
                      #{player.rank}
                    </div>
                    <div>
                      <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                        {player.emoji} {player.name}
                      </p>
                      <p style={{ fontSize: '12px', opacity: 0.7 }}>{player.level}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '24px', alignItems: 'center', textAlign: 'right' }}>
                    <div>
                      <p style={{ fontSize: '11px', opacity: 0.7, marginBottom: '2px' }}>Wins</p>
                      <p style={{ fontSize: '16px', fontWeight: '600' }}>{player.wins}</p>
                    </div>
                    <div style={{ minWidth: '100px' }}>
                      <p style={{ fontSize: '11px', opacity: 0.7, marginBottom: '2px' }}>Points</p>
                      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#FFD700' }}>
                        {player.points.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                padding: '32px',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(245, 158, 11, 0.2)',
                boxShadow: '0 8px 32px rgba(245, 158, 11, 0.2)',
                color: 'white',
                textAlign: 'center',
                marginBottom: '16px',
                maxWidth: '512px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                Ready to climb the ranks?
              </h2>
              <p style={{ marginBottom: '16px', opacity: 0.8 }}>
                Start playing and earn points to improve your position!
              </p>
              <Link href="/free-play-mode" legacyBehavior>
                <a
                  style={{
                    display: 'inline-block',
                    padding: '16px 40px',
                    borderRadius: '12px',
                    border: 'none',
                    background: 'rgba(245, 158, 11, 0.5)',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(245, 158, 11, 0.7)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(245, 158, 11, 0.5)';
                  }}
                >
                  🎮 Play Now
                </a>
              </Link>
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{ textAlign: 'center' }}
            >
              <Link href="/neuro-trivia" legacyBehavior>
                <a
                  style={{
                    display: 'inline-block',
                    padding: '16px 40px',
                    borderRadius: '16px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(107, 114, 128, 0.3)',
                    boxShadow: '0 8px 32px rgba(107, 114, 128, 0.3)',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'transform 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  }}
                >
                  ← Back to Neuro Trivia
                </a>
              </Link>
            </motion.div>
          </div>
        </section>

        <div className="w-full min-h-screen"></div>
        <div style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default LeaderboardPage;
