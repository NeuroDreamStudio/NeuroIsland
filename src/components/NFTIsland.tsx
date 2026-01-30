import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LayoutWrapper from './LayoutWrapper';
import Footer from './Footer';

interface NFTItem {
  id: number;
  name: string;
  image: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  price: number;
  chain: 'Solana' | 'Ethereum' | 'Cronos';
  description: string;
}

export const NFTIsland: React.FC = () => {
  const [selectedNFT, setSelectedNFT] = useState<NFTItem | null>(null);
  const [filter, setFilter] = useState<'all' | 'Solana' | 'Ethereum' | 'Cronos'>('all');

  const nfts: NFTItem[] = [
    {
      id: 1,
      name: 'Neuro Barrel #001',
      image: '🎨',
      rarity: 'Legendary',
      price: 100,
      chain: 'Solana',
      description: 'The first NFT from the exclusive Neuro in the Barrel 3D collection',
    },
    {
      id: 2,
      name: 'Tropical Vibes',
      image: '🌴',
      rarity: 'Epic',
      price: 50,
      chain: 'Ethereum',
      description: 'A 3D masterpiece that captures the Caribbean spirit',
    },
    {
      id: 3,
      name: 'Ocean Dream',
      image: '🌊',
      rarity: 'Rare',
      price: 25,
      chain: 'Cronos',
      description: 'Dive into the underwater world of NeuroIsland',
    },
    {
      id: 4,
      name: 'Sunset Paradise',
      image: '🌅',
      rarity: 'Rare',
      price: 30,
      chain: 'Solana',
      description: 'A breathtaking sunset rendered in perfect pixels',
    },
    {
      id: 5,
      name: 'Cyber Palms',
      image: '🌴',
      rarity: 'Epic',
      price: 45,
      chain: 'Ethereum',
      description: 'Futuristic palm trees with spectacular neon effects',
    },
    {
      id: 6,
      name: 'Golden Skull',
      image: '💀',
      rarity: 'Legendary',
      price: 150,
      chain: 'Solana',
      description: 'A legendary pirate treasure captured in an NFT',
    },
  ];

  const filteredNFTs = filter === 'all' ? nfts : nfts.filter(nft => nft.chain === filter);

  const getRarityColor = (rarity: string) => {
    const colors: { [key: string]: string } = {
      'Common': 'from-gray-400 to-gray-600',
      'Rare': 'from-blue-400 to-blue-600',
      'Epic': 'from-purple-400 to-purple-600',
      'Legendary': 'from-yellow-400 to-yellow-600',
    };
    return colors[rarity] || 'from-gray-400 to-gray-600';
  };

  const getChainIcon = (chain: string) => {
    const icons: { [key: string]: string } = {
      'Solana': '◎',
      'Ethereum': 'Ξ',
      'Cronos': '₪',
    };
    return icons[chain] || '○';
  };

  return (
    <>
      <LayoutWrapper>
        <div className="w-full overflow-hidden">

      {/* Main Content */}
      <section className="relative py-16 px-16 md:px-24 lg:px-32">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-yellow-400 to-cyan-400 bg-clip-text text-transparent">
              🎨 Neuro in the Barrel 3D Collection
            </h2>
            <p className="text-cyan-200 text-lg">
              Exclusive and limited NFTs from our digital artists
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'Solana', 'Ethereum', 'Cronos'].map((chain) => (
              <motion.button
                key={chain}
                whileHover={{ scale: 1.05 }}
                onClick={() => setFilter(chain as any)}
                className={`px-6 py-2 rounded-xl font-medium transition-all backdrop-blur-md border ${
                  filter === chain
                    ? 'border-pink-400/50 text-white'
                    : 'border-white/20 text-white/70 hover:text-white hover:border-white/40'
                }`}
                style={{ background: filter === chain ? 'rgba(236, 72, 153, 0.3)' : 'rgba(255, 255, 255, 0.05)' }}
              >
                {chain === 'all' ? '🌍 All' : chain}
              </motion.button>
            ))}
          </div>

          {/* NFT Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredNFTs.map((nft, idx) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedNFT(nft)}
                className="group cursor-pointer"
              >
                <div className="relative backdrop-blur-xl border border-white/20 p-6 rounded-2xl overflow-hidden transition-all duration-300 transform group-hover:scale-105 group-hover:border-white/40" style={{ background: 'rgba(255, 255, 255, 0.05)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}>
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform translate-x-full group-hover:translate-x-0 transition-all duration-500" />

                  {/* NFT Image Area */}
                  <div className="relative z-10 bg-black/30 rounded-xl p-12 mb-4 flex items-center justify-center">
                    <span className="text-8xl group-hover:scale-125 transition-transform duration-300">
                      {nft.image}
                    </span>
                  </div>

                  {/* NFT Info */}
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white">{nft.name}</h3>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/50 text-yellow-300">
                        {nft.rarity}
                      </span>
                    </div>

                    <p className="text-white/90 text-sm mb-4">{nft.description}</p>

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-white/20">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getChainIcon(nft.chain)}</span>
                        <span className="text-sm text-white/80">{nft.chain}</span>
                      </div>
                      <span className="text-lg font-bold text-white">{nft.price} SOL</span>
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br from-white/20 to-transparent group-hover:from-white/40 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 p-8 rounded-2xl backdrop-blur-sm bg-white/5 border border-cyan-500/30"
          >
            {[
              { label: 'Total NFTs', value: nfts.length, icon: '🎨' },
              { label: 'Owners', value: '1,234', icon: '👥' },
              { label: 'Trading Volume', value: '2.5M SOL', icon: '💰' },
              { label: 'Supported Chains', value: '3', icon: '🌐' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-cyan-300">{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* NFT Details Modal */}
      {selectedNFT && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 p-4"
          onClick={() => setSelectedNFT(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full bg-gradient-to-br from-purple-900 to-slate-900 rounded-2xl p-8 border border-pink-500/30"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center">
                <span className="text-9xl">{selectedNFT.image}</span>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4 text-white">{selectedNFT.name}</h2>
                <p className="text-gray-300 mb-6">{selectedNFT.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Rarity:</span>
                    <span className="text-yellow-400 font-bold">{selectedNFT.rarity}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Blockchain:</span>
                    <span className="text-cyan-400 font-bold">{selectedNFT.chain}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Price:</span>
                    <span className="text-pink-400 font-bold">{selectedNFT.price} SOL</span>
                  </div>
                </div>

                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-bold hover:shadow-lg hover:shadow-pink-500/50 transition mb-4">
                  🛒 Buy Now
                </button>

                <button
                  onClick={() => setSelectedNFT(null)}
                  className="w-full py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition"
                >
                  ✕ Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      </div>
    </LayoutWrapper>
    <Footer />
    </>
  );
};

export default NFTIsland;
