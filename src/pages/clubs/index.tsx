'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';

interface Club {
  id: string;
  name: string;
  logo: string;
  description: string;
  members: number;
  tournaments: number;
  banner: string;
}

const ClubsPage: React.FC = () => {
  const [clubs] = useState<Club[]>([
    {
      id: '1',
      name: 'Crypto Trivia Masters',
      logo: '🏆',
      banner: 'rgba(168, 85, 247, 0.2)',
      description: 'The ultimate crypto knowledge hub',
      members: 2450,
      tournaments: 12,
    },
    {
      id: '2',
      name: 'Science Squad',
      logo: '🔬',
      banner: 'rgba(34, 197, 94, 0.2)',
      description: 'Explore science topics and compete',
      members: 1820,
      tournaments: 8,
    },
    {
      id: '3',
      name: 'History Buffs',
      logo: '📚',
      banner: 'rgba(245, 158, 11, 0.2)',
      description: 'Journey through historical events',
      members: 1560,
      tournaments: 6,
    },
    {
      id: '4',
      name: 'Tech Titans',
      logo: '💻',
      banner: 'rgba(59, 130, 246, 0.2)',
      description: 'Technology and innovation enthusiasts',
      members: 3100,
      tournaments: 15,
    },
    {
      id: '5',
      name: 'Sports Fanatics',
      logo: '⚽',
      banner: 'rgba(239, 68, 68, 0.2)',
      description: 'Sports knowledge at its finest',
      members: 2800,
      tournaments: 10,
    },
    {
      id: '6',
      name: 'Entertainment Elite',
      logo: '🎬',
      banner: 'rgba(236, 72, 153, 0.2)',
      description: 'Movies, music, and pop culture',
      members: 2200,
      tournaments: 9,
    },
  ]);

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
        {/* Dark overlay for better text readability */}
        <div className="fixed inset-0 -z-20 bg-black/30" />

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
                }}>Clubs</span>
              </h1>
              <p className="text-lg md:text-xl text-cyan-100 mb-2">
                Join exclusive communities and compete together
              </p>
              <p className="text-base md:text-lg text-emerald-300">
                Find your tribe • Compete in tournaments • Earn rewards
              </p>
            </motion.div>

            {/* Clubs Grid */}
            <motion.div
              style={{
                marginBottom: '4rem',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <style>{`
                @media (max-width: 768px) {
                  .club-item {
                    flex: 0 0 200px !important;
                    width: 200px !important;
                    max-width: 200px !important;
                  }
                }
                @media (min-width: 769px) {
                  .club-item {
                    flex: 0 0 200px !important;
                    width: 200px !important;
                    max-width: 200px !important;
                  }
                }
              `}</style>
              <div style={{ display: 'flex', gap: '81.72px', flexWrap: 'wrap', justifyContent: 'center', width: '100%', paddingLeft: '0', paddingRight: '0', marginLeft: '3.07%' }}>
                {clubs.map((club, idx) => (
                  <motion.div
                    key={club.id}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                  >
                    <Link href={`/clubs/${club.id}`} legacyBehavior>
                      <a
                        className="club-item"
                        style={{
                          padding: '16px 24px',
                          borderRadius: '16px',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          background: club.banner,
                          boxShadow: `0 8px 32px ${club.banner}`,
                          color: 'white',
                          cursor: 'pointer',
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          width: '200px',
                          height: '220px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          paddingTop: '40px',
                          flex: '0 0 200px',
                          maxWidth: '200px',
                          minWidth: '200px',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                          (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${club.banner}`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                          (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${club.banner}`;
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
                            {club.logo}
                          </div>
                        </div>
                        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '6px', textAlign: 'center' }}>
                          {club.name}
                        </h3>
                        <p style={{ fontSize: '11px', opacity: 0.8, textAlign: 'center', marginBottom: '8px' }}>
                          {club.members} members
                        </p>
                        <p style={{ fontSize: '10px', opacity: 0.7, textAlign: 'center' }}>
                          {club.tournaments} tournaments
                        </p>
                      </a>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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

export default ClubsPage;

