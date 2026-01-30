import React, { createContext, useContext, useRef, useCallback, useState } from 'react';

interface AudioContextType {
  playSound: (soundName: 'select' | 'correct' | 'wrong' | 'win' | 'lose') => void;
  isMuted: boolean;
  toggleMute: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const soundUrls: Record<string, string> = {
    select: '/sounds/select.mp3',
    correct: '/sounds/correct.mp3',
    wrong: '/sounds/wrong.mp3',
    win: '/sounds/win.mp3',
    lose: '/sounds/lose.mp3',
  };

  const playSound = useCallback((soundName: 'select' | 'correct' | 'wrong' | 'win' | 'lose') => {
    if (isMuted) return;
    
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    audioRef.current.src = soundUrls[soundName];
    audioRef.current.volume = volume;
    audioRef.current.play().catch(() => {
      // Silently fail if audio can't be played
    });
  }, [isMuted, volume, soundUrls]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const handleSetVolume = useCallback((newVolume: number) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  }, []);

  return (
    <AudioContext.Provider value={{ playSound, isMuted, toggleMute, volume, setVolume: handleSetVolume }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};
