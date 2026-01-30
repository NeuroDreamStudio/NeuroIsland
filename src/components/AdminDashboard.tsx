import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LayoutWrapper from './LayoutWrapper';
import Footer from './Footer';

interface TriviaCategory {
  id: string;
  name: string;
  icon: string;
  questionCount: number;
  color: string;
  createdAt: string;
}

interface Question {
  id: string;
  category: string;
  question: string;
  answers: string[];
  correctAnswer: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'trivia' | 'nft' | 'wallet'>('dashboard');
  const [triviaSubTab, setTriviaSubTab] = useState<'overview' | 'categories' | 'questions' | 'generate'>('overview');
  const [categories, setCategories] = useState<TriviaCategory[]>([
    { id: '1', name: 'Crypto', icon: '💰', questionCount: 15, color: 'from-yellow-500 to-orange-600', createdAt: '2026-01-15' },
    { id: '2', name: 'NFT', icon: '🎨', questionCount: 12, color: 'from-pink-500 to-rose-600', createdAt: '2026-01-16' },
    { id: '3', name: 'Gaming', icon: '🎮', questionCount: 18, color: 'from-blue-500 to-cyan-600', createdAt: '2026-01-17' },
  ]);

  const [newCategory, setNewCategory] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [aiGenerating, setAiGenerating] = useState(false);

  const [newQuestion, setNewQuestion] = useState({
    question: '',
    answers: ['', '', '', ''],
    correctAnswer: 0,
    difficulty: 'Medium' as const,
  });

  // Function to add category
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newCat: TriviaCategory = {
        id: Date.now().toString(),
        name: newCategory,
        icon: newCategoryIcon || '📁',
        questionCount: 0,
        color: 'from-purple-500 to-indigo-600',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setCategories([...categories, newCat]);
      setNewCategory('');
      setNewCategoryIcon('');
      setShowAddCategory(false);
    }
  };

  // Function to delete category
  const handleDeleteCategory = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  // Function to generate questions with AI
  const handleGenerateQuestions = async () => {
    if (!selectedCategory) {
      alert('Select a category');
      return;
    }

    setAiGenerating(true);

    // Simulates AI question generation
    setTimeout(() => {
      const category = categories.find(cat => cat.id === selectedCategory);
      const generatedQuestions: Question[] = [
        {
          id: '1',
          category: category?.name || '',
          question: `AI Generated Question #1 for ${category?.name}?`,
          answers: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
          correctAnswer: Math.floor(Math.random() * 4),
          difficulty: 'Easy',
        },
        {
          id: '2',
          category: category?.name || '',
          question: `AI Generated Question #2 for ${category?.name}?`,
          answers: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
          correctAnswer: Math.floor(Math.random() * 4),
          difficulty: 'Medium',
        },
        {
          id: '3',
          category: category?.name || '',
          question: `AI Generated Question #3 for ${category?.name}?`,
          answers: ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
          correctAnswer: Math.floor(Math.random() * 4),
          difficulty: 'Hard',
        },
      ];

      setQuestions(generatedQuestions);
      setAiGenerating(false);
      alert('✅ 3 questions generated successfully!');
    }, 2000);
  };

  return (
    <>
      <LayoutWrapper showFooter={false}>
        <div className="w-full overflow-hidden">
        {/* Navigation Tabs */}
        <nav className="relative z-40 backdrop-blur-sm bg-black/20 border-b border-emerald-500/20 sticky top-0">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex space-x-1 overflow-x-auto py-4">
              {[
                { id: 'dashboard', label: '📊 Dashboard', icon: '🏠' },
              { id: 'trivia', label: '🧠 Trivia', icon: '❓' },
              { id: 'nft', label: '🎨 NFT', icon: '🖼️' },
              { id: 'wallet', label: '💳 Wallet', icon: '🔐' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-emerald-500/30 border border-emerald-400 text-emerald-300'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="relative py-12 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto border-x border-emerald-500/30 px-8 md:px-12 lg:px-16">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-emerald-300">📊 Main Dashboard</h2>

              {/* Online Users & Server Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-emerald-500/30"
                >
                  <div className="text-4xl mb-2">👥</div>
                    <p className="text-gray-400 text-sm">Online Users</p>
                  <p className="text-4xl font-bold text-white mt-2">42</p>
                  <p className="text-green-400 text-xs mt-2">↑ +5 in last 10 min</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-emerald-500/30"
                >
                  <div className="text-4xl mb-2">⚡</div>
                  <p className="text-gray-400 text-sm">CPU Usage</p>
                  <p className="text-4xl font-bold text-white mt-2">34%</p>
                  <p className="text-yellow-400 text-xs mt-2">Stable</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-emerald-500/30"
                >
                  <div className="text-4xl mb-2">💾</div>
                  <p className="text-gray-400 text-sm">Memory Usage</p>
                  <p className="text-4xl font-bold text-white mt-2">2.4 GB</p>
                  <p className="text-blue-400 text-xs mt-2">/ 8 GB available</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-emerald-500/30"
                >
                  <div className="text-4xl mb-2">🌐</div>
                  <p className="text-gray-400 text-sm">Bandwidth</p>
                  <p className="text-4xl font-bold text-white mt-2">156 Mbps</p>
                  <p className="text-orange-400 text-xs mt-2">Upload: 45 Mbps</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br from-indigo-500/20 to-blue-600/20 border border-emerald-500/30"
                >
                  <div className="text-4xl mb-2">🔌</div>
                  <p className="text-gray-400 text-sm">Uptime</p>
                  <p className="text-4xl font-bold text-white mt-2">99.8%</p>
                  <p className="text-cyan-400 text-xs mt-2">45 days of uptime</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br from-teal-500/20 to-green-600/20 border border-emerald-500/30"
                >
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-gray-400 text-sm">Transazioni/Ora</p>
                  <p className="text-4xl font-bold text-white mt-2">847</p>
                  <p className="text-teal-400 text-xs mt-2">Peak: 1200</p>
                </motion.div>
              </div>

              {/* Geolocation */}
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/5 border border-emerald-500/30 mb-8">
                <h3 className="text-xl font-bold text-emerald-300 mb-6">🌍 Connections by Country</h3>
                <div className="space-y-4">
                  {[
                    { country: '🇮🇹 Italia', users: 18, percentage: 42.8 },
                    { country: '🇺🇸 USA', users: 12, percentage: 28.6 },
                    { country: '🇬🇧 UK', users: 7, percentage: 16.7 },
                    { country: '🇩🇪 Germania', users: 5, percentage: 11.9 },
                  ].map((location, idx) => (
                    <div key={idx} className="flex items-center space-x-4">
                      <span className="text-lg font-semibold text-white w-24">{location.country}</span>
                      <div className="flex-1 h-6 bg-white/10 rounded-full overflow-hidden border border-emerald-500/30">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                          style={{ width: `${location.percentage}%` }}
                        />
                      </div>
                      <span className="text-gray-400 text-sm w-20 text-right">{location.percentage}%</span>
                      <span className="text-emerald-300 font-semibold w-16 text-right">{location.users} users</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Trivia Tab */}
          {activeTab === 'trivia' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-emerald-300">🧠 Trivia Game Management</h2>

              {/* Trivia Sub-Tabs */}
              <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
                {[
                  { id: 'overview', label: '📈 Overview' },
                  { id: 'categories', label: '📁 Categories' },
                  { id: 'questions', label: '❓ Questions' },
                  { id: 'generate', label: '🤖 Generate AI' },
                ].map((subtab) => (
                  <button
                    key={subtab.id}
                    onClick={() => setTriviaSubTab(subtab.id as any)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap text-sm ${
                      triviaSubTab === subtab.id
                        ? 'bg-emerald-500/30 border border-emerald-400 text-emerald-300'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-white/5 border border-emerald-500/20'
                    }`}
                  >
                    {subtab.label}
                  </button>
                ))}
              </div>

              {/* Overview Sub-Tab */}
              {triviaSubTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-xl backdrop-blur-sm bg-white/5 border border-emerald-500/30">
                  <h3 className="text-xl font-bold text-emerald-300 mb-4">📊 Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Games Played:</span>
                      <span className="text-white font-bold">3,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Active Players:</span>
                      <span className="text-white font-bold">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Favorite Category:</span>
                      <span className="text-white font-bold">Crypto 💰</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Average Difficulty:</span>
                      <span className="text-white font-bold">Medium</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl backdrop-blur-sm bg-white/5 border border-emerald-500/30">
                  <h3 className="text-xl font-bold text-emerald-300 mb-4">🎯 Rewards Distributed</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Crypto Distributed:</span>
                      <span className="text-green-400 font-bold">12,450 SOL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">NFT Assigned:</span>
                      <span className="text-cyan-400 font-bold">234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Winning Match:</span>
                      <span className="text-white font-bold">+500 SOL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Average Win Rate:</span>
                      <span className="text-white font-bold">23.4%</span>
                    </div>
                  </div>
                </div>
              </div>
              )}

              {/* Categories Sub-Tab */}
              {triviaSubTab === 'categories' && (
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-emerald-300">📁 Manage Categories</h3>
                  <button
                    onClick={() => setShowAddCategory(!showAddCategory)}
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold hover:shadow-lg transition"
                  >
                    {showAddCategory ? '✕ Cancel' : '+ New Category'}
                  </button>
                </div>
              )}

              {triviaSubTab === 'categories' && showAddCategory && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-xl bg-white/5 border border-emerald-500/30 mb-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Category name"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="px-4 py-3 rounded-lg bg-white/10 border border-emerald-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
                    />
                    <input
                      type="text"
                      placeholder="Emoji (e.g: 💰)"
                      value={newCategoryIcon}
                      onChange={(e) => setNewCategoryIcon(e.target.value)}
                      className="px-4 py-3 rounded-lg bg-white/10 border border-emerald-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
                    />
                    <button
                      onClick={handleAddCategory}
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold hover:shadow-lg transition"
                    >
                      ✓ Create
                    </button>
                  </div>
                </motion.div>
              )}

              {triviaSubTab === 'categories' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category, idx) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br ${category.color}/20 border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl">{category.icon}</div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCategory(category.id);
                          }}
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          🗑️
                        </button>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-400">📝 {category.questionCount} questions</p>
                        <p className="text-gray-400">📅 {category.createdAt}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Questions Sub-Tab */}
              {triviaSubTab === 'questions' && (
                <>
                  <h3 className="text-2xl font-bold mb-8 text-emerald-300">❓ Manage Questions</h3>
                  {questions.length > 0 ? (
                    <div className="space-y-6">
                      {questions.map((question, idx) => (
                        <div key={idx} className="p-6 rounded-xl bg-white/5 border border-emerald-500/30">
                          <h3 className="text-lg font-bold text-white mb-4">{question.question}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {question.answers.map((answer, ansIdx) => (
                              <div
                                key={ansIdx}
                                className={`p-3 rounded-lg ${
                                  ansIdx === question.correctAnswer
                                    ? 'bg-green-500/30 border border-green-500 text-green-300'
                                    : 'bg-white/5 border border-gray-500/30 text-gray-300'
                                }`}
                              >
                                <span className="font-semibold">{String.fromCharCode(65 + ansIdx)}:</span> {answer}
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              question.difficulty === 'Easy' ? 'bg-green-500/30 text-green-300' :
                              question.difficulty === 'Medium' ? 'bg-yellow-500/30 text-yellow-300' :
                              'bg-red-500/30 text-red-300'
                            }`}>
                              {question.difficulty}
                            </span>
                            <button className="text-red-400 hover:text-red-300 transition">🗑️ Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-400 text-lg">No questions. Generate questions with AI!</p>
                    </div>
                  )}
                </>
              )}

              {/* Generate Sub-Tab */}
              {triviaSubTab === 'generate' && (
                <>
                  <h3 className="text-2xl font-bold mb-8 text-emerald-300">🤖 Generate Questions with AI</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="col-span-1">
                      <h4 className="text-xl font-bold text-white mb-4">Available Categories</h4>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full text-left p-4 rounded-lg transition-all ${
                              selectedCategory === category.id
                                ? 'bg-emerald-500/30 border border-emerald-400 text-emerald-300'
                                : 'bg-white/5 border border-gray-500/30 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            <span className="text-2xl">{category.icon}</span> {category.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="col-span-1 lg:col-span-2">
                      <div className="p-8 rounded-xl backdrop-blur-sm bg-white/5 border border-emerald-500/30">
                        <h4 className="text-xl font-bold text-white mb-6">Automatic Generation</h4>

                        {selectedCategory && (
                          <>
                            <p className="text-gray-400 mb-6">
                              Selected category: <span className="text-emerald-300 font-semibold">
                                {categories.find(c => c.id === selectedCategory)?.name}
                              </span>
                            </p>

                            <button
                              onClick={handleGenerateQuestions}
                              disabled={aiGenerating}
                              className="w-full py-4 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-emerald-500/50 transition disabled:opacity-50"
                            >
                              {aiGenerating ? '⏳ Generating...' : '🤖 Generate 3 Questions with AI'}
                            </button>

                            <p className="text-gray-400 text-sm mt-6">
                              💡 AI will automatically generate 3 questions for the selected category with varied difficulty and multiple answers.
                            </p>
                          </>
                        )}

                        {!selectedCategory && (
                          <div className="text-center py-12">
                            <p className="text-gray-400 text-lg">Select a category on the left</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* NFT Tab */}
          {activeTab === 'nft' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-emerald-300">🎨 NFT Collection Management</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-xl backdrop-blur-sm bg-white/5 border border-emerald-500/30">
                  <h3 className="text-xl font-bold text-emerald-300 mb-4">💎 NFT Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total NFTs:</span>
                      <span className="text-white font-bold">5,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">In Circulation:</span>
                      <span className="text-cyan-400 font-bold">3,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Floor Price:</span>
                      <span className="text-white font-bold">2.5 SOL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">24h Volume:</span>
                      <span className="text-green-400 font-bold">145.2 SOL</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl backdrop-blur-sm bg-white/5 border border-emerald-500/30">
                  <h3 className="text-xl font-bold text-emerald-300 mb-4">📈 Marketplace</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Active Listings:</span>
                      <span className="text-white font-bold">456</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Offers Received:</span>
                      <span className="text-white font-bold">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Completed Trades:</span>
                      <span className="text-white font-bold">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Royalties Earned:</span>
                      <span className="text-yellow-400 font-bold">234.5 SOL</span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold hover:shadow-lg transition">
                ➕ Mint New NFTs
              </button>
            </motion.div>
          )}

          {/* Wallet Tab */}
          {activeTab === 'wallet' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-emerald-300">💳 Wallet Management</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br from-yellow-500/20 to-orange-600/20 border border-emerald-500/30">
                  <h3 className="text-lg font-bold text-white mb-2">SOL Wallet</h3>
                  <p className="text-gray-400 text-sm mb-3">Current Balance</p>
                  <p className="text-3xl font-bold text-yellow-400 mb-3">2,450.75 SOL</p>
                  <p className="text-xs text-gray-400">≈ $245,075 USD</p>
                </div>

                <div className="p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-emerald-500/30">
                  <h3 className="text-lg font-bold text-white mb-2">Ethereum Wallet</h3>
                  <p className="text-gray-400 text-sm mb-3">Current Balance</p>
                  <p className="text-3xl font-bold text-blue-400 mb-3">15.32 ETH</p>
                  <p className="text-xs text-gray-400">≈ $45,960 USD</p>
                </div>

                <div className="p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-emerald-500/30">
                  <h3 className="text-lg font-bold text-white mb-2">Bitcoin Wallet</h3>
                  <p className="text-gray-400 text-sm mb-3">Current Balance</p>
                  <p className="text-3xl font-bold text-orange-400 mb-3">0.45 BTC</p>
                  <p className="text-xs text-gray-400">≈ $18,900 USD</p>
                </div>

                <div className="p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-emerald-500/30">
                  <h3 className="text-lg font-bold text-white mb-2">USDC Stablecoin</h3>
                  <p className="text-gray-400 text-sm mb-3">Current Balance</p>
                  <p className="text-3xl font-bold text-purple-400 mb-3">50,000 USDC</p>
                  <p className="text-xs text-gray-400">≈ $50,000 USD</p>
                </div>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/5 border border-emerald-500/30 mb-8">
                <h3 className="text-xl font-bold text-emerald-300 mb-4">🔐 Recent Transactions</h3>
                <div className="space-y-3">
                  {[
                    { type: 'Withdrawal', amount: '-500 SOL', status: 'Completed', time: '2 hours ago' },
                    { type: 'Deposit', amount: '+1000 USDC', status: 'Completed', time: '5 hours ago' },
                    { type: 'Transfer', amount: '-2.5 ETH', status: 'Pending', time: '10 minutes ago' },
                  ].map((tx, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-emerald-500/20">
                      <div>
                        <p className="text-white font-semibold">{tx.type}</p>
                        <p className="text-gray-400 text-sm">{tx.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{tx.amount}</p>
                        <p className={`text-sm ${tx.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>{tx.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-emerald-300">📊 Panoramica</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  { label: 'Categorie Totali', value: categories.length, icon: '📁', color: 'from-blue-500 to-cyan-600' },
                  { label: 'Domande Totali', value: categories.reduce((acc, cat) => acc + cat.questionCount, 0), icon: '❓', color: 'from-purple-500 to-pink-600' },
                  { label: 'Utenti Attivi', value: '234', icon: '👥', color: 'from-green-500 to-emerald-600' },
                  { label: 'Partite Giocate', value: '1,456', icon: '🎮', color: 'from-yellow-500 to-orange-600' },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br ${stat.color}/20 border border-emerald-500/30`}
                  >
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="p-6 rounded-xl backdrop-blur-sm bg-white/5 border border-emerald-500/30">
                <h3 className="text-xl font-bold text-emerald-300 mb-4">📋 Attività Recente</h3>
                <div className="space-y-3">
                  {['Nuovo utente registrato: john_doe', 'Partita completata: Game #4521', 'NFT scambiato: Barrel #015', 'Admin ha aggiunto 5 domande'].map((activity, idx) => (
                    <div key={idx} className="flex items-center space-x-3 text-gray-300">
                      <span className="text-green-400">✓</span>
                      <span>{activity}</span>
                      <span className="ml-auto text-gray-500 text-sm">ora</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </section>

      </div>
    </LayoutWrapper>
    <Footer />
    </>
  );
};

export default AdminDashboard;
