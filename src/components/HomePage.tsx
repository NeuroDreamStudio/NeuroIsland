import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Footer from './Footer';

const HomePage: React.FC = () => {

  return (
    <>
      <div 
        className="min-h-screen w-full overflow-visible"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), url(/assets/images/base.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
        }}
      >

        {/* Hero Section with Left Title & Right Content */}
        <section className="relative pt-16 pb-32 px-16 md:px-24 lg:px-32 min-h-[calc(100vh-80px)] flex items-center justify-center overflow-x-hidden">
          <div className="w-full overflow-visible">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto pl-12">
              
              {/* LEFT SIDE - Title and Subtitle */}
              <motion.div
                className="flex flex-col justify-center ml-[3%]"
                style={{ marginTop: '-20%' }}
                initial={{ opacity: 1, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h2 
                  className="text-[76px] md:text-[100px] lg:text-[134px] font-black mb-6 leading-tight mt-[30%]"
                  initial={{ opacity: 1, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <span className="text-white text-[61px] md:text-[80px] lg:text-[107px]">Welcome to</span>
                  <br />
                  <span 
                    className="font-black drop-shadow-xl"
                    style={{
                      background: 'linear-gradient(135deg, #fef08a 0%, #fbbf24 50%, #fb923c 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Paradise!
                  </span>
                </motion.h2>

                <motion.p 
                  className="text-lg md:text-xl text-cyan-100 mb-8 max-w-md font-light leading-relaxed"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Dive into tropical vibes, epic games, and endless rewards.
                </motion.p>

                {/* Call-to-action or decorative element */}
                <motion.div
                  className="flex items-center space-x-3 text-emerald-300"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-sm md:text-base">Play • Win • Earn • Collect</span>
                </motion.div>

                {/* Trivia Quest & NFT Hub & Earn Rewards Buttons */}
                <div style={{ display: 'flex', gap: '16px', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                  {/* Trivia Quest Button */}
                  <a 
                    href="/neuro-trivia"
                    style={{
                      display: 'inline-block',
                      width: 'fit-content',
                      padding: '24px 64px',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(168, 85, 247, 0.3)',
                      boxShadow: '0 8px 32px rgba(168, 85, 247, 0.3)',
                      color: 'white',
                      fontSize: '20px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      transition: 'transform 0.3s',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    Trivia Quest
                  </a>

                  {/* NFT Hub Button */}
                  <a 
                    href="/nft-island"
                    style={{
                      display: 'inline-block',
                      width: 'fit-content',
                      padding: '24px 64px',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(239, 68, 68, 0.3)',
                      boxShadow: '0 8px 32px rgba(239, 68, 68, 0.3)',
                      color: 'white',
                      fontSize: '20px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      transition: 'transform 0.3s',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    NFT Hub
                  </a>

                  {/* Earn Rewards Button */}
                  <a 
                    href="/rewards"
                    style={{
                      display: 'inline-block',
                      width: 'fit-content',
                      padding: '24px 64px',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(34, 197, 94, 0.3)',
                      boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3)',
                      color: 'white',
                      fontSize: '20px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      transition: 'transform 0.3s',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    Earn Rewards
                  </a>
                </div>
              </motion.div>

              {/* RIGHT SIDE - Feature Cards */}
              <div className="flex flex-row gap-[20%] items-center justify-center mt-[35%]">
              </div>
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

export default HomePage;
