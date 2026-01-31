'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';

interface Tournament {
  id: string;
  name: string;
  participants: number;
  prizePool: string;
  status: 'active' | 'upcoming' | 'ended';
}

interface Club {
  id: string;
  name: string;
  logo: string;
  banner: string;
  description: string;
  members: number;
  tournaments: Tournament[];
  discord?: string;
  twitter?: string;
  telegram?: string;
  admin: string;
}

const mockClubs: Record<string, Club> = {
  '1': {
    id: '1',
    name: 'Crypto Trivia Masters',
    logo: '🏆',
    banner: 'rgba(168, 85, 247, 0.2)',
    description: 'The ultimate crypto knowledge hub for blockchain enthusiasts',
    members: 2450,
    admin: 'admin1',
    discord: 'https://discord.gg/crypto',
    twitter: 'https://twitter.com/cryptotrivia',
    telegram: 'https://t.me/cryptotrivia',
    tournaments: [
      { id: '1', name: 'Crypto Basics Tournament', participants: 156, prizePool: '500 SOL', status: 'active' },
      { id: '2', name: 'DeFi Challenge', participants: 89, prizePool: '750 SOL', status: 'upcoming' },
    ],
  },
  '2': {
    id: '2',
    name: 'Science Squad',
    logo: '🔬',
    banner: 'rgba(34, 197, 94, 0.2)',
    description: 'Explore science topics and compete with fellow scientists',
    members: 1820,
    admin: 'admin2',
    discord: 'https://discord.gg/science',
    tournaments: [
      { id: '3', name: 'Physics Challenge', participants: 120, prizePool: '400 SOL', status: 'active' },
    ],
  },
};

const ClubDetailPage: React.FC = () => {
  const router = useRouter();
  const { clubId } = router.query;
  const [isJoined, setIsJoined] = useState(false);

  if (!clubId || typeof clubId !== 'string') {
    return <div>Loading...</div>;
  }

  const club = mockClubs[clubId];

  if (!club) {
    return <div>Club not found</div>;
  }

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
            {/* Club Card */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                padding: '40px',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                background: club.banner,
                boxShadow: `0 8px 32px ${club.banner}`,
                color: 'white',
                marginBottom: '4rem',
              }}
            >
              {/* Logo and Header */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px', gap: '24px' }}>
                <div style={{ fontSize: '80px' }}>{club.logo}</div>
                <div style={{ flex: 1 }}>
                  <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '8px' }}>
                    {club.name}
                  </h1>
                  <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '16px' }}>
                    {club.description}
                  </p>
                  <p style={{ fontSize: '16px', opacity: 0.8 }}>
                    👥 {club.members} members
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
                {club.discord && (
                  <a
                    href={club.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'rgba(88, 101, 242, 0.4)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                      fontSize: '24px',
                      cursor: 'pointer',
                      transition: 'transform 0.3s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    💬
                  </a>
                )}
                {club.twitter && (
                  <a
                    href={club.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'rgba(29, 155, 240, 0.4)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                      fontSize: '24px',
                      cursor: 'pointer',
                      transition: 'transform 0.3s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    𝕏
                  </a>
                )}
                {club.telegram && (
                  <a
                    href={club.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'rgba(0, 136, 204, 0.4)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                      fontSize: '24px',
                      cursor: 'pointer',
                      transition: 'transform 0.3s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    ✈️
                  </a>
                )}
              </div>

              {/* Join Button */}
              <button
                onClick={() => setIsJoined(!isJoined)}
                style={{
                  padding: '16px 40px',
                  borderRadius: '12px',
                  border: 'none',
                  background: isJoined ? 'rgba(34, 197, 94, 0.5)' : 'rgba(168, 85, 247, 0.5)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = isJoined ? 'rgba(34, 197, 94, 0.7)' : 'rgba(168, 85, 247, 0.7)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = isJoined ? 'rgba(34, 197, 94, 0.5)' : 'rgba(168, 85, 247, 0.5)';
                }}
              >
                {isJoined ? '✅ Joined' : '🚀 Join Club'}
              </button>
            </motion.div>

            {/* Tournaments Section */}
            {club.tournaments.length > 0 && (
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                style={{ marginBottom: '4rem' }}
              >
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', marginBottom: '24px', textAlign: 'center' }}>
                  Tournaments
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {club.tournaments.map((tournament) => (
                    <div
                      key={tournament.id}
                      style={{
                        padding: '24px',
                        borderRadius: '16px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(59, 130, 246, 0.15)',
                        boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '16px',
                      }}
                    >
                      <div style={{ flex: 1, minWidth: '250px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                          {tournament.name}
                        </h3>
                        <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>
                          👥 {tournament.participants} participants
                        </p>
                        <p style={{ fontSize: '14px', opacity: 0.8 }}>
                          💰 Prize Pool: {tournament.prizePool}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            background: tournament.status === 'active' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(245, 158, 11, 0.4)',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'capitalize',
                          }}
                        >
                          {tournament.status}
                        </span>
                        {isJoined && (
                          <button
                            style={{
                              padding: '12px 24px',
                              borderRadius: '8px',
                              border: 'none',
                              background: 'rgba(168, 85, 247, 0.5)',
                              color: 'white',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.3s',
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.background = 'rgba(168, 85, 247, 0.7)';
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.background = 'rgba(168, 85, 247, 0.5)';
                            }}
                          >
                            Join Tournament
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ textAlign: 'center' }}
            >
              <Link href="/clubs" legacyBehavior>
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
                  ← Back to Clubs
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

export default ClubDetailPage;
