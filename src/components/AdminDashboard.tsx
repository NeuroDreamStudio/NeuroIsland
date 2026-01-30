import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
  const [activeTab, setActiveTab] = useState<'overview' | 'categories' | 'questions' | 'generate'>('overview');
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
    <div className="min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900" />
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" />
      </div>

      {/* Header */}
      <header className="relative z-50 backdrop-blur-md bg-black/30 border-b border-emerald-500/30 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            ⚙️ Admin Dashboard
          </h1>
          <Link href="/">
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 hover:shadow-lg transition cursor-pointer text-white font-semibold">
              🚪 Logout
            </button>
          </Link>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="relative z-40 backdrop-blur-sm bg-black/20 border-b border-emerald-500/20 sticky top-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-4">
            {[
              { id: 'overview', label: '📊 Overview', icon: '📈' },
              { id: 'categories', label: '📁 Categories', icon: '🍿' },
              { id: 'questions', label: '❓ Questions', icon: '📏' },
              { id: 'generate', label: '🤖 Generate AI', icon: '✨' },
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
      <section className="relative py-12 px-4">
        <div className="max-w-7xl mx-auto">
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

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-emerald-300">📁 Gestisci Categorie</h2>
                <button
                  onClick={() => setShowAddCategory(!showAddCategory)}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold hover:shadow-lg transition"
                >
                  {showAddCategory ? '✕ Annulla' : '+ Nuova Categoria'}
                </button>
              </div>

              {/* Add Category Form */}
              {showAddCategory && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-xl bg-white/5 border border-emerald-500/30 mb-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Nome categoria"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="px-4 py-3 rounded-lg bg-white/10 border border-emerald-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
                    />
                    <input
                      type="text"
                      placeholder="Emoji (es: 💰)"
                      value={newCategoryIcon}
                      onChange={(e) => setNewCategoryIcon(e.target.value)}
                      className="px-4 py-3 rounded-lg bg-white/10 border border-emerald-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
                    />
                    <button
                      onClick={handleAddCategory}
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold hover:shadow-lg transition"
                    >
                      ✓ Crea
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Categories Grid */}
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
                      <p className="text-gray-400">📝 {category.questionCount} domande</p>
                      <p className="text-gray-400">📅 {category.createdAt}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Questions Tab */}
          {activeTab === 'questions' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-emerald-300">❓ Gestisci Domande</h2>

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
                          question.difficulty === 'Facile' ? 'bg-green-500/30 text-green-300' :
                          question.difficulty === 'Medio' ? 'bg-yellow-500/30 text-yellow-300' :
                          'bg-red-500/30 text-red-300'
                        }`}>
                          {question.difficulty}
                        </span>
                        <button className="text-red-400 hover:text-red-300 transition">🗑️ Elimina</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">Nessuna domanda. Genera domande con l'IA!</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Generate IA Tab */}
          {activeTab === 'generate' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-emerald-300">🤖 Genera Domande con IA</h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar */}
                <div className="col-span-1">
                  <h3 className="text-xl font-bold text-white mb-4">Categorie Disponibili</h3>
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

                {/* Main Content */}
                <div className="col-span-1 lg:col-span-2">
                  <div className="p-8 rounded-xl backdrop-blur-sm bg-white/5 border border-emerald-500/30">
                    <h3 className="text-xl font-bold text-white mb-6">Generazione Automatica</h3>

                    {selectedCategory && (
                      <>
                        <p className="text-gray-400 mb-6">
                          Categoria selezionata: <span className="text-emerald-300 font-semibold">
                            {categories.find(c => c.id === selectedCategory)?.name}
                          </span>
                        </p>

                        <button
                          onClick={handleGenerateQuestions}
                          disabled={aiGenerating}
                          className="w-full py-4 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-emerald-500/50 transition disabled:opacity-50"
                        >
                          {aiGenerating ? '⏳ Generazione in corso...' : '🤖 Genera 3 Domande con IA'}
                        </button>

                        <p className="text-gray-400 text-sm mt-6">
                          💡 L'IA genererà automaticamente 3 domande sulla categoria scelta con difficoltà variegata e risposte multiple.
                        </p>
                      </>
                    )}

                    {!selectedCategory && (
                      <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">Seleziona una categoria a sinistra</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-emerald-500/20 backdrop-blur-sm bg-black/40 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-400">© 2026 NeuroIsland Admin Panel | v1.0.0</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
