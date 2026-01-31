'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface JoinRequest {
  id: string;
  userId: string;
  userName: string;
  clubId: string;
  clubName: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface ClubMember {
  id: string;
  name: string;
  joinedAt: string;
  tournaments: number;
}

interface ClubAdmin {
  id: string;
  name: string;
  logo: string;
  members: ClubMember[];
  joinRequests: JoinRequest[];
}

const mockClubData: ClubAdmin = {
  id: '1',
  name: 'Crypto Trivia Masters',
  logo: '🏆',
  members: [
    { id: '1', name: 'User1', joinedAt: '2024-01-15', tournaments: 5 },
    { id: '2', name: 'User2', joinedAt: '2024-02-20', tournaments: 3 },
    { id: '3', name: 'User3', joinedAt: '2024-03-10', tournaments: 7 },
  ],
  joinRequests: [
    { id: '1', userId: '4', userName: 'NewUser1', clubId: '1', clubName: 'Crypto Trivia Masters', status: 'pending' },
    { id: '2', userId: '5', userName: 'NewUser2', clubId: '1', clubName: 'Crypto Trivia Masters', status: 'pending' },
  ],
};

const ClubAdminDashboard: React.FC = () => {
  const [clubData, setClubData] = useState<ClubAdmin>(mockClubData);
  const [activeTab, setActiveTab] = useState<'requests' | 'members' | 'tournaments'>('requests');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

  const handleApproveRequest = (requestId: string) => {
    const request = clubData.joinRequests.find(r => r.id === requestId);
    if (request) {
      setClubData({
        ...clubData,
        joinRequests: clubData.joinRequests.map(r =>
          r.id === requestId ? { ...r, status: 'approved' } : r
        ),
        members: [...clubData.members, {
          id: request.userId,
          name: request.userName,
          joinedAt: new Date().toISOString().split('T')[0],
          tournaments: 0,
        }],
      });
    }
  };

  const handleRejectRequest = (requestId: string) => {
    setClubData({
      ...clubData,
      joinRequests: clubData.joinRequests.map(r =>
        r.id === requestId ? { ...r, status: 'rejected' } : r
      ),
    });
  };

  const handleDeleteMember = (memberId: string) => {
    setClubData({
      ...clubData,
      members: clubData.members.filter(m => m.id !== memberId),
    });
    setMemberToDelete(null);
    setShowDeleteConfirm(false);
  };

  const handleDeleteClub = () => {
    alert('Club deleted!');
    // In real app, would navigate to clubs page
  };

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

        <section className="relative pt-16 pb-32 px-4 md:px-16 lg:px-24 min-h-screen">
          <div className="w-full max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ marginBottom: '40px', textAlign: 'center' }}
            >
              <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
                {clubData.logo} Admin Dashboard
              </h1>
              <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.8)' }}>
                {clubData.name}
              </p>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '32px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                flexWrap: 'wrap',
              }}
            >
              {(['requests', 'members', 'tournaments'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '12px 12px 0 0',
                    border: 'none',
                    background: activeTab === tab ? 'rgba(168, 85, 247, 0.3)' : 'transparent',
                    color: activeTab === tab ? 'white' : 'rgba(255,255,255,0.6)',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    borderBottom: activeTab === tab ? '2px solid rgba(168, 85, 247, 1)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab) {
                      (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                    }
                  }}
                >
                  {tab === 'requests' && `📬 Join Requests (${clubData.joinRequests.filter(r => r.status === 'pending').length})`}
                  {tab === 'members' && `👥 Members (${clubData.members.length})`}
                  {tab === 'tournaments' && '🏆 Tournaments'}
                </button>
              ))}
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Join Requests Tab */}
              {activeTab === 'requests' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {clubData.joinRequests.filter(r => r.status === 'pending').length === 0 ? (
                    <div
                      style={{
                        padding: '32px',
                        borderRadius: '16px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(107, 114, 128, 0.15)',
                        color: 'rgba(255,255,255,0.8)',
                        textAlign: 'center',
                      }}
                    >
                      No pending requests
                    </div>
                  ) : (
                    clubData.joinRequests.map((request) => (
                      <div
                        key={request.id}
                        style={{
                          padding: '24px',
                          borderRadius: '16px',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          background: request.status === 'pending' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(107, 114, 128, 0.15)',
                          color: 'white',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '16px',
                        }}
                      >
                        <div>
                          <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>
                            {request.userName}
                          </p>
                          <p style={{ fontSize: '14px', opacity: 0.8 }}>
                            Requested to join {request.clubName}
                          </p>
                        </div>
                        {request.status === 'pending' && (
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                              onClick={() => handleApproveRequest(request.id)}
                              style={{
                                padding: '12px 24px',
                                borderRadius: '8px',
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
                              ✅ Approve
                            </button>
                            <button
                              onClick={() => handleRejectRequest(request.id)}
                              style={{
                                padding: '12px 24px',
                                borderRadius: '8px',
                                border: 'none',
                                background: 'rgba(239, 68, 68, 0.5)',
                                color: 'white',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                              }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(239, 68, 68, 0.7)';
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(239, 68, 68, 0.5)';
                              }}
                            >
                              ❌ Reject
                            </button>
                          </div>
                        )}
                        {request.status === 'approved' && (
                          <span style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.4)', fontSize: '12px' }}>
                            ✅ Approved
                          </span>
                        )}
                        {request.status === 'rejected' && (
                          <span style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.4)', fontSize: '12px' }}>
                            ❌ Rejected
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Members Tab */}
              {activeTab === 'members' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {clubData.members.map((member) => (
                    <div
                      key={member.id}
                      style={{
                        padding: '24px',
                        borderRadius: '16px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(59, 130, 246, 0.15)',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '16px',
                      }}
                    >
                      <div>
                        <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>
                          {member.name}
                        </p>
                        <p style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>
                          Joined: {member.joinedAt}
                        </p>
                        <p style={{ fontSize: '14px', opacity: 0.8 }}>
                          Tournaments: {member.tournaments}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setMemberToDelete(member.id);
                          setShowDeleteConfirm(true);
                        }}
                        style={{
                          padding: '12px 24px',
                          borderRadius: '8px',
                          border: 'none',
                          background: 'rgba(239, 68, 68, 0.5)',
                          color: 'white',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = 'rgba(239, 68, 68, 0.7)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = 'rgba(239, 68, 68, 0.5)';
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Tournaments Tab */}
              {activeTab === 'tournaments' && (
                <div
                  style={{
                    padding: '32px',
                    borderRadius: '16px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(107, 114, 128, 0.15)',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ marginBottom: '24px' }}>🏆 Tournament management coming soon</p>
                  <button
                    style={{
                      padding: '16px 40px',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'rgba(168, 85, 247, 0.5)',
                      color: 'white',
                      fontSize: '16px',
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
                    ➕ Create Tournament
                  </button>
                </div>
              )}
            </motion.div>

            {/* Delete Club Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                marginTop: '48px',
                padding: '32px',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                background: 'rgba(239, 68, 68, 0.1)',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'rgba(239, 68, 68, 1)', marginBottom: '16px' }}>
                ⚠️ Danger Zone
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>
                Delete this club permanently. This action cannot be undone.
              </p>
              <button
                onClick={handleDeleteClub}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'rgba(239, 68, 68, 0.6)',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(239, 68, 68, 0.8)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(239, 68, 68, 0.6)';
                }}
              >
                🗑️ Delete Club
              </button>
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{ textAlign: 'center', marginTop: '48px' }}
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

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && memberToDelete && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                padding: '32px',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                maxWidth: '400px',
                width: '90%',
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                Remove Member?
              </h3>
              <p style={{ marginBottom: '24px', opacity: 0.8 }}>
                Are you sure you want to remove this member? This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(107, 114, 128, 0.5)',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteMember(memberToDelete)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(239, 68, 68, 0.5)',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              </div>
            </motion.div>
          </div>
        )}

        <div className="w-full min-h-screen"></div>
        <div style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ClubAdminDashboard;
