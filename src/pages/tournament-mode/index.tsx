'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';

interface Tournament {
  id: string;
  name: string;
  entryFee: number;
  prizePool: number;
  participants: number;
  status: 'active' | 'upcoming';
  startTime: string;
}

const mockTournaments: Tournament[] = [
  { id: '1', name: 'Crypto Masters', entryFee: 0.5, prizePool: 100, participants: 42, status: 'active', startTime: 'Now - 2h left' },
  { id: '2', name: 'General Knowledge', entryFee: 0.1, prizePool: 50, participants: 128, status: 'active', startTime: 'Now - 4h left' },
  { id: '3', name: 'Science & Tech Showdown', entryFee: 1.0, prizePool: 500, participants: 18, status: 'upcoming', startTime: 'Starts in 2h' },
];

const TournamentMode = () => {
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);

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
                  background: 'linear-gradient(135deg, #fef08a 0%, #fbbf24 50%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Tournaments</span>
              </h1>
              <p className="text-lg md:text-xl text-cyan-100">Compete and earn real rewards</p>
            </motion.div>

            {/* Stats Grid */}
            <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px', width: '100%', marginBottom: '3rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Active', value: '2', emoji: '🎮' },
                { label: 'Players', value: '188', emoji: '👥' },
                { label: 'Prize Pool', value: '650 SOL', emoji: '💰' },
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
                      background: 'rgba(59, 130, 246, 0.2)',
                      boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
                      color: 'white',
                      textAlign: 'center',
                      minWidth: '120px',
                      flex: '1',
                    }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.emoji}</div>
                    <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>{stat.label}</p>
                    <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#fbbf24' }}>{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tournaments List */}
            <div className="mb-16 w-full">
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '20px', textAlign: 'center' }}>
                Available Tournaments
              </h2>
              <div style={{ display: 'flex', gap: '16px', marginTop: '2.5rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                {mockTournaments.map((tournament, idx) => (
                  <motion.div
                    key={tournament.id}
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
                        background: tournament.status === 'active' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(245, 158, 11, 0.3)',
                        boxShadow: tournament.status === 'active' ? '0 8px 32px rgba(34, 197, 94, 0.3)' : '0 8px 32px rgba(245, 158, 11, 0.3)',
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        textAlign: 'center',
                      }}
                      onClick={() => setSelectedTournament(tournament)}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                        (e.currentTarget as HTMLElement).style.boxShadow = tournament.status === 'active' ? '0 16px 48px rgba(34, 197, 94, 0.5)' : '0 16px 48px rgba(245, 158, 11, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                        (e.currentTarget as HTMLElement).style.boxShadow = tournament.status === 'active' ? '0 8px 32px rgba(34, 197, 94, 0.3)' : '0 8px 32px rgba(245, 158, 11, 0.3)';
                      }}
                    >
                      🏆 {tournament.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

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
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
                >
                  ← Back to Neuro Trivia
                </a>
              </Link>
            </motion.div>

            {/* Modal */}
            {selectedTournament && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setSelectedTournament(null)}
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
                    {selectedTournament.name}
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>
                    Entry fee: {selectedTournament.entryFee} SOL
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
                    💰 Connect Wallet & Join
                  </button>
                  <button
                    onClick={() => setSelectedTournament(null)}
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

export default TournamentMode;
