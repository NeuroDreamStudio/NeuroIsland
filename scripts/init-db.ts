#!/usr/bin/env node

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const initScriptPath = path.join(__dirname, '..', 'database', 'init.sql');
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL non definito in .env');
  process.exit(1);
}

console.log('🚀 Inizializzazione database NeuroIsland...');
console.log('📍 Host:', process.env.DB_HOST);
console.log('📍 Database:', process.env.DB_NAME);

try {
  // Leggi il file SQL
  const sqlContent = fs.readFileSync(initScriptPath, 'utf-8');

  // Esegui il file SQL
  console.log('\n⏳ Esecuzione schema del database...');
  
  execSync(
    `psql "${databaseUrl}" -f "${initScriptPath}"`,
    { stdio: 'inherit' }
  );

  console.log('\n✅ Database inizializzato con successo!');
  console.log('\n📊 Tabelle create:');
  console.log('  ✓ users');
  console.log('  ✓ user_wallets');
  console.log('  ✓ trivia_categories');
  console.log('  ✓ trivia_questions');
  console.log('  ✓ trivia_user_answers');
  console.log('  ✓ nft_collections');
  console.log('  ✓ transactions');

  console.log('\n🔐 Credenziali Admin:');
  console.log('  Username: admin');
  console.log('  Password: admin123');
  console.log('  Email: admin@neuroisland.com');

  console.log('\n💾 Database è pronto per NeuroIsland!');

} catch (error) {
  console.error('\n❌ Errore durante l\'inizializzazione del database:');
  console.error(error.message);
  process.exit(1);
}
