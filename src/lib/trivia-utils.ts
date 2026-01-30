// Utility per generare domande con IA (simulato)
export const generateQuestionsWithAI = async (
  category: string,
  difficulty: 'Facile' | 'Medio' | 'Difficile',
  count: number = 3
) => {
  // Simulazione generazione IA
  // In produzione, collegare a API come OpenAI, Anthropic, etc.
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const questions = Array.from({ length: count }, (_, i) => ({
        id: `${Date.now()}-${i}`,
        category,
        difficulty,
        question: `Domanda generata IA #${i + 1} per ${category}?`,
        answers: [
          'Risposta generata A',
          'Risposta generata B',
          'Risposta generata C',
          'Risposta generata D',
        ],
        correctAnswer: Math.floor(Math.random() * 4),
      }));
      resolve(questions);
    }, 2000);
  });
};

// Utility per calcolare punteggio
export const calculateScore = (
  totalQuestions: number,
  correctAnswers: number
): {
  percentage: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  feedback: string;
} => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  let grade: 'A' | 'B' | 'C' | 'D' | 'F';
  let feedback: string;

  if (percentage >= 90) {
    grade = 'A';
    feedback = '🎉 Straordinario! Sei un vero esperto!';
  } else if (percentage >= 80) {
    grade = 'B';
    feedback = '😊 Ottimo lavoro! Bravissimo!';
  } else if (percentage >= 70) {
    grade = 'C';
    feedback = '👍 Non male! Continua a giocare!';
  } else if (percentage >= 60) {
    grade = 'D';
    feedback = '📚 Puoi fare di meglio. Studia e riprova!';
  } else {
    grade = 'F';
    feedback = '💪 Non mollare! Impara e torna a giocare!';
  }

  return { percentage, grade, feedback };
};

// Utility per calcolare reward
export const calculateReward = (
  difficulty: 'Facile' | 'Medio' | 'Difficile',
  correct: boolean
): number => {
  const rewards: Record<string, number> = {
    'Facile': 0.01,
    'Medio': 0.02,
    'Difficile': 0.05,
  };
  return correct ? rewards[difficulty] : 0;
};

// Utility per randomizzare domande
export const shuffleQuestions = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Utility per randomizzare risposte
export const shuffleAnswers = (
  answers: string[],
  correctIndex: number
): { answers: string[]; correctIndex: number } => {
  const withIndices = answers.map((answer, index) => ({
    answer,
    originalIndex: index,
  }));

  // Shuffle
  for (let i = withIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [withIndices[i], withIndices[j]] = [withIndices[j], withIndices[i]];
  }

  // Trova nuovo indice della risposta corretta
  const newCorrectIndex = withIndices.findIndex(
    (item) => item.originalIndex === correctIndex
  );

  return {
    answers: withIndices.map((item) => item.answer),
    correctIndex: newCorrectIndex,
  };
};

// Utility per salvataggio progresso
export const saveGameProgress = (
  categoryId: string,
  questionId: string,
  isCorrect: boolean,
  reward: number
) => {
  const progress = JSON.parse(localStorage.getItem('gameProgress') || '{}');
  
  if (!progress[categoryId]) {
    progress[categoryId] = {
      questionsAnswered: [],
      totalCorrect: 0,
      totalReward: 0,
    };
  }

  progress[categoryId].questionsAnswered.push({
    questionId,
    isCorrect,
    reward,
    timestamp: Date.now(),
  });

  if (isCorrect) {
    progress[categoryId].totalCorrect++;
  }

  progress[categoryId].totalReward += reward;

  localStorage.setItem('gameProgress', JSON.stringify(progress));
  return progress[categoryId];
};

// Utility per leggere progresso
export const getGameProgress = (categoryId?: string) => {
  const progress = JSON.parse(localStorage.getItem('gameProgress') || '{}');
  
  if (categoryId) {
    return progress[categoryId] || null;
  }

  return progress;
};

// Utility per calcolare statistiche
export const getStatistics = () => {
  const progress = getGameProgress();
  
  const stats = {
    totalGamesPlayed: 0,
    totalCorrectAnswers: 0,
    totalReward: 0,
    categoryStats: {} as Record<string, any>,
  };

  Object.entries(progress).forEach(([categoryId, data]: [string, any]) => {
    stats.totalGamesPlayed += data.questionsAnswered.length;
    stats.totalCorrectAnswers += data.totalCorrect;
    stats.totalReward += data.totalReward;

    stats.categoryStats[categoryId] = {
      gamesPlayed: data.questionsAnswered.length,
      correctAnswers: data.totalCorrect,
      percentage: Math.round(
        (data.totalCorrect / data.questionsAnswered.length) * 100
      ),
      reward: data.totalReward,
    };
  });

  return stats;
};
