'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from './Footer';

const NeuroTrivia: React.FC = () => {
  const gameModes = [
    {
      id: 'tournament',
      name: 'Clubs',
      emoji: '🏆',
      description: 'Compete in tournaments with real prizes',
      details: '30 seconds per question | Earn SOL rewards',
      color: 'rgba(168, 85, 247, 0.3)',
      glowColor: 'rgba(168, 85, 247, 0.3)',
      href: '/clubs',
    },
    {
      id: 'challenge',
      name: 'Challenge',
      emoji: '⚡',
      description: '1v1 battles against other players',
      details: '15 seconds per question | Real-time competition',
      color: 'rgba(236, 72, 153, 0.3)',
      glowColor: 'rgba(236, 72, 153, 0.3)',
      href: '/challenge-mode',
    },
    {
      id: 'free-play',
      name: 'Free Play',
      emoji: '🎮',
      description: 'Practice and learn at your own pace',
      details: '10 seconds per question | No stakes',
      color: 'rgba(34, 197, 94, 0.3)',
      glowColor: 'rgba(34, 197, 94, 0.3)',
      href: '/free-play-mode',
    },
    {
      id: 'leaderboard',
      name: 'Leaderboard',
      emoji: '📊',
      description: 'See global rankings and top players',
      details: 'Real-time stats | Live rankings',
      color: 'rgba(59, 130, 246, 0.3)',
      glowColor: 'rgba(59, 130, 246, 0.3)',
      href: '/leaderboard',
    },
  ];

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .game-modes-container {
            max-width: 100% !important;
          }
          .game-modes-container > div {
            flex: 0 1 calc(50% - 8px) !important;
          }
        }
      `}</style>
      <div 
        className="min-h-screen w-full overflow-visible"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/assets/images/trivia.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Hero Section */}
        <section className="relative pt-16 pb-32 px-4 md:px-16 lg:px-24 min-h-screen flex items-center justify-center overflow-x-hidden">
          <div className="w-full max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4">
                <span style={{
                  background: 'linear-gradient(135deg, #fef08a 0%, #fbbf24 50%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Neuro Trivia</span>
              </h1>
              <p className="text-lg md:text-xl text-cyan-100 mb-2">
                Test your knowledge and earn real rewards
              </p>
              <p className="text-base md:text-lg text-emerald-300">
                Multiple game modes • Global competition • Web3 integration
              </p>
            </motion.div>

            {/* How to Play Section */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                marginBottom: '4rem',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h2 style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                color: 'white', 
                marginBottom: '32px',
                textAlign: 'center'
              }}>
                How to Play
              </h2>
              <style>{`
                @media (max-width: 768px) {
                  .how-to-item {
                    flex: calc(33.333% - 12px) !important;
                    max-width: calc(33.333% - 12px) !important;
                    height: 220px !important;
                  }
                }
                @media (min-width: 769px) {
                  .how-to-item {
                    flex: calc(16.666% - 12px) !important;
                    max-width: calc(16.666% - 12px) !important;
                    height: 220px !important;
                  }
                }
              `}</style>
              <div style={{ display: 'flex', gap: '81.72px', flexWrap: 'wrap', justifyContent: 'center', width: '100%', paddingLeft: '0', paddingRight: '0', marginLeft: '3.07%' }}>
                {[
                  { step: 1, icon: '🎯', title: 'Choose Your Mode', desc: 'Select Tournament, Challenge, or Free Play' },
                  { step: 2, icon: '💭', title: 'Answer Questions', desc: 'Read carefully and select within time limit' },
                  { step: 3, icon: '🎁', title: 'Earn Rewards', desc: 'Get SOL tokens for correct answers' },
                  { step: 4, icon: '📈', title: 'Leaderboard', desc: 'Track progress and compete worldwide' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1, duration: 0.8 }}
                  >
                    <div
                      className="how-to-item"
                      style={{
                        padding: '16px 24px',
                        borderRadius: '16px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(59, 130, 246, 0.2)',
                        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
                        color: 'white',
                        textAlign: 'center',
                        minWidth: '200px',
                        width: '200px',
                        flex: '0 0 200px',
                        maxWidth: '200px',
                        height: '220px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingTop: '40px',
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '80px',
                        alignItems: 'center',
                        marginBottom: '12px',
                      }}>
                        <div style={{
                          fontSize: '50px',
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          filter: 'drop-shadow(0 4px 12px rgba(255, 255, 255, 0.2))',
                          textShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
                          lineHeight: '1',
                        }}>
                          {item.icon}
                        </div>
                      </div>
                      <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>
                        {item.title}
                      </h4>
                      <p style={{ fontSize: '12px', opacity: 0.8 }}>
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Game Modes Flex */}
            <div className="game-modes-container" style={{ 
              display: 'flex', 
              gap: '16px', 
              marginBottom: '4rem', 
              marginTop: '7.09rem', 
              flexWrap: 'wrap', 
              justifyContent: 'center',
              maxWidth: '1000px',
              margin: '7.09rem auto 4rem auto'
            }}>
              {gameModes.map((mode, idx) => (
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15, duration: 0.8 }}
                  style={{
                    flex: '0 1 calc(25% - 12px)',
                    minWidth: '240px',
                  }}
                >
                  <Link href={mode.href} legacyBehavior>
                    <a
                      style={{
                        padding: '24px 64px',
                        borderRadius: '16px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: mode.color,
                        boxShadow: `0 8px 32px ${mode.glowColor}`,
                        color: 'white',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        minHeight: '60px',
                        fontSize: '18px',
                        fontWeight: '600',
                        textAlign: 'center',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${mode.glowColor}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${mode.glowColor}`;
                      }}
                    >
                      {mode.name}
                    </a>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Spacer */}
        <div className="w-full min-h-screen"></div>

        {/* Footer */}
        <div style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default NeuroTrivia;
