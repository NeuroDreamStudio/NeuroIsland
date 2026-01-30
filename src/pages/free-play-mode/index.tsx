'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LayoutWrapper from '@/components/LayoutWrapper';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface Question {
  id: number;
  category: string;
  question: string;
  answers: string[];
  correctAnswer: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const categories = ['General', 'Science', 'History', 'Sports', 'Technology', 'Entertainment'];

const questions: Record<string, Question[]> = {
  General: [
    {
      id: 1,
      category: 'General',
      question: 'What is the capital of Italy?',
      answers: ['Venice', 'Rome', 'Milan', 'Florence'],
      correctAnswer: 1,
      difficulty: 'Easy',
    },
    {
      id: 2,
      category: 'General',
      question: 'How many continents are there?',
      answers: ['5', '6', '7', '8'],
      correctAnswer: 2,
      difficulty: 'Easy',
    },
    {
      id: 3,
      category: 'General',
      question: 'Which country has the most people?',
      answers: ['India', 'United States', 'Indonesia', 'Pakistan'],
      correctAnswer: 0,
      difficulty: 'Medium',
    },
    {
      id: 4,
      category: 'General',
      question: 'What is the smallest country in the world?',
      answers: ['Monaco', 'Vatican City', 'Liechtenstein', 'San Marino'],
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    {
      id: 5,
      category: 'General',
      question: 'Which ocean is the largest?',
      answers: ['Atlantic', 'Indian', 'Pacific', 'Arctic'],
      correctAnswer: 2,
      difficulty: 'Easy',
    },
  ],
  Science: [
    {
      id: 6,
      category: 'Science',
      question: 'What is the chemical symbol for gold?',
      answers: ['Go', 'Gd', 'Au', 'Ag'],
      correctAnswer: 2,
      difficulty: 'Medium',
    },
    {
      id: 7,
      category: 'Science',
      question: 'How many bones does an adult human have?',
      answers: ['186', '206', '226', '246'],
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    {
      id: 8,
      category: 'Science',
      question: 'What is the speed of light?',
      answers: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '100,000 km/s'],
      correctAnswer: 0,
      difficulty: 'Hard',
    },
    {
      id: 9,
      category: 'Science',
      question: 'What is the most abundant element in the universe?',
      answers: ['Oxygen', 'Hydrogen', 'Nitrogen', 'Carbon'],
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 10,
      category: 'Science',
      question: 'What is the process by which plants make their own food?',
      answers: ['Respiration', 'Photosynthesis', 'Fermentation', 'Transpiration'],
      correctAnswer: 1,
      difficulty: 'Easy',
    },
  ],
  History: [
    {
      id: 11,
      category: 'History',
      question: 'In which year did World War II end?',
      answers: ['1943', '1944', '1945', '1946'],
      correctAnswer: 2,
      difficulty: 'Medium',
    },
    {
      id: 12,
      category: 'History',
      question: 'Who was the first President of the United States?',
      answers: ['Thomas Jefferson', 'George Washington', 'John Adams', 'Benjamin Franklin'],
      correctAnswer: 1,
      difficulty: 'Easy',
    },
    {
      id: 13,
      category: 'History',
      question: 'In which year did the Berlin Wall fall?',
      answers: ['1987', '1988', '1989', '1990'],
      correctAnswer: 2,
      difficulty: 'Medium',
    },
    {
      id: 14,
      category: 'History',
      question: 'Which ancient wonder is still standing?',
      answers: ['Colossus of Rhodes', 'Hanging Gardens of Babylon', 'Great Pyramid of Giza', 'Lighthouse of Alexandria'],
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 15,
      category: 'History',
      question: 'Who invented the printing press?',
      answers: ['Leonardo da Vinci', 'Johannes Gutenberg', 'Michelangelo', 'Raphael'],
      correctAnswer: 1,
      difficulty: 'Medium',
    },
  ],
  Sports: [
    {
      id: 16,
      category: 'Sports',
      question: 'How many players are on a basketball team on the court?',
      answers: ['4', '5', '6', '7'],
      correctAnswer: 1,
      difficulty: 'Easy',
    },
    {
      id: 17,
      category: 'Sports',
      question: 'In which sport is the Stanley Cup awarded?',
      answers: ['Baseball', 'Hockey', 'Football', 'Basketball'],
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    {
      id: 18,
      category: 'Sports',
      question: 'How many sets are typically played in a tennis match?',
      answers: ['1', '2', '3', '4'],
      correctAnswer: 2,
      difficulty: 'Easy',
    },
    {
      id: 19,
      category: 'Sports',
      question: 'What is the maximum score in bowling?',
      answers: ['250', '275', '300', '325'],
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 20,
      category: 'Sports',
      question: 'How long is an Olympic swimming pool?',
      answers: ['25 meters', '50 meters', '75 meters', '100 meters'],
      correctAnswer: 1,
      difficulty: 'Medium',
    },
  ],
  Technology: [
    {
      id: 21,
      category: 'Technology',
      question: 'Who is considered the father of computers?',
      answers: ['Alan Turing', 'Charles Babbage', 'Steve Jobs', 'Bill Gates'],
      correctAnswer: 1,
      difficulty: 'Hard',
    },
    {
      id: 22,
      category: 'Technology',
      question: 'What does AI stand for?',
      answers: ['Automated Intelligence', 'Artificial Intelligence', 'Applied Integration', 'Advanced Interface'],
      correctAnswer: 1,
      difficulty: 'Easy',
    },
    {
      id: 23,
      category: 'Technology',
      question: 'In what year was the World Wide Web invented?',
      answers: ['1989', '1991', '1993', '1995'],
      correctAnswer: 0,
      difficulty: 'Hard',
    },
    {
      id: 24,
      category: 'Technology',
      question: 'What does GPU stand for?',
      answers: ['Graphics Processing Unit', 'General Purpose Unit', 'Graphics Power Upgrade', 'Gaming Process Unit'],
      correctAnswer: 0,
      difficulty: 'Medium',
    },
    {
      id: 25,
      category: 'Technology',
      question: 'Who created JavaScript?',
      answers: ['Guido van Rossum', 'Brendan Eich', 'Bjarne Stroustrup', 'Dennis Ritchie'],
      correctAnswer: 1,
      difficulty: 'Hard',
    },
  ],
  Entertainment: [
    {
      id: 26,
      category: 'Entertainment',
      question: 'In what year was the first Harry Potter book published?',
      answers: ['1995', '1997', '1999', '2001'],
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    {
      id: 27,
      category: 'Entertainment',
      question: 'How many movies are in the original Star Wars trilogy?',
      answers: ['2', '3', '4', '5'],
      correctAnswer: 1,
      difficulty: 'Easy',
    },
    {
      id: 28,
      category: 'Entertainment',
      question: 'Who directed Inception?',
      answers: ['Steven Spielberg', 'Christopher Nolan', 'Denis Villeneuve', 'Martin Scorsese'],
      correctAnswer: 1,
      difficulty: 'Medium',
    },
    {
      id: 29,
      category: 'Entertainment',
      question: 'What is the highest-grossing film of all time?',
      answers: ['Avatar', 'Avengers: Endgame', 'Avatar: The Way of Water', 'Titanic'],
      correctAnswer: 2,
      difficulty: 'Hard',
    },
    {
      id: 30,
      category: 'Entertainment',
      question: 'In Friends, what is the name of Ross\'s pet monkey?',
      answers: ['Marcel', 'Marco', 'Martin', 'Maurice'],
      correctAnswer: 0,
      difficulty: 'Medium',
    },
  ],
};

type GamePhase = 'category-select' | 'playing' | 'results';

const FreePlayMode = () => {
  const [phase, setPhase] = useState<GamePhase>('category-select');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const categoryQuestions = selectedCategory ? questions[selectedCategory] : [];
  const currentQuestion = categoryQuestions[currentQuestionIdx];

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setPhase('playing');
    setCurrentQuestionIdx(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answerIdx: number) => {
    if (answered) return;
    setSelectedAnswer(answerIdx);
    setAnswered(true);
    if (answerIdx === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < categoryQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      setPhase('results');
    }
  };

  const handlePlayAgain = () => {
    setPhase('category-select');
    setSelectedCategory(null);
    setCurrentQuestionIdx(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  // Category Selection
  if (phase === 'category-select') {
    return (
      <>
        <LayoutWrapper showFooter={false}>
          <section className="relative py-16 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  🎮 Free Play
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400">
                  Practice mode - no stakes, unlimited questions
                </p>
              </motion.div>

              {/* Category Grid */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-8 text-neutral-900 dark:text-white">
                  Choose a Category
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category, idx) => {
                    const categoryEmojis: Record<string, string> = {
                      'General': '🌍',
                      'Science': '🔬',
                      'History': '📚',
                      'Sports': '⚽',
                      'Technology': '💻',
                      'Entertainment': '🎬',
                    };

                    const categoryColors: Record<string, string> = {
                      'General': 'from-blue-500 to-cyan-500',
                      'Science': 'from-green-500 to-emerald-500',
                      'History': 'from-orange-500 to-yellow-500',
                      'Sports': 'from-red-500 to-pink-500',
                      'Technology': 'from-purple-500 to-indigo-500',
                      'Entertainment': 'from-pink-500 to-rose-500',
                    };

                    return (
                      <motion.button
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        whileHover={{ scale: 1.05, translateY: -8 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectCategory(category)}
                        className="relative overflow-hidden group"
                      >
                        <Card
                          variant="elevated"
                          hover
                          className={`p-8 text-center cursor-pointer border-0 bg-gradient-to-br ${categoryColors[category]}`}
                        >
                          <div className="relative z-10">
                            <div className="text-5xl mb-3">{categoryEmojis[category]}</div>
                            <h3 className="text-xl font-bold text-white mb-2">{category}</h3>
                            <p className="text-white/80 text-sm">
                              5 questions
                            </p>
                          </div>
                          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                        </Card>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link href="/neuro-trivia">
                  <Button variant="outline" size="md">
                    ← Back to Neuro Trivia
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>
        </LayoutWrapper>
        <Footer />
      </>
    );
  }

  // Playing Phase
  if (phase === 'playing' && currentQuestion) {
    const progress = ((currentQuestionIdx) / categoryQuestions.length) * 100;

    return (
      <>
        <LayoutWrapper showFooter={false}>
          <section className="relative py-8 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Question {currentQuestionIdx + 1}/{categoryQuestions.length}
                  </span>
                  <Badge variant="primary">{score} Correct</Badge>
                </div>
                <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
                  />
                </div>
              </motion.div>

              {/* Question Card */}
              <motion.div
                key={currentQuestionIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card variant="elevated" className="p-8 md:p-10 mb-8">
                  {/* Difficulty */}
                  <div className="mb-6">
                    <Badge
                      variant={
                        currentQuestion.difficulty === 'Easy'
                          ? 'success'
                          : currentQuestion.difficulty === 'Medium'
                          ? 'warning'
                          : 'destructive'
                      }
                      size="md"
                    >
                      {currentQuestion.difficulty === 'Easy' && '🟢'}
                      {currentQuestion.difficulty === 'Medium' && '🟡'}
                      {currentQuestion.difficulty === 'Hard' && '🔴'}
                      {' '}{currentQuestion.difficulty}
                    </Badge>
                  </div>

                  {/* Question */}
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 text-neutral-900 dark:text-white leading-relaxed">
                    {currentQuestion.question}
                  </h2>

                  {/* Answers */}
                  <div className="space-y-3">
                    {currentQuestion.answers.map((answer, idx) => {
                      const isSelected = selectedAnswer === idx;
                      const isCorrect = idx === currentQuestion.correctAnswer;
                      const showCorrect = answered && isCorrect;
                      const showWrong = answered && isSelected && !isCorrect;

                      return (
                        <motion.button
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={!answered ? { scale: 1.02, x: 4 } : {}}
                          whileTap={!answered ? { scale: 0.98 } : {}}
                          onClick={() => handleAnswer(idx)}
                          disabled={answered}
                          className={`w-full text-left transition-all duration-200 p-4 rounded-xl border-2 font-medium text-lg ${
                            !answered
                              ? 'border-neutral-300 dark:border-neutral-600 hover:border-orange-500 dark:hover:border-orange-400 cursor-pointer'
                              : showCorrect
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-300'
                              : showWrong
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-300'
                              : 'border-neutral-300 dark:border-neutral-600 text-neutral-500 dark:text-neutral-500'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 text-white font-bold text-sm">
                                {String.fromCharCode(65 + idx)}
                              </div>
                              <span>{answer}</span>
                            </div>
                            <div className="text-xl">
                              {showCorrect && '✅'}
                              {showWrong && '❌'}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </Card>

                {/* Feedback */}
                {answered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6"
                  >
                    <Card
                      variant="elevated"
                      className={`p-6 text-center border-0 ${
                        selectedAnswer === currentQuestion.correctAnswer
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                          : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                      }`}
                    >
                      <p className="text-lg font-bold">
                        {selectedAnswer === currentQuestion.correctAnswer
                          ? '✅ Correct!'
                          : `❌ Wrong! The answer is: ${currentQuestion.answers[currentQuestion.correctAnswer]}`}
                      </p>
                    </Card>
                  </motion.div>
                )}

                {/* Next Button */}
                {answered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleNextQuestion}
                      className="w-full"
                    >
                      {currentQuestionIdx < categoryQuestions.length - 1
                        ? '➡️ Next Question'
                        : '🏁 See Results'}
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </section>
        </LayoutWrapper>
        <Footer />
      </>
    );
  }

  // Results Phase
  if (phase === 'results') {
    const scorePercentage = Math.round((score / categoryQuestions.length) * 100);
    const emoji =
      scorePercentage >= 90
        ? '🏆'
        : scorePercentage >= 70
        ? '⭐'
        : scorePercentage >= 50
        ? '👍'
        : '📚';

    return (
      <>
        <LayoutWrapper showFooter={false}>
          <section className="relative py-16 px-4 md:px-8">
            <div className="max-w-2xl mx-auto">
              {/* Results */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mb-12"
              >
                <div className="text-8xl mb-4">{emoji}</div>
                <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  Quiz Complete!
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Great job on {selectedCategory}!
                </p>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card variant="elevated" className="p-6 text-center">
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                      Correct Answers
                    </p>
                    <p className="text-4xl font-bold text-orange-500">
                      {score}/{categoryQuestions.length}
                    </p>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card variant="elevated" className="p-6 text-center">
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                      Score
                    </p>
                    <p className="text-4xl font-bold text-emerald-500">
                      {scorePercentage}%
                    </p>
                  </Card>
                </motion.div>
              </div>

              {/* Progress */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <Card variant="outlined" className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-lg">Your Performance</span>
                    <Badge variant="primary" size="lg">
                      {scorePercentage}%
                    </Badge>
                  </div>

                  <div className="w-full h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${scorePercentage}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
                    />
                  </div>

                  <p className="text-center mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                    {scorePercentage >= 90 && '🎯 Perfect! You\'re a trivia master!'}
                    {scorePercentage >= 70 &&
                      scorePercentage < 90 &&
                      '⭐ Excellent! Keep it up!'}
                    {scorePercentage >= 50 &&
                      scorePercentage < 70 &&
                      '👍 Good job! Practice more!'}
                    {scorePercentage < 50 && '📚 Keep learning and try again!'}
                  </p>
                </Card>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-4"
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handlePlayAgain}
                  className="w-full"
                >
                  🔄 Play Again
                </Button>

                <Link href="/neuro-trivia" className="w-full">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    🏠 Back to Hub
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>
        </LayoutWrapper>
        <Footer />
      </>
    );
  }

  return null;
};

export default FreePlayMode;
