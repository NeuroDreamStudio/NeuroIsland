'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';

interface Challenge {
  id: string;
  opponent: string;
  status: 'waiting' | 'in-progress' | 'completed';
  yourScore?: number;
  theirScore?: number;
}

const mockChallenges: Challenge[] = [
  { id: '1', opponent: 'CryptoMaster99', status: 'in-progress', yourScore: 7, theirScore: 6 },
  { id: '2', opponent: 'TriviaKing42', status: 'waiting' },
  { id: '3', opponent: 'QuizGenius7', status: 'completed', yourScore: 8, theirScore: 5 },
];

const ChallengeMode = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

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
                ⚡ <span style={{
                  background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #fbbf24 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Challenges</span>
              </h1>
              <p className="text-lg md:text-xl text-cyan-100">1v1 real-time battles</p>
            </motion.div>

            {/* Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px', mb: '16px', width: '100%', marginBottom: '3rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Challenges', value: '3', emoji: '🎮', color: 'rgba(59, 130, 246, 0.2)' },
                { label: 'In Progress', value: '1', emoji: '🟢', color: 'rgba(34, 197, 94, 0.2)' },
                { label: 'Wins', value: '1', emoji: '🏆', color: 'rgba(236, 72, 153, 0.2)' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                >
                  <div
                    style={{
                      padding: '16px 24px',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: stat.color,
                      boxShadow: `0 8px 32px ${stat.color}`,
                      color: 'white',
                      textAlign: 'center',
                      minWidth: '120px',
                      flex: '1',
                    }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.emoji}</div>
                    <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>{stat.label}</p>
                    <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Challenges List */}
            <div className="mb-16 w-full">
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '20px', textAlign: 'center' }}>
                Your Challenges
              </h2>
              <div style={{ display: 'flex', gap: '16px', marginTop: '2.5rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                {mockChallenges.map((challenge, idx) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                  >
                    <div
                      style={{
                        display: 'inline-block',
                        width: 'fit-content',
                        padding: '24px 64px',
                        borderRadius: '16px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: challenge.status === 'in-progress' ? 'rgba(34, 197, 94, 0.3)' : challenge.status === 'completed' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(245, 158, 11, 0.3)',
                        boxShadow: challenge.status === 'in-progress' ? '0 8px 32px rgba(34, 197, 94, 0.3)' : challenge.status === 'completed' ? '0 8px 32px rgba(59, 130, 246, 0.3)' : '0 8px 32px rgba(245, 158, 11, 0.3)',
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        textAlign: 'center',
                      }}
                      onClick={() => setSelectedChallenge(challenge)}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                        (e.currentTarget as HTMLElement).style.boxShadow = challenge.status === 'in-progress' ? '0 16px 48px rgba(34, 197, 94, 0.5)' : challenge.status === 'completed' ? '0 16px 48px rgba(59, 130, 246, 0.5)' : '0 16px 48px rgba(245, 158, 11, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                        (e.currentTarget as HTMLElement).style.boxShadow = challenge.status === 'in-progress' ? '0 8px 32px rgba(34, 197, 94, 0.3)' : challenge.status === 'completed' ? '0 8px 32px rgba(59, 130, 246, 0.3)' : '0 8px 32px rgba(245, 158, 11, 0.3)';
                      }}
                    >
                      👤 {challenge.opponent}
                    </div>
                  </motion.div>
                ))}
              </div>
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
                background: 'rgba(99, 102, 241, 0.2)',
                boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
                color: 'white',
                textAlign: 'center',
                marginBottom: '16px',
                maxWidth: '512px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                Challenge a Friend
              </h2>
              <p style={{ marginBottom: '16px', opacity: 0.8 }}>
                Invite someone to a 1v1 battle!
              </p>
              <button
                style={{
                  padding: '16px 40px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'rgba(34, 197, 94, 0.5)',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(34, 197, 94, 0.7)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(34, 197, 94, 0.5)';
                }}
              >
                🔗 Create Challenge
              </button>
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

            {/* Modal */}
            {selectedChallenge && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setSelectedChallenge(null)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 50,
                }}
              >
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: 'rgba(17, 24, 39, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    padding: '32px',
                    maxWidth: '400px',
                    width: '90%',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>
                    Challenge with {selectedChallenge.opponent}
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>
                    Status: {selectedChallenge.status}
                  </p>
                  <button
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'rgba(168, 85, 247, 0.5)',
                      color: 'white',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginBottom: '12px',
                    }}
                  >
                    ⚡ Continue Challenge
                  </button>
                  <button
                    onClick={() => setSelectedChallenge(null)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'transparent',
                      color: 'white',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </motion.div>
              </motion.div>
            )}
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

export default ChallengeMode;
