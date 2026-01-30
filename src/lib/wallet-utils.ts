import { ethers } from 'ethers';

// Utility per validare indirizzi
export const isValidAddress = (address: string, chain: 'Solana' | 'Ethereum' | 'Cronos'): boolean => {
  if (chain === 'Solana') {
    return address.length === 44 && /^[A-Za-z0-9]+$/.test(address);
  } else if (chain === 'Ethereum' || chain === 'Cronos') {
    return ethers.isAddress(address);
  }
  return false;
};

// Utility per formattare indirizzo
export const formatAddress = (address: string, chars: number = 4): string => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

// Utility per convertire wei
export const weiToEth = (wei: string): string => {
  return ethers.formatEther(wei);
};

export const ethToWei = (eth: string): string => {
  return ethers.parseEther(eth).toString();
};

// Utility per generare hash transazione
export const generateTxHash = (): string => {
  return `0x${Math.random().toString(16).substr(2)}`;
};

// Utility per detectare wallet
export const detectWalletProvider = async (chain: 'Solana' | 'Ethereum' | 'Cronos') => {
  if (chain === 'Solana') {
    if (window.solana) {
      try {
        await window.solana.connect();
        return window.solana;
      } catch (err) {
        console.error('Solana wallet connection failed:', err);
        return null;
      }
    }
  } else if (chain === 'Ethereum' || chain === 'Cronos') {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        return window.ethereum;
      } catch (err) {
        console.error('Ethereum wallet connection failed:', err);
        return null;
      }
    }
  }
  return null;
};

// Utility per blockchain explorer
export const getExplorerUrl = (
  chain: 'Solana' | 'Ethereum' | 'Cronos',
  address: string,
  type: 'address' | 'tx' = 'address'
): string => {
  const explorers: Record<string, Record<string, string>> = {
    'Solana': {
      address: `https://solscan.io/account/${address}`,
      tx: `https://solscan.io/tx/${address}`,
    },
    'Ethereum': {
      address: `https://etherscan.io/address/${address}`,
      tx: `https://etherscan.io/tx/${address}`,
    },
    'Cronos': {
      address: `https://cronoscan.com/address/${address}`,
      tx: `https://cronoscan.com/tx/${address}`,
    },
  };
  return explorers[chain][type] || '';
};

// Utility per conversione token
export const getTokenSymbol = (chain: 'Solana' | 'Ethereum' | 'Cronos'): string => {
  const symbols: Record<string, string> = {
    'Solana': 'SOL',
    'Ethereum': 'ETH',
    'Cronos': 'CRO',
  };
  return symbols[chain];
};

// Mock: Simulare transazione
export const simulateTransaction = async (
  chain: string,
  to: string,
  amount: string
): Promise<{ success: boolean; txHash: string; timestamp: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        txHash: generateTxHash(),
        timestamp: Date.now(),
      });
    }, 1500);
  });
};

// Interface per window con provider
declare global {
  interface Window {
    solana?: {
      connect: () => Promise<{ publicKey: string }>;
      disconnect: () => Promise<void>;
      publicKey?: { toString: () => string };
    };
    ethereum?: any;
  }
}

export {};
