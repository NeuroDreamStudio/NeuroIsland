# 🗄️ Database Setup & Reset Guide

## Database Neon PostgreSQL

**Host**: `ep-sweet-firefly-aer8c7lh-pooler.c-2.us-east-2.aws.neon.tech`  
**Porta**: `5432`  
**Database**: `neondb`  
**User**: `neondb_owner`  
**Password**: `npg_Yg7MDbAa5xqX`

## 1️⃣ RESET COMPLETO del Database

Se vuoi **resettare completamente il database** (elimina tutti i dati e ricrea le tabelle):

### Metodo A: Usando psql

```bash
# Connettiti al database
psql 'postgresql://neondb_owner:npg_Yg7MDbAa5xqX@ep-sweet-firefly-aer8c7lh-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require'

# Esegui lo script di reset
\i database/init.sql

# Oppure usando il comando diretto
psql 'postgresql://neondb_owner:npg_Yg7MDbAa5xqX@ep-sweet-firefly-aer8c7lh-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require' < database/init.sql
```

### Metodo B: Dashboard Neon Web

1. Accedi a https://console.neon.tech/
2. Seleziona il progetto `neondb`
3. Vai su "SQL Editor"
4. Copia e incolla il contenuto di `database/init.sql`
5. Esegui la query

## 2️⃣ Verifica Reset

Dopo il reset, verifica che le tabelle siano state create:

```bash
psql 'postgresql://neondb_owner:npg_Yg7MDbAa5xqX@ep-sweet-firefly-aer8c7lh-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require'

# Nel prompt psql, esegui:
\dt              # Mostra tutte le tabelle

# Dovresti vedere:
# - users
# - user_wallets
# - trivia_categories
# - trivia_questions
# - trivia_user_answers
# - nft_collections
# - transactions

# Visualizza il contenuto di una tabella
SELECT * FROM users;          # Dovresti vedere admin e moderator
SELECT * FROM trivia_categories;  # Dovresti vedere 5 categorie
SELECT * FROM trivia_questions;   # Dovresti vedere domande di esempio
```

## 3️⃣ Dati Iniziali Creati

Il reset include automaticamente:

### Utenti
- **admin** / `admin123` (admin@neuroisland.com)
- **moderator** / `admin123` (mod@neuroisland.com)

### Categorie Trivia
1. Criptovalute (💰)
2. NFT (🎨)
3. Gaming (🎮)
4. Web3 (🔗)
5. Blockchain (⛓️)

### Domande di Esempio
- 4 domande per **Criptovalute**
- 3 domande per **NFT**

### Collezione NFT
- "Neuro in the Barrel 3D" su Ethereum

## 4️⃣ Connessione da Node.js

Nel tuo codice Next.js:

```typescript
import { query } from '@/lib/db';

// Eseguire una query
const result = await query('SELECT * FROM users');
console.log(result.rows);

// Creare un utente
const newUser = await query(
  'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
  ['testuser', 'test@example.com', 'hash']
);
```

## 5️⃣ Backup Database

Per fare backup del database:

```bash
# Dump completo
pg_dump 'postgresql://neondb_owner:npg_Yg7MDbAa5xqX@ep-sweet-firefly-aer8c7lh-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require' > backup.sql

# Solo dati (senza schema)
pg_dump -a 'postgresql://neondb_owner:npg_Yg7MDbAa5xqX@ep-sweet-firefly-aer8c7lh-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require' > backup_data.sql
```

## 6️⃣ Restore da Backup

```bash
psql 'postgresql://neondb_owner:npg_Yg7MDbAa5xqX@ep-sweet-firefly-aer8c7lh-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require' < backup.sql
```

## 7️⃣ Aggiungere Dati Manuali

### Aggiungere una Categoria Trivia

```sql
INSERT INTO trivia_categories (name, icon, color, difficulty_level, created_by)
VALUES ('Storia', '📚', 'from-red-500 to-pink-600', 'Mixed', 1);
```

### Aggiungere una Domanda

```sql
INSERT INTO trivia_questions 
(category_id, question, answer_a, answer_b, answer_c, answer_d, correct_answer, difficulty, reward_amount, created_by)
VALUES 
(1, 'Quando è stato creato Bitcoin?', '2008', '2009', '2010', '2011', 'b', 'Facile', 0.01, 1);
```

### Aggiungere un Utente

```sql
INSERT INTO users (username, email, password_hash, display_name, is_admin)
VALUES ('newuser', 'new@example.com', 'hashed_password', 'New User', FALSE);
```

## 🔧 Troubleshooting

### Errore: "password authentication failed"
- Verifica le credenziali nel `.env.local`
- Assicurati che il database sia raggiungibile

### Errore: "relation does not exist"
- Esegui `database/init.sql` per creare le tabelle
- Verifica che le tabelle esistano: `\dt`

### Errore: "SSL certificate verification failed"
- Le connessioni a Neon richiedono SSL
- Usa `sslmode=require` nella connection string

### Query lenta
- Verifica che gli indici siano stati creati
- Usa `EXPLAIN ANALYZE` per analizzare le query

## 📊 Monitoring

### Visualizzare la dimensione del database

```sql
SELECT pg_size_pretty(pg_database_size('neondb'));
```

### Visualizzare le connessioni attive

```sql
SELECT pid, usename, application_name, state FROM pg_stat_activity;
```

### Controllare i log

Accedi al dashboard Neon e visualizza i log della console.

## ✅ Checklist Setup

- [ ] Database Neon creato
- [ ] Credenziali nel `.env.local`
- [ ] Script `database/init.sql` eseguito
- [ ] Tabelle verificate con `\dt`
- [ ] Dati di esempio visibili
- [ ] Connessione da Node.js funzionante
- [ ] Admin login funzionante

---

**Database NeuroIsland Pronto! 🚀**
