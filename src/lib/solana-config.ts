/**
 * Solana Wallet Configuration
 * Setup per Web3 e wallet integration con Solana
 */

export const SOLANA_CONFIG = {
  // Network
  NETWORK: process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet',
  RPC_URL: process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com',
  
  // Wallet configuration
  WALLET_CONFIG: {
    autoConnect: true,
    commitment: 'confirmed' as const,
  },
  
  // Token configuration
  NATIVE_MINT: 'So11111111111111111111111111111111111111112',
  
  // Program IDs (da aggiornare con i propri)
  PROGRAM_ID: process.env.NEXT_PUBLIC_PROGRAM_ID || '',
  
  // Reward configuration
  REWARD_TOKENS: {
    SOL: 'So11111111111111111111111111111111111111112',
    USDC: 'EPjFWaLb3hyccqJ1xNg5Bj8d9KZGQuNf73cEE2LDJQ8',
  },
  
  // Game rewards
  GAME_REWARDS: {
    EASY: 0.01,      // SOL
    MEDIUM: 0.05,    // SOL
    HARD: 0.1,       // SOL
  },
};

export type SolanaNetwork = 'mainnet-beta' | 'testnet' | 'devnet';
