import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LayoutWrapper from './LayoutWrapper';
import Footer from './Footer';

interface Question {
  id: number;
  category: string;
  question: string;
  answers: string[];
  correctAnswer: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  reward: number;
}

interface GameState {
  currentQuestion: number;
  score: number;
  answered: boolean;
  selectedAnswer: number | null;
  gameActive: boolean;
  totalEarnings: number;
}

export const NeuroTrivia: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    score: 0,
    answered: false,
    selectedAnswer: null,
    gameActive: true,
    totalEarnings: 0,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCategorySelect, setShowCategorySelect] = useState(true);

  // Sample questions
  const allQuestions: Question[] = [
    {
      id: 1,
      category: 'Crypto',
      question: 'Which blockchain was launched first?',
      answers: ['Bitcoin', 'Ethereum', 'Solana', 'Cardano'],
      correctAnswer: 0,
      difficulty: 'Easy',
      reward: 0.01,
    },
    {
      id: 2,
      category: 'Crypto',
      question: 'Who created Ethereum?',
      answers: ['Satoshi Nakamoto', 'Vitalik Buterin', 'Charlie Lee', 'Craig Wright'],
      correctAnswer: 1,
      difficulty: 'Easy',
      reward: 0.01,
    },
    {
      id: 3,
      category: 'NFT',
      question: 'What does NFT mean?',
      answers: ['Non-Fungible Token', 'New Financial Token', 'Network File Transfer', 'None of the above'],
      correctAnswer: 0,
      difficulty: 'Easy',
      reward: 0.005,
    },
    {
      id: 4,
      category: 'NFT',
      question: 'Which is the most popular blockchain for NFTs?',
      answers: ['Bitcoin', 'Ethereum', 'Dogecoin', 'Ripple'],
      correctAnswer: 1,
      difficulty: 'Medium',
      reward: 0.02,
    },
    {
      id: 5,
      category: 'Gaming',
      question: 'Which game is famous for its voxels?',
      answers: ['Fortnite', 'Minecraft', 'The Sims', 'Roblox'],
      correctAnswer: 1,
      difficulty: 'Easy',
      reward: 0.01,
    },
    {
      id: 6,
      category: 'Gaming',
      question: 'How many main dimensions does Minecraft have?',
      answers: ['1', '2', '3', '4'],
      correctAnswer: 2,
      difficulty: 'Medium',
      reward: 0.02,
    },
    {
      id: 7,
      category: 'Web3',
      question: 'What is a wallet in blockchain?',
      answers: ['A real wallet', 'A digital address for crypto', 'An online bank', 'An exchange'],
      correctAnswer: 1,
      difficulty: 'Easy',
      reward: 0.01,
    },
    {
      id: 8,
      category: 'Web3',
      question: 'What does HODL mean in crypto?',
      answers: ['Hold On for Dear Life', 'High Order Database Link', 'Huge Online Digital Lab', 'None'],
      correctAnswer: 0,
      difficulty: 'Hard',
      reward: 0.05,
    },
  ];

  const categories = ['All', 'Crypto', 'NFT', 'Gaming', 'Web3'];

  const questions = selectedCategory === 'All'
    ? allQuestions
    : allQuestions.filter(q => q.category === selectedCategory);

  const currentQuestion = questions[gameState.currentQuestion];

  const handleStartGame = (category: string) => {
    setSelectedCategory(category);
    setShowCategorySelect(false);
    setGameState({
      currentQuestion: 0,
      score: 0,
      answered: false,
      selectedAnswer: null,
      gameActive: true,
      totalEarnings: 0,
    });
  };

  const handleAnswer = (answerIndex: number) => {
    if (gameState.answered) return;

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const earnings = isCorrect ? currentQuestion.reward : 0;

    setGameState({
      ...gameState,
      answered: true,
      selectedAnswer: answerIndex,
      score: isCorrect ? gameState.score + 1 : gameState.score,
      totalEarnings: gameState.totalEarnings + earnings,
    });
  };

  const handleNextQuestion = () => {
    if (gameState.currentQuestion < questions.length - 1) {
      setGameState({
        ...gameState,
        currentQuestion: gameState.currentQuestion + 1,
        answered: false,
        selectedAnswer: null,
      });
    } else {
      setGameState({
        ...gameState,
        gameActive: false,
      });
    }
  };

  const handlePlayAgain = () => {
    setShowCategorySelect(true);
    setGameState({
      currentQuestion: 0,
      score: 0,
      answered: false,
      selectedAnswer: null,
      gameActive: true,
      totalEarnings: 0,
    });
  };

  // Rendering Schermata Selezione Categoria
  if (showCategorySelect) {
    return (
      <div className="min-h-screen w-full overflow-hidden" style={{
        backgroundImage: 'url(/assets/images/trivia.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}>
        {/* Dark overlay for better text readability */}
        <div className="fixed inset-0 -z-20 bg-black/30" />

        {/* Content */}
        <section className="relative py-20 px-16 md:px-24 lg:px-32" style={{ marginTop: '30vh' }}>
          <div className="max-w-6xl mx-auto">
            {/* Category Selection */}
            <div>
              <h3 className="text-2xl font-bold text-center mb-8 text-cyan-300">
                Choose a Category
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {categories.map((category, idx) => (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleStartGame(category)}
                    className="group relative p-8 rounded-2xl overflow-hidden transition-all backdrop-blur-xl border border-white/20"
                    style={{ background: 'rgba(6, 182, 212, 0.15)', boxShadow: '0 8px 32px rgba(6, 182, 212, 0.1)' }}
                  >
                    <div className="relative z-10 text-center">
                      <div className="text-4xl mb-2">
                        {category === 'All' && '🌍'}
                        {category === 'Crypto' && '💰'}
                        {category === 'NFT' && '🎨'}
                        {category === 'Gaming' && '🎮'}
                        {category === 'Web3' && '🔗'}
                      </div>
                      <h4 className="text-lg font-semibold text-white">{category}</h4>
                      <p className="text-white/60 text-sm mt-2">
                        {allQuestions.filter(q => category === 'All' || q.category === category).length} questions
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    );
  }

  // Rendering Schermata Fine Gioco
  if (!gameState.gameActive) {
    return (
      <div className="min-h-screen w-full overflow-hidden">
        {/* Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
        </div>

        {/* Results */}
        <section className="relative py-20 px-16 md:px-24 lg:px-32 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full text-center"
          >
            <div className="text-8xl mb-6">🎉</div>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Gioco Completato!
            </h2>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="p-8 rounded-2xl backdrop-blur-xl border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.05)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}>
                <p className="text-gray-400 mb-2">Correct Answers</p>
                <p className="text-4xl font-bold text-cyan-400">
                  {gameState.score} / {questions.length}
                </p>
              </div>
              <div className="p-8 rounded-2xl backdrop-blur-xl border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.05)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}>
                <p className="text-gray-400 mb-2">Earnings</p>
                <p className="text-4xl font-bold text-green-400">
                  {gameState.totalEarnings.toFixed(3)} SOL
                </p>
              </div>
            </div>

            {/* Percentage */}
            <div className="text-2xl text-gray-300 mb-12">
              Percentuale: {Math.round((gameState.score / questions.length) * 100)}%
            </div>

            {/* Buttons */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handlePlayAgain}
              className="w-full py-4 rounded-2xl backdrop-blur-md border border-cyan-400/30 text-white font-semibold text-lg hover:border-cyan-400/60 transition mb-4"
              style={{ background: 'rgba(6, 182, 212, 0.3)', boxShadow: '0 8px 32px rgba(6, 182, 212, 0.2)' }}
            >
              🔄 Play Again
            </motion.button>
            <Link href="/">
              <button className="w-full py-4 rounded-2xl backdrop-blur-md border border-white/20 text-white font-semibold text-lg hover:bg-white/10 transition" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                🏠 Back Home
              </button>
            </Link>
          </motion.div>
        </section>

      </div>
    );
  }

  // Rendering Schermata Domanda
  return (
    <>
      <LayoutWrapper showFooter={false}>
        <div className="w-full overflow-hidden">
      {/* Question Section */}
      <section className="relative py-12 px-16 md:px-24 lg:px-32 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <motion.div
          key={gameState.currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-2xl w-full"
        >
          {/* Difficulty Badge */}
          <div className="text-center mb-8">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
              currentQuestion.difficulty === 'Facile' ? 'bg-green-500/30 text-green-300' :
              currentQuestion.difficulty === 'Medio' ? 'bg-yellow-500/30 text-yellow-300' :
              'bg-red-500/30 text-red-300'
            }`}>
              {currentQuestion.difficulty}
            </span>
          </div>

          {/* Question */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            {currentQuestion.question}
          </h2>

          {/* Answers Grid */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            {currentQuestion.answers.map((answer, idx) => {
              const isSelected = gameState.selectedAnswer === idx;
              const isCorrect = idx === currentQuestion.correctAnswer;
              const showCorrect = gameState.answered && isCorrect;
              const showWrong = gameState.answered && isSelected && !isCorrect;

              return (
                <motion.button
                  key={idx}
                  whileHover={!gameState.answered ? { scale: 1.02 } : {}}
                  whileTap={!gameState.answered ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswer(idx)}
                  disabled={gameState.answered}
                  className={`relative p-6 rounded-2xl text-center font-medium transition-all text-lg backdrop-blur-md ${
                    !gameState.answered
                      ? 'border border-white/20 hover:border-white/40 text-white cursor-pointer'
                      : showCorrect
                      ? 'border border-green-400/50 text-white'
                      : showWrong
                      ? 'border border-red-400/50 text-white'
                      : 'border border-gray-400/20 text-gray-400 cursor-not-allowed'
                  }`}
                  style={{
                    background: !gameState.answered
                      ? 'rgba(255, 255, 255, 0.05)'
                      : showCorrect
                      ? 'rgba(34, 197, 94, 0.3)'
                      : showWrong
                      ? 'rgba(239, 68, 68, 0.3)'
                      : 'rgba(107, 114, 128, 0.1)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{answer}</span>
                  </div>
                  {showCorrect && <span className="absolute right-6">✅</span>}
                  {showWrong && <span className="absolute right-6">❌</span>}
                </motion.button>
              );
            })}
          </div>

          {/* Next Button */}
          {gameState.answered && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleNextQuestion}
              className="w-full py-4 rounded-2xl backdrop-blur-md border border-cyan-400/30 text-white font-semibold text-lg hover:border-cyan-400/60 transition"
              style={{ background: 'rgba(6, 182, 212, 0.3)', boxShadow: '0 8px 32px rgba(6, 182, 212, 0.2)' }}
            >
              {gameState.currentQuestion < questions.length - 1 ? '➡️ Next Question' : '🏁 See Results'}
            </motion.button>
          )}

          {/* Reward Display */}
          {gameState.answered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 text-center p-4 rounded-2xl backdrop-blur-md border border-green-400/30"
              style={{ background: 'rgba(34, 197, 94, 0.15)' }}
            >
              <p className="text-green-300">
                {gameState.selectedAnswer === currentQuestion.correctAnswer
                  ? `✅ Correct! +${currentQuestion.reward} SOL`
                  : '❌ Wrong!'}
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-1 backdrop-blur-md" style={{ background: 'rgba(15, 23, 42, 0.5)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((gameState.currentQuestion + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
          className="h-full"
          style={{ background: 'rgba(6, 182, 212, 0.8)' }}
        />
      </div>
      </div>
      </LayoutWrapper>
      <Footer />
    </>
  );
};

export default NeuroTrivia;
