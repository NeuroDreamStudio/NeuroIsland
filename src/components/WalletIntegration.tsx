import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface WalletConnection {
  chain: 'Solana' | 'Ethereum' | 'Cronos';
  icon: string;
  address: string | null;
  balance: string;
  status: 'connected' | 'disconnected';
  network: string;
}

export const WalletIntegration: React.FC = () => {
  const [wallets, setWallets] = useState<WalletConnection[]>([
    {
      chain: 'Solana',
      icon: '◎',
      address: null,
      balance: '0',
      status: 'disconnected',
      network: 'Mainnet',
    },
    {
      chain: 'Ethereum',
      icon: 'Ξ',
      address: null,
      balance: '0',
      status: 'disconnected',
      network: 'Mainnet',
    },
    {
      chain: 'Cronos',
      icon: '₪',
      address: null,
      balance: '0',
      status: 'disconnected',
      network: 'Mainnet',
    },
  ]);

  const [selectedWallet, setSelectedWallet] = useState<number | null>(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionData, setTransactionData] = useState({
    recipient: '',
    amount: '',
    chain: '',
  });

  // Simulate wallet connection
  const handleConnectWallet = (index: number) => {
    const updatedWallets = [...wallets];
    if (updatedWallets[index].status === 'disconnected') {
      updatedWallets[index].status = 'connected';
      updatedWallets[index].address = `0x${Math.random().toString(16).substr(2, 40).toUpperCase()}`;
      updatedWallets[index].balance = (Math.random() * 100).toFixed(2);
    } else {
      updatedWallets[index].status = 'disconnected';
      updatedWallets[index].address = null;
      updatedWallets[index].balance = '0';
    }
    setWallets(updatedWallets);
  };

  // Handle transaction
  const handleTransaction = () => {
    if (transactionData.recipient && transactionData.amount) {
      alert(
        `✅ Transaction started!\nSending: ${transactionData.amount} ${transactionData.chain}\nDestination: ${transactionData.recipient}`
      );
      setShowTransactionModal(false);
      setTransactionData({ recipient: '', amount: '', chain: '' });
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" />
      </div>

      {/* Header */}
      <header className="relative z-50 backdrop-blur-md bg-black/30 border-b border-yellow-500/30 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" legacyBehavior>
            <a>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent cursor-pointer hover:opacity-80">
                💎 Wallet Hub
              </h1>
            </a>
          </Link>
          <Link href="/" legacyBehavior>
            <a className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-lg hover:shadow-yellow-500/50 transition cursor-pointer text-white font-semibold">
              ← Back Home
            </a>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              🔗 Connect Your Wallets
            </h2>
            <p className="text-yellow-200 text-lg">
              We support Solana, Ethereum and Cronos Chain
            </p>
          </motion.div>

          {/* Wallet Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {wallets.map((wallet, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedWallet(index)}
                className={`group cursor-pointer relative`}
              >
                <div className={`relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl overflow-hidden transition-all ${
                  selectedWallet === index ? 'ring-2 ring-yellow-400' : ''
                } hover:ring-2 hover:ring-yellow-400/50`}>
                  {/* Chain Icon */}
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {wallet.icon}
                  </div>

                  {/* Chain Name */}
                  <h3 className="text-2xl font-bold text-white mb-2">{wallet.chain}</h3>
                  <p className="text-gray-400 text-sm mb-6">{wallet.network}</p>

                  {/* Status Indicator */}
                  <div className={`flex items-center space-x-2 mb-6 px-3 py-2 rounded-full w-fit ${
                    wallet.status === 'connected'
                      ? 'bg-green-500/20 border border-green-500/50'
                      : 'bg-red-500/20 border border-red-500/50'
                  }`}>
                    <span className={`w-3 h-3 rounded-full ${
                      wallet.status === 'connected' ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                    }`} />
                    <span className={wallet.status === 'connected' ? 'text-green-300' : 'text-red-300'}>
                      {wallet.status === 'connected' ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>

                  {/* Address */}
                  {wallet.address && (
                    <div className="mb-6 p-4 rounded-lg bg-black/40 border border-yellow-500/20">
                      <p className="text-gray-400 text-xs mb-1">Address</p>
                      <p className="text-yellow-300 font-mono text-xs break-all">{wallet.address}</p>
                    </div>
                  )}

                  {/* Balance */}
                  {wallet.status === 'connected' && (
                    <div className="mb-6 p-4 rounded-lg bg-black/40 border border-green-500/20">
                      <p className="text-gray-400 text-xs mb-1">Balance</p>
                      <p className="text-green-300 font-bold text-lg">{wallet.balance} {wallet.chain === 'Solana' ? 'SOL' : wallet.chain === 'Ethereum' ? 'ETH' : 'CRO'}</p>
                    </div>
                  )}

                  {/* Connect Button */}
                  <button
                    onClick={() => handleConnectWallet(index)}
                    className={`w-full py-3 rounded-lg font-bold transition-all ${
                      wallet.status === 'connected'
                        ? 'bg-red-500/30 border border-red-500/50 text-red-300 hover:bg-red-500/50'
                        : 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:shadow-lg hover:shadow-yellow-500/50'
                    }`}
                  >
                    {wallet.status === 'connected' ? '🔌 Disconnect' : '🔗 Connect'}
                  </button>

                  {/* Transaction Button */}
                  {wallet.status === 'connected' && (
                    <button
                      onClick={() => {
                        setTransactionData({ ...transactionData, chain: wallet.chain });
                        setShowTransactionModal(true);
                      }}
                      className="w-full mt-3 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold hover:shadow-lg transition"
                    >
                      💸 Send
                    </button>
                  )}
                </div>

                {/* Glow Background */}
                <div className={`absolute inset-0 rounded-2xl -z-10 blur-xl transition-all ${
                  selectedWallet === index
                    ? 'opacity-60 bg-gradient-to-br from-yellow-500 to-orange-500'
                    : 'opacity-20 bg-gradient-to-br from-yellow-500 to-orange-500'
                }`} />
              </motion.div>
            ))}
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: '🔐',
                title: 'Sicuro',
                desc: 'Le tue chiavi rimangono sul tuo dispositivo',
              },
              {
                icon: '⚡',
                title: 'Veloce',
                desc: 'Transazioni istantanee sulla blockchain',
              },
              {
                icon: '🌐',
                title: 'Multi-Chain',
                desc: 'Scambia tra diverse blockchain',
              },
            ].map((feature, idx) => (
              <div key={idx} className="p-6 rounded-xl backdrop-blur-sm bg-white/5 border border-yellow-500/30 text-center">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h4 className="text-lg font-bold text-yellow-300 mb-2">{feature.title}</h4>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Network Info */}
          <div className="p-8 rounded-xl backdrop-blur-sm bg-white/5 border border-yellow-500/30">
            <h3 className="text-2xl font-bold text-yellow-300 mb-6">🌐 Reti Supportate</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Solana',
                  desc: 'Blockchain ad alta velocità e basso costo',
                  token: 'SOL',
                  speed: 'Istantaneo',
                },
                {
                  name: 'Ethereum',
                  desc: 'La rete smart contract più popolare',
                  token: 'ETH',
                  speed: '~15 minuti',
                },
                {
                  name: 'Cronos',
                  desc: 'EVM-compatible con basse commissioni',
                  token: 'CRO',
                  speed: '~10 secondi',
                },
              ].map((network, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-black/20 border border-yellow-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">{network.name}</h4>
                  <p className="text-gray-400 text-sm mb-3">{network.desc}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-300">Token: {network.token}</span>
                    <span className="text-cyan-300">⏱️ {network.speed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transaction Modal */}
      {showTransactionModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 p-4"
          onClick={() => setShowTransactionModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 border border-yellow-500/30"
          >
            <h2 className="text-2xl font-bold text-white mb-6">💸 Invia {transactionData.chain}</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-yellow-300 mb-2">
                  Indirizzo Destinatario
                </label>
                <input
                  type="text"
                  value={transactionData.recipient}
                  onChange={(e) =>
                    setTransactionData({ ...transactionData, recipient: e.target.value })
                  }
                  placeholder="0x..."
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-yellow-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-yellow-300 mb-2">
                  Importo ({transactionData.chain})
                </label>
                <input
                  type="number"
                  value={transactionData.amount}
                  onChange={(e) =>
                    setTransactionData({ ...transactionData, amount: e.target.value })
                  }
                  placeholder="0.00"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-yellow-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <button
                onClick={handleTransaction}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold hover:shadow-lg hover:shadow-yellow-500/50 transition"
              >
                ✓ Conferma Transazione
              </button>

              <button
                onClick={() => setShowTransactionModal(false)}
                className="w-full py-3 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20 transition"
              >
                ✕ Annulla
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="relative border-t border-yellow-500/20 backdrop-blur-sm bg-black/40 mt-20">
    <div className="max-w-7xl mx-auto px-4 py-12 text-center">
      <p className="text-gray-400 mb-4">
        © 2026 NeuroIsland Wallet Integration. Non siamo una banca, solo un hub Web3. 💎
      </p>
      <div className="flex justify-center space-x-6">
        <a href="#" className="text-yellow-400 hover:text-orange-400 transition">Sicurezza</a>
        <a href="#" className="text-yellow-400 hover:text-orange-400 transition">Privacy</a>
        <a href="#" className="text-yellow-400 hover:text-orange-400 transition">Supporto</a>
      </div>
    </div>
  </footer>
);

export default WalletIntegration;
