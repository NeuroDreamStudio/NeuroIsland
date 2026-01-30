import { useCallback, useState } from 'react';
import { SOLANA_CONFIG } from './solana-config';

interface WalletInfo {
  address: string;
  balance: number;
  connected: boolean;
}

export const useSolanaWallet = () => {
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Placeholder per Phantom wallet integration
      if (typeof window !== 'undefined' && (window as any).solana) {
        const response = await (window as any).solana.connect();
        
        setWallet({
          address: response.publicKey.toString(),
          balance: 0, // Da caricato dal RPC
          connected: true,
        });
      } else {
        setError('Solana wallet non trovato. Installa Phantom.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore di connessione');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    setWallet(null);
    setError(null);
  }, []);

  return {
    wallet,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    isConnected: wallet?.connected || false,
  };
};
