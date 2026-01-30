// Configurazione Solana
export const SOLANA_CONFIG = {
  network: 'https://api.mainnet-beta.solana.com',
  walletAdapter: 'phantom', // phantom, solflare, ledger
  rpcEndpoint: 'https://api.mainnet-beta.solana.com',
  commitment: 'processed' as const,
};

// Configurazione Ethereum
export const ETH_CONFIG = {
  chainId: 1,
  rpcUrl: 'https://eth.llamarpc.com',
  chainName: 'Ethereum Mainnet',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrl: 'https://etherscan.io',
};

// Configurazione Cronos
export const CRONOS_CONFIG = {
  chainId: 25,
  rpcUrl: 'https://evm.cronos.org',
  chainName: 'Cronos Chain',
  nativeCurrency: {
    name: 'Cronos',
    symbol: 'CRO',
    decimals: 18,
  },
  blockExplorerUrl: 'https://cronoscan.com',
};

// Configurazione NFT
export const NFT_CONFIG = {
  marketplace: 'magic-eden', // magic-eden, opensea
  solanaMarketplace: 'https://magiceden.io',
  ethMarketplace: 'https://opensea.io',
  cronosMarketplace: 'https://dapp.cronoscan.com',
};

// Configurazione Trivia
export const TRIVIA_CONFIG = {
  rewardPerCorrect: {
    facile: 0.01,
    medio: 0.02,
    difficile: 0.05,
  },
  questionTimeout: 30000, // 30 secondi
  categories: [
    { id: '1', name: 'Criptovalute', icon: '💰' },
    { id: '2', name: 'NFT', icon: '🎨' },
    { id: '3', name: 'Gaming', icon: '🎮' },
    { id: '4', name: 'Web3', icon: '🔗' },
  ],
};

// Configurazione Admin
export const ADMIN_CONFIG = {
  loginRoute: '/admin/login',
  dashboardRoute: '/admin/dashboard',
  sessionTimeout: 3600000, // 1 ora
};

// API Endpoints
export const API_ENDPOINTS = {
  SOLANA_RPC: process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.mainnet-beta.solana.com',
  ETH_RPC: process.env.NEXT_PUBLIC_ETH_RPC || 'https://eth.llamarpc.com',
  CRONOS_RPC: process.env.NEXT_PUBLIC_CRONOS_RPC || 'https://evm.cronos.org',
  API_BASE: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000/api',
};

// Colori Tema
export const THEME_COLORS = {
  neon: {
    pink: '#FF006E',
    cyan: '#00F5FF',
    yellow: '#FFFD00',
    purple: '#A000FF',
    orange: '#FF6600',
    lime: '#39FF14',
  },
  caribbean: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#FF006E',
  },
  gradient: {
    tropical: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    neon: 'linear-gradient(90deg, #FF006E, #00F5FF, #39FF14)',
    caribbean: 'linear-gradient(135deg, #00D4FF 0%, #00FFFF 25%, #39FF14 50%, #FFD700 75%, #FF6B6B 100%)',
  },
};
