-- NeuroIsland Database Schema
-- PostgreSQL Database Initialization Script

-- ============================================
-- DROP EXISTING TABLES (Reset)
-- ============================================
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS trivia_user_answers CASCADE;
DROP TABLE IF EXISTS trivia_questions CASCADE;
DROP TABLE IF EXISTS trivia_categories CASCADE;
DROP TABLE IF EXISTS nft_collections CASCADE;
DROP TABLE IF EXISTS user_wallets CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(255),
  avatar_url VARCHAR(500),
  bio TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  is_moderator BOOLEAN DEFAULT FALSE,
  total_earnings DECIMAL(18, 8) DEFAULT 0,
  total_games_played INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

-- ============================================
-- USER WALLETS TABLE
-- ============================================
CREATE TABLE user_wallets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  chain VARCHAR(50) NOT NULL, -- 'Solana', 'Ethereum', 'Cronos'
  wallet_address VARCHAR(255) NOT NULL,
  is_connected BOOLEAN DEFAULT TRUE,
  balance DECIMAL(18, 8) DEFAULT 0,
  last_synced TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, chain, wallet_address)
);

-- ============================================
-- TRIVIA CATEGORIES TABLE
-- ============================================
CREATE TABLE trivia_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(10),
  color VARCHAR(50),
  question_count INTEGER DEFAULT 0,
  difficulty_level VARCHAR(50) DEFAULT 'Mixed', -- 'Facile', 'Medio', 'Difficile', 'Mixed'
  created_by INTEGER REFERENCES users(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TRIVIA QUESTIONS TABLE
-- ============================================
CREATE TABLE trivia_questions (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES trivia_categories(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer_a VARCHAR(500) NOT NULL,
  answer_b VARCHAR(500) NOT NULL,
  answer_c VARCHAR(500) NOT NULL,
  answer_d VARCHAR(500) NOT NULL,
  correct_answer CHAR(1) CHECK (correct_answer IN ('a', 'b', 'c', 'd')),
  difficulty VARCHAR(50) NOT NULL, -- 'Facile', 'Medio', 'Difficile'
  reward_amount DECIMAL(10, 4) NOT NULL, -- in SOL
  explanation VARCHAR(1000),
  created_by INTEGER REFERENCES users(id),
  is_active BOOLEAN DEFAULT TRUE,
  view_count INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TRIVIA USER ANSWERS TABLE
-- ============================================
CREATE TABLE trivia_user_answers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL REFERENCES trivia_questions(id) ON DELETE CASCADE,
  category_id INTEGER NOT NULL REFERENCES trivia_categories(id) ON DELETE CASCADE,
  user_answer CHAR(1),
  is_correct BOOLEAN DEFAULT FALSE,
  reward_earned DECIMAL(10, 4) DEFAULT 0,
  time_taken_seconds INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- NFT COLLECTIONS TABLE
-- ============================================
CREATE TABLE nft_collections (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  collection_symbol VARCHAR(20),
  contract_address VARCHAR(255) NOT NULL UNIQUE,
  chain VARCHAR(50) NOT NULL, -- 'Solana', 'Ethereum', 'Cronos'
  floor_price DECIMAL(18, 8),
  total_volume DECIMAL(18, 8) DEFAULT 0,
  holders_count INTEGER DEFAULT 0,
  items_count INTEGER DEFAULT 0,
  rarity_ranks JSON, -- Store rarity information as JSON
  created_by INTEGER REFERENCES users(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TRANSACTIONS TABLE
-- ============================================
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tx_type VARCHAR(50) NOT NULL, -- 'reward', 'purchase', 'transfer', 'stake'
  chain VARCHAR(50) NOT NULL,
  from_address VARCHAR(255),
  to_address VARCHAR(255),
  amount DECIMAL(18, 8) NOT NULL,
  token_symbol VARCHAR(20),
  tx_hash VARCHAR(255) UNIQUE,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'failed'
  game_id INTEGER,
  question_id INTEGER REFERENCES trivia_questions(id),
  nft_id INTEGER REFERENCES nft_collections(id),
  gas_fee DECIMAL(18, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  confirmed_at TIMESTAMP
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_is_admin ON users(is_admin);

CREATE INDEX idx_user_wallets_user_id ON user_wallets(user_id);
CREATE INDEX idx_user_wallets_chain ON user_wallets(chain);
CREATE INDEX idx_user_wallets_address ON user_wallets(wallet_address);

CREATE INDEX idx_trivia_categories_name ON trivia_categories(name);
CREATE INDEX idx_trivia_categories_active ON trivia_categories(is_active);

CREATE INDEX idx_trivia_questions_category ON trivia_questions(category_id);
CREATE INDEX idx_trivia_questions_difficulty ON trivia_questions(difficulty);
CREATE INDEX idx_trivia_questions_active ON trivia_questions(is_active);

CREATE INDEX idx_trivia_user_answers_user ON trivia_user_answers(user_id);
CREATE INDEX idx_trivia_user_answers_question ON trivia_user_answers(question_id);
CREATE INDEX idx_trivia_user_answers_category ON trivia_user_answers(category_id);
CREATE INDEX idx_trivia_user_answers_created ON trivia_user_answers(created_at);

CREATE INDEX idx_nft_collections_chain ON nft_collections(chain);
CREATE INDEX idx_nft_collections_address ON nft_collections(contract_address);
CREATE INDEX idx_nft_collections_active ON nft_collections(is_active);

CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_transactions_chain ON transactions(chain);
CREATE INDEX idx_transactions_type ON transactions(tx_type);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_created ON transactions(created_at);
CREATE INDEX idx_transactions_hash ON transactions(tx_hash);

-- ============================================
-- INSERT INITIAL DATA
-- ============================================

-- Insert admin user
INSERT INTO users (username, email, password_hash, display_name, is_admin, is_moderator) VALUES
('admin', 'admin@neuroisland.com', '$2b$10$YIIIc/UlVXmGb3KBbZb3O.Hy0KvHc7k5x0Z9cUqY8W7h4E5J5kWz2', 'Admin NeuroIsland', TRUE, TRUE),
('moderator', 'mod@neuroisland.com', '$2b$10$YIIIc/UlVXmGb3KBbZb3O.Hy0KvHc7k5x0Z9cUqY8W7h4E5J5kWz2', 'Moderator', FALSE, TRUE);

-- Insert default trivia categories
INSERT INTO trivia_categories (name, icon, color, difficulty_level, created_by) VALUES
('Criptovalute', '💰', 'from-yellow-500 to-orange-600', 'Mixed', 1),
('NFT', '🎨', 'from-pink-500 to-rose-600', 'Mixed', 1),
('Gaming', '🎮', 'from-blue-500 to-cyan-600', 'Mixed', 1),
('Web3', '🔗', 'from-purple-500 to-pink-600', 'Mixed', 1),
('Blockchain', '⛓️', 'from-green-500 to-emerald-600', 'Mixed', 1);

-- Insert sample trivia questions for Criptovalute
INSERT INTO trivia_questions (category_id, question, answer_a, answer_b, answer_c, answer_d, correct_answer, difficulty, reward_amount, created_by) VALUES
(1, 'Quale blockchain è stata lanciata per prima?', 'Bitcoin', 'Ethereum', 'Solana', 'Cardano', 'a', 'Facile', 0.01, 1),
(1, 'Chi ha creato Ethereum?', 'Satoshi Nakamoto', 'Vitalik Buterin', 'Charlie Lee', 'Craig Wright', 'b', 'Facile', 0.01, 1),
(1, 'Cosa significa HODL nel crypto?', 'Hold On for Dear Life', 'High Order Database Link', 'Huge Online Digital Lab', 'None', 'a', 'Difficile', 0.05, 1),
(1, 'Quanti Bitcoin verranno creati in totale?', '10 Milioni', '20 Milioni', '21 Milioni', 'Illimitati', 'c', 'Medio', 0.02, 1);

-- Insert sample trivia questions for NFT
INSERT INTO trivia_questions (category_id, question, answer_a, answer_b, answer_c, answer_d, correct_answer, difficulty, reward_amount, created_by) VALUES
(2, 'Che cosa significa NFT?', 'Non-Fungible Token', 'New Financial Token', 'Network File Transfer', 'None of the above', 'a', 'Facile', 0.005, 1),
(2, 'Qual è la blockchain più popolare per gli NFT?', 'Bitcoin', 'Ethereum', 'Dogecoin', 'Ripple', 'b', 'Medio', 0.02, 1),
(2, 'In quale anno è esploso il mercato degli NFT?', '2020', '2021', '2022', '2023', 'b', 'Medio', 0.02, 1);

-- Insert sample NFT collection (Neuro in the Barrel 3D)
INSERT INTO nft_collections (name, description, contract_address, chain, floor_price, items_count, created_by) VALUES
('Neuro in the Barrel 3D', 'Collezione esclusiva di NFT 3D caraibici', '0x123456789abcdef', 'Ethereum', 25.5, 100, 1);

-- ============================================
-- FUNCTIONS FOR AUTOMATIC TIMESTAMP UPDATE
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE
  ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trivia_categories_updated_at BEFORE UPDATE
  ON trivia_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trivia_questions_updated_at BEFORE UPDATE
  ON trivia_questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_nft_collections_updated_at BEFORE UPDATE
  ON nft_collections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE
  ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DATABASE INITIALIZATION COMPLETE
-- ============================================
-- Database is now ready for NeuroIsland
-- Default Admin Credentials:
-- Username: admin
-- Password: admin123
-- Email: admin@neuroisland.com
