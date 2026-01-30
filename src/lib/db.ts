import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const start = Date.now();
  try {
    const res = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', {
      text,
      duration,
      rows: res.rowCount,
    });
    return res;
  } catch (error) {
    console.error('Database query error', { text, params, error });
    throw error;
  }
}

export async function getUser(id: number) {
  const result = await query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

export async function getUserByUsername(username: string) {
  const result = await query(
    'SELECT * FROM users WHERE username = $1',
    [username]
  );
  return result.rows[0] || null;
}

export async function createUser(
  username: string,
  email: string,
  passwordHash: string,
  displayName?: string
) {
  const result = await query(
    `INSERT INTO users (username, email, password_hash, display_name)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [username, email, passwordHash, displayName || username]
  );
  return result.rows[0];
}

export async function updateUser(id: number, data: any) {
  const fields = Object.keys(data);
  const values = Object.values(data);
  const setClause = fields
    .map((field, idx) => `${field} = $${idx + 1}`)
    .join(', ');

  const result = await query(
    `UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP
     WHERE id = $${fields.length + 1}
     RETURNING *`,
    [...values, id]
  );
  return result.rows[0];
}

// Trivia Functions
export async function getTrivia Categories() {
  const result = await query(
    'SELECT * FROM trivia_categories WHERE is_active = true ORDER BY name'
  );
  return result.rows;
}

export async function getTriviaCategory(id: number) {
  const result = await query(
    'SELECT * FROM trivia_categories WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

export async function getTrivia Questions(categoryId: number, limit: number = 10) {
  const result = await query(
    `SELECT id, category_id, question, answer_a, answer_b, answer_c, answer_d,
            correct_answer, difficulty, reward_amount
     FROM trivia_questions
     WHERE category_id = $1 AND is_active = true
     ORDER BY RANDOM()
     LIMIT $2`,
    [categoryId, limit]
  );
  return result.rows;
}

export async function saveTriviaAnswer(
  userId: number,
  questionId: number,
  categoryId: number,
  userAnswer: string,
  isCorrect: boolean,
  rewardEarned: number,
  timeTaken: number
) {
  const result = await query(
    `INSERT INTO trivia_user_answers
     (user_id, question_id, category_id, user_answer, is_correct, reward_earned, time_taken_seconds)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [userId, questionId, categoryId, userAnswer, isCorrect, rewardEarned, timeTaken]
  );

  // Update user total earnings
  if (isCorrect) {
    await query(
      `UPDATE users
       SET total_earnings = total_earnings + $1
       WHERE id = $2`,
      [rewardEarned, userId]
    );
  }

  return result.rows[0];
}

// Wallet Functions
export async function addUserWallet(
  userId: number,
  chain: string,
  walletAddress: string,
  balance: number = 0
) {
  const result = await query(
    `INSERT INTO user_wallets (user_id, chain, wallet_address, balance)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (user_id, chain, wallet_address) DO UPDATE
     SET is_connected = true, balance = $4
     RETURNING *`,
    [userId, chain, walletAddress, balance]
  );
  return result.rows[0];
}

export async function getUserWallets(userId: number) {
  const result = await query(
    'SELECT * FROM user_wallets WHERE user_id = $1 AND is_connected = true',
    [userId]
  );
  return result.rows;
}

export async function updateWalletBalance(walletId: number, balance: number) {
  const result = await query(
    `UPDATE user_wallets
     SET balance = $1, last_synced = CURRENT_TIMESTAMP
     WHERE id = $2
     RETURNING *`,
    [balance, walletId]
  );
  return result.rows[0];
}

// Transaction Functions
export async function createTransaction(
  userId: number,
  txType: string,
  chain: string,
  toAddress: string,
  amount: number,
  tokenSymbol: string,
  gasFee?: number,
  txHash?: string
) {
  const result = await query(
    `INSERT INTO transactions
     (user_id, tx_type, chain, to_address, amount, token_symbol, gas_fee, tx_hash, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
     RETURNING *`,
    [userId, txType, chain, toAddress, amount, tokenSymbol, gasFee || 0, txHash]
  );
  return result.rows[0];
}

export async function confirmTransaction(transactionId: number, txHash: string) {
  const result = await query(
    `UPDATE transactions
     SET status = 'confirmed', tx_hash = $1, confirmed_at = CURRENT_TIMESTAMP
     WHERE id = $2
     RETURNING *`,
    [txHash, transactionId]
  );
  return result.rows[0];
}

export async function getUserTransactions(userId: number, limit: number = 50) {
  const result = await query(
    `SELECT * FROM transactions
     WHERE user_id = $1
     ORDER BY created_at DESC
     LIMIT $2`,
    [userId, limit]
  );
  return result.rows;
}

// Statistics Functions
export async function getUserStats(userId: number) {
  const result = await query(
    `SELECT
       COUNT(DISTINCT CASE WHEN is_correct = true THEN 1 END) as correct_answers,
       COUNT(*) as total_answers,
       SUM(reward_earned) as total_earned,
       AVG(time_taken_seconds) as avg_time
     FROM trivia_user_answers
     WHERE user_id = $1`,
    [userId]
  );
  return result.rows[0];
}

export async function getLeaderboard(limit: number = 100) {
  const result = await query(
    `SELECT u.id, u.username, u.display_name, u.avatar_url,
            SUM(tua.reward_earned) as total_earned,
            COUNT(DISTINCT CASE WHEN tua.is_correct = true THEN 1 END) as correct_answers,
            COUNT(*) as total_answers
     FROM users u
     LEFT JOIN trivia_user_answers tua ON u.id = tua.user_id
     WHERE u.username NOT IN ('admin', 'moderator')
     GROUP BY u.id, u.username, u.display_name, u.avatar_url
     ORDER BY total_earned DESC NULLS LAST
     LIMIT $1`,
    [limit]
  );
  return result.rows;
}

export default pool;
