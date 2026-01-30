import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
      <div className="min-h-screen w-full overflow-hidden">
        {/* Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" />
        </div>

        {/* Header */}
        <header className="relative z-50 backdrop-blur-md bg-black/30 border-b border-cyan-500/30 sticky top-0">
          <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
            <Link href="/">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent cursor-pointer hover:opacity-80">
                🧠 Neuro Trivia
              </h1>
            </Link>
            <Link href="/">
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 transition cursor-pointer">
                ← Back Home
              </button>
            </Link>
          </div>
        </header>

        {/* Content */}
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                🎯 Neuro Trivia Challenge
              </h2>
              <p className="text-cyan-200 text-xl">
                Answer questions and earn cryptocurrency! 💰
              </p>
            </motion.div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: '🎮', title: 'Play', desc: 'Trivia on Web3, Gaming and NFT' },
                { icon: '🧠', title: 'Learn', desc: 'Questions from industry experts' },
                { icon: '💎', title: 'Earn', desc: 'Win SOL, ETH, CRO' },
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-xl backdrop-blur-sm bg-white/5 border border-cyan-500/30 text-center"
                >
                  <div className="text-4xl mb-3">{card.icon}</div>
                  <h3 className="text-xl font-bold text-cyan-300 mb-2">{card.title}</h3>
                  <p className="text-gray-300">{card.desc}</p>
                </motion.div>
              ))}
            </div>

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
                    className="group relative p-8 rounded-xl overflow-hidden transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 group-hover:from-cyan-400 group-hover:to-blue-500 transition" />
                    <div className="relative z-10 text-center">
                      <div className="text-4xl mb-2">
                        {category === 'Tutte' && '🌍'}
                        {category === 'Criptovalute' && '💰'}
                        {category === 'NFT' && '🎨'}
                        {category === 'Gaming' && '🎮'}
                        {category === 'Web3' && '🔗'}
                      </div>
                      <h4 className="text-lg font-bold text-white">{category}</h4>
                      <p className="text-white/80 text-sm mt-2">
                        {allQuestions.filter(q => category === 'Tutte' || q.category === category).length} domande
                      </p>
                    </div>
                    <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-br from-white/20 to-transparent group-hover:from-white/40 transition-all" />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
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

        {/* Header */}
        <header className="relative z-50 backdrop-blur-md bg-black/30 border-b border-cyan-500/30 sticky top-0">
          <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              🧠 Neuro Trivia
            </h1>
            <Link href="/">
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg transition cursor-pointer">
                ← Torna Home
              </button>
            </Link>
          </div>
        </header>

        {/* Results */}
        <section className="relative py-20 px-4 flex items-center justify-center">
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
              <div className="p-8 rounded-xl backdrop-blur-sm bg-white/5 border border-cyan-500/30">
                <p className="text-gray-400 mb-2">Risposte Corrette</p>
                <p className="text-4xl font-bold text-cyan-400">
                  {gameState.score} / {questions.length}
                </p>
              </div>
              <div className="p-8 rounded-xl backdrop-blur-sm bg-white/5 border border-cyan-500/30">
                <p className="text-gray-400 mb-2">Guadagni</p>
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
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition mb-4"
            >
              🔄 Gioca Di Nuovo
            </motion.button>
            <Link href="/">
              <button className="w-full py-4 rounded-xl bg-white/10 text-white font-bold text-lg hover:bg-white/20 transition">
                🏠 Torna Home
              </button>
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  // Rendering Schermata Domanda
  return (
    <div className="min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" />
      </div>

      {/* Header */}
      <header className="relative z-50 backdrop-blur-md bg-black/30 border-b border-cyan-500/30 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            🧠 Neuro Trivia
          </h1>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Domanda</p>
              <p className="text-2xl font-bold text-cyan-400">
                {gameState.currentQuestion + 1} / {questions.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Punti</p>
              <p className="text-2xl font-bold text-green-400">{gameState.score}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Question Section */}
      <section className="relative py-12 px-4 flex items-center justify-center min-h-[calc(100vh-200px)]">
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
                  className={`relative p-6 rounded-xl text-left font-semibold transition-all text-lg ${
                    !gameState.answered
                      ? 'bg-gradient-to-r from-cyan-500/30 to-blue-600/30 border border-cyan-400/50 hover:border-cyan-300 text-white cursor-pointer'
                      : showCorrect
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 border border-green-400 text-white'
                      : showWrong
                      ? 'bg-gradient-to-r from-red-500 to-red-600 border border-red-400 text-white'
                      : 'bg-gradient-to-r from-gray-500/30 to-gray-600/30 border border-gray-400/30 text-gray-300 cursor-not-allowed'
                  }`}
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
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition"
            >
              {gameState.currentQuestion < questions.length - 1 ? '➡️ Prossima Domanda' : '🏁 Vedi Risultati'}
            </motion.button>
          )}

          {/* Reward Display */}
          {gameState.answered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 text-center p-4 rounded-xl bg-green-500/20 border border-green-500/50"
            >
              <p className="text-green-300">
                {gameState.selectedAnswer === currentQuestion.correctAnswer
                  ? `✅ Corretto! +${currentQuestion.reward} SOL`
                  : '❌ Sbagliato!'}
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((gameState.currentQuestion + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
        />
      </div>
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="relative border-t border-cyan-500/20 backdrop-blur-sm bg-black/40 mt-20">
    <div className="max-w-7xl mx-auto px-4 py-12 text-center">
      <p className="text-gray-400">
        © 2026 NeuroIsland Trivia. Gioca responsabilmente! 🧠
      </p>
    </div>
  </footer>
);

export default NeuroTrivia;
