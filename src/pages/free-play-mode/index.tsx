'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';

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
    { id: 1, category: 'General', question: 'What is the capital of Italy?', answers: ['Venice', 'Rome', 'Milan', 'Florence'], correctAnswer: 1, difficulty: 'Easy' },
    { id: 2, category: 'General', question: 'How many continents are there?', answers: ['5', '6', '7', '8'], correctAnswer: 2, difficulty: 'Easy' },
    { id: 3, category: 'General', question: 'Which country has the most people?', answers: ['India', 'United States', 'Indonesia', 'Pakistan'], correctAnswer: 0, difficulty: 'Medium' },
    { id: 4, category: 'General', question: 'What is the smallest country in the world?', answers: ['Monaco', 'Vatican City', 'Liechtenstein', 'San Marino'], correctAnswer: 1, difficulty: 'Medium' },
    { id: 5, category: 'General', question: 'Which ocean is the largest?', answers: ['Atlantic', 'Indian', 'Pacific', 'Arctic'], correctAnswer: 2, difficulty: 'Easy' },
  ],
  Science: [
    { id: 6, category: 'Science', question: 'What is the chemical symbol for gold?', answers: ['Go', 'Gd', 'Au', 'Ag'], correctAnswer: 2, difficulty: 'Medium' },
    { id: 7, category: 'Science', question: 'How many bones does an adult human have?', answers: ['186', '206', '226', '246'], correctAnswer: 1, difficulty: 'Medium' },
    { id: 8, category: 'Science', question: 'What is the speed of light?', answers: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '100,000 km/s'], correctAnswer: 0, difficulty: 'Hard' },
    { id: 9, category: 'Science', question: 'What is the most abundant element in the universe?', answers: ['Oxygen', 'Hydrogen', 'Nitrogen', 'Carbon'], correctAnswer: 1, difficulty: 'Hard' },
    { id: 10, category: 'Science', question: 'What is the process by which plants make their own food?', answers: ['Respiration', 'Photosynthesis', 'Fermentation', 'Transpiration'], correctAnswer: 1, difficulty: 'Easy' },
  ],
  History: [
    { id: 11, category: 'History', question: 'In which year did World War II end?', answers: ['1943', '1944', '1945', '1946'], correctAnswer: 2, difficulty: 'Medium' },
    { id: 12, category: 'History', question: 'Who was the first President of the United States?', answers: ['Thomas Jefferson', 'George Washington', 'John Adams', 'Benjamin Franklin'], correctAnswer: 1, difficulty: 'Easy' },
    { id: 13, category: 'History', question: 'In which year did the Berlin Wall fall?', answers: ['1987', '1988', '1989', '1990'], correctAnswer: 2, difficulty: 'Medium' },
    { id: 14, category: 'History', question: 'Which ancient wonder is still standing?', answers: ['Colossus of Rhodes', 'Hanging Gardens', 'Great Pyramid of Giza', 'Lighthouse'], correctAnswer: 2, difficulty: 'Hard' },
    { id: 15, category: 'History', question: 'Who invented the printing press?', answers: ['Leonardo da Vinci', 'Johannes Gutenberg', 'Michelangelo', 'Raphael'], correctAnswer: 1, difficulty: 'Medium' },
  ],
  Sports: [
    { id: 16, category: 'Sports', question: 'How many players are on a basketball team on the court?', answers: ['4', '5', '6', '7'], correctAnswer: 1, difficulty: 'Easy' },
    { id: 17, category: 'Sports', question: 'In which sport is the Stanley Cup awarded?', answers: ['Baseball', 'Hockey', 'Football', 'Basketball'], correctAnswer: 1, difficulty: 'Medium' },
    { id: 18, category: 'Sports', question: 'How many sets are typically played in a tennis match?', answers: ['1', '2', '3', '4'], correctAnswer: 2, difficulty: 'Easy' },
    { id: 19, category: 'Sports', question: 'What is the maximum score in bowling?', answers: ['250', '275', '300', '325'], correctAnswer: 2, difficulty: 'Hard' },
    { id: 20, category: 'Sports', question: 'How long is an Olympic swimming pool?', answers: ['25 meters', '50 meters', '75 meters', '100 meters'], correctAnswer: 1, difficulty: 'Medium' },
  ],
  Technology: [
    { id: 21, category: 'Technology', question: 'Who is considered the father of computers?', answers: ['Alan Turing', 'Charles Babbage', 'Steve Jobs', 'Bill Gates'], correctAnswer: 1, difficulty: 'Hard' },
    { id: 22, category: 'Technology', question: 'What does AI stand for?', answers: ['Automated Intelligence', 'Artificial Intelligence', 'Applied Integration', 'Advanced Interface'], correctAnswer: 1, difficulty: 'Easy' },
    { id: 23, category: 'Technology', question: 'In what year was the World Wide Web invented?', answers: ['1989', '1991', '1993', '1995'], correctAnswer: 0, difficulty: 'Hard' },
    { id: 24, category: 'Technology', question: 'What does GPU stand for?', answers: ['Graphics Processing Unit', 'General Purpose Unit', 'Graphics Power Upgrade', 'Gaming Process Unit'], correctAnswer: 0, difficulty: 'Medium' },
    { id: 25, category: 'Technology', question: 'Who created JavaScript?', answers: ['Guido van Rossum', 'Brendan Eich', 'Bjarne Stroustrup', 'Dennis Ritchie'], correctAnswer: 1, difficulty: 'Hard' },
  ],
  Entertainment: [
    { id: 26, category: 'Entertainment', question: 'In what year was the first Harry Potter book published?', answers: ['1995', '1997', '1999', '2001'], correctAnswer: 1, difficulty: 'Medium' },
    { id: 27, category: 'Entertainment', question: 'How many movies are in the original Star Wars trilogy?', answers: ['2', '3', '4', '5'], correctAnswer: 1, difficulty: 'Easy' },
    { id: 28, category: 'Entertainment', question: 'Who directed Inception?', answers: ['Steven Spielberg', 'Christopher Nolan', 'Denis Villeneuve', 'Martin Scorsese'], correctAnswer: 1, difficulty: 'Medium' },
    { id: 29, category: 'Entertainment', question: 'What is the highest-grossing film of all time?', answers: ['Avatar', 'Avengers: Endgame', 'Avatar: The Way of Water', 'Titanic'], correctAnswer: 2, difficulty: 'Hard' },
    { id: 30, category: 'Entertainment', question: 'In Friends, what is the name of Ross\'s pet monkey?', answers: ['Marcel', 'Marco', 'Martin', 'Maurice'], correctAnswer: 0, difficulty: 'Medium' },
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
        <div 
          className="min-h-screen w-full overflow-visible"
          style={{
            backgroundImage: 'url(/assets/images/base.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="fixed inset-0 -z-20 bg-black/30" />

          <section className="relative pt-16 pb-32 px-4 md:px-16 lg:px-24 min-h-screen flex items-center justify-center overflow-x-hidden">
            <div className="w-full max-w-6xl mx-auto">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-black mb-4">
                  🎮 <span style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>Free Play</span>
                </h1>
                <p className="text-lg md:text-xl text-cyan-100">Practice mode - no stakes, unlimited questions</p>
              </motion.div>

              {/* Category Grid */}
              <motion.div
                style={{
                  marginBottom: '4rem',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <style>{`
                  @media (max-width: 768px) {
                    .category-item {
                      flex: 0 0 200px !important;
                      width: 200px !important;
                      max-width: 200px !important;
                    }
                  }
                  @media (min-width: 769px) {
                    .category-item {
                      flex: 0 0 200px !important;
                      width: 200px !important;
                      max-width: 200px !important;
                    }
                  }
                `}</style>
                <div style={{ display: 'flex', gap: '81.72px', flexWrap: 'wrap', justifyContent: 'center', width: '100%', paddingLeft: '0', paddingRight: '0', marginLeft: '3.07%' }}>
                {categories.map((category, idx) => {
                  const categoryColors: Record<string, { bg: string; glow: string }> = {
                    'General': { bg: 'rgba(59, 130, 246, 0.2)', glow: 'rgba(59, 130, 246, 0.3)' },
                    'Science': { bg: 'rgba(34, 197, 94, 0.2)', glow: 'rgba(34, 197, 94, 0.3)' },
                    'History': { bg: 'rgba(245, 158, 11, 0.2)', glow: 'rgba(245, 158, 11, 0.3)' },
                    'Sports': { bg: 'rgba(239, 68, 68, 0.2)', glow: 'rgba(239, 68, 68, 0.3)' },
                    'Technology': { bg: 'rgba(168, 85, 247, 0.2)', glow: 'rgba(168, 85, 247, 0.3)' },
                    'Entertainment': { bg: 'rgba(236, 72, 153, 0.2)', glow: 'rgba(236, 72, 153, 0.3)' },
                  };

                  const categoryEmojis: Record<string, string> = {
                    'General': '🌍', 'Science': '🔬', 'History': '📚', 'Sports': '⚽', 'Technology': '💻', 'Entertainment': '🎬',
                  };

                  const colors = categoryColors[category];

                  return (
                    <motion.button
                      key={category}
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.8 }}
                      onClick={() => handleSelectCategory(category)}
                      className="category-item"
                      style={{
                        padding: '16px 24px',
                        borderRadius: '16px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: colors.bg,
                        boxShadow: `0 8px 32px ${colors.glow}`,
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        fontSize: '18px',
                        fontWeight: '600',
                        width: '200px',
                        height: '220px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingTop: '40px',
                        flex: '0 0 200px',
                        maxWidth: '200px',
                        minWidth: '200px',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = `0 16px 48px ${colors.glow}`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = `0 8px 32px ${colors.glow}`;
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '80px',
                        alignItems: 'center',
                        marginBottom: '12px',
                      }}>
                        <div style={{
                          fontSize: '50px',
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          filter: 'drop-shadow(0 4px 12px rgba(255, 255, 255, 0.2))',
                          textShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
                          lineHeight: '1',
                        }}>
                          {categoryEmojis[category]}
                        </div>
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>{category}</div>
                      <div style={{ fontSize: '12px', opacity: 0.8 }}>5 questions</div>
                    </motion.button>
                  );
                })}
              </div>
              </motion.div>

              {/* Back Button */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{ textAlign: 'center' }}
              >
                <Link href="/neuro-trivia" legacyBehavior>
                  <a
                    style={{
                      display: 'inline-block',
                      padding: '16px 40px',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(107, 114, 128, 0.3)',
                      boxShadow: '0 8px 32px rgba(107, 114, 128, 0.3)',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      transition: 'transform 0.3s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
                  >
                    ← Back to Neuro Trivia
                  </a>
                </Link>
              </motion.div>
            </div>
          </section>

          <div className="w-full min-h-screen"></div>
          <div style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
            <Footer />
          </div>
        </div>
      </>
    );
  }

  // Playing Phase
  if (phase === 'playing' && currentQuestion) {
    return (
      <>
        <div 
          className="min-h-screen w-full overflow-visible"
          style={{
            backgroundImage: 'url(/assets/images/base.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="fixed inset-0 -z-20 bg-black/30" />

          <section className="relative pt-16 pb-32 px-4 md:px-16 lg:px-24 min-h-screen flex items-center justify-center overflow-x-hidden">
            <div className="w-full max-w-3xl mx-auto">
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '8px', fontSize: '16px' }}>
                  Question {currentQuestionIdx + 1}/{categoryQuestions.length} | Score: {score}
                </p>
              </motion.div>

              <motion.div
                key={currentQuestionIdx}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div
                  style={{
                    padding: '40px',
                    borderRadius: '16px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(59, 130, 246, 0.2)',
                    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
                    color: 'white',
                    marginBottom: '24px',
                  }}
                >
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '32px', lineHeight: '1.5' }}>
                    {currentQuestion.question}
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {currentQuestion.answers.map((answer, idx) => {
                      const isSelected = selectedAnswer === idx;
                      const isCorrect = idx === currentQuestion.correctAnswer;
                      const showCorrect = answered && isCorrect;
                      const showWrong = answered && isSelected && !isCorrect;

                      return (
                        <motion.button
                          key={idx}
                          initial={{ opacity: 1, y: 0 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05, duration: 0.6 }}
                          onClick={() => handleAnswer(idx)}
                          disabled={answered}
                          style={{
                            padding: '16px 20px',
                            borderRadius: '12px',
                            border: '2px solid',
                            borderColor: showCorrect ? '#10b981' : showWrong ? '#ef4444' : 'rgba(255,255,255,0.3)',
                            background: showCorrect ? 'rgba(16, 185, 129, 0.2)' : showWrong ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.1)',
                            color: showCorrect ? '#d1fae5' : showWrong ? '#fecaca' : 'white',
                            textAlign: 'left',
                            cursor: answered ? 'default' : 'pointer',
                            fontSize: '16px',
                            fontWeight: '500',
                            transition: 'all 0.3s',
                          }}
                          onMouseEnter={(e) => {
                            if (!answered) {
                              e.currentTarget.style.transform = 'translateX(8px)';
                              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!answered) {
                              e.currentTarget.style.transform = 'translateX(0)';
                              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                            }
                          }}
                        >
                          <span style={{ fontSize: '18px', marginRight: '12px', fontWeight: 'bold' }}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {answer}
                          {showCorrect && ' ✅'}
                          {showWrong && ' ❌'}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {answered && (
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}
                  >
                    <button
                      onClick={handleNextQuestion}
                      style={{
                        padding: '16px 40px',
                        borderRadius: '16px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(34, 197, 94, 0.3)',
                        boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3)',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'transform 0.3s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      {currentQuestionIdx < categoryQuestions.length - 1 ? '➡️ Next Question' : '🏁 See Results'}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </section>

          <div className="w-full min-h-screen"></div>
          <div style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
            <Footer />
          </div>
        </div>
      </>
    );
  }

  // Results Phase
  if (phase === 'results') {
    const scorePercentage = Math.round((score / categoryQuestions.length) * 100);
    const emoji = scorePercentage >= 90 ? '🏆' : scorePercentage >= 70 ? '⭐' : scorePercentage >= 50 ? '👍' : '📚';

    return (
      <>
        <div 
          className="min-h-screen w-full overflow-visible"
          style={{
            backgroundImage: 'url(/assets/images/base.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="fixed inset-0 -z-20 bg-black/30" />

          <section className="relative pt-16 pb-32 px-4 md:px-16 lg:px-24 min-h-screen flex items-center justify-center overflow-x-hidden">
            <div className="w-full max-w-2xl mx-auto">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div style={{ fontSize: '80px', marginBottom: '16px' }}>{emoji}</div>
                <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Quiz Complete!</h1>
                <p style={{ color: 'rgba(255,255,255,0.8)' }}>Great job on {selectedCategory}!</p>
              </motion.div>

              <div className="grid grid-cols-2 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <div
                    style={{
                      padding: '24px',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(59, 130, 246, 0.2)',
                      boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '8px' }}>Correct Answers</p>
                    <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#fbbf24' }}>
                      {score}/{categoryQuestions.length}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <div
                    style={{
                      padding: '24px',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(34, 197, 94, 0.2)',
                      boxShadow: '0 8px 32px rgba(34, 197, 94, 0.2)',
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '8px' }}>Score</p>
                    <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#10b981' }}>{scorePercentage}%</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}
              >
                <button
                  onClick={handlePlayAgain}
                  style={{
                    padding: '16px 40px',
                    borderRadius: '16px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(168, 85, 247, 0.3)',
                    boxShadow: '0 8px 32px rgba(168, 85, 247, 0.3)',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'transform 0.3s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  🔄 Play Again
                </button>

                <Link href="/neuro-trivia" legacyBehavior>
                  <a
                    style={{
                      display: 'block',
                      padding: '16px 40px',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(107, 114, 128, 0.3)',
                      boxShadow: '0 8px 32px rgba(107, 114, 128, 0.3)',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      transition: 'transform 0.3s',
                      textAlign: 'center',
                    }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
                  >
                    🏠 Back to Hub
                  </a>
                </Link>
              </motion.div>
            </div>
          </section>

          <div className="w-full min-h-screen"></div>
          <div style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
            <Footer />
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default FreePlayMode;
