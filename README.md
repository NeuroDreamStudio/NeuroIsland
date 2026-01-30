# 🏝️ NeuroIsland - NFT Gaming Hub

Benvenuto su **NeuroIsland**, l'hub definitivo per NFT, giochi online e divertimento ai Caraibi! 🌴✨

## 🎮 Caratteristiche Principali

- **🏠 Homepage**: Stile caraibico moderno, colorato e allegro con effetti 3D
- **🎨 NFT Island**: Galleria NFT "Neuro in the Barrel 3D" con showcase 3D
- **🧠 Neuro Trivia**: Gioco di trivia con 4 risposte, sistema di ricompense in crypto
- **💎 Wallet Hub**: Integrazione con Solana, Ethereum e Cronos Chain
- **⚙️ Admin Panel**: Pannello di controllo per gestire categorie trivia e generare domande con IA
- **🎨 Design**: Neon caraibico con animazioni fluide e effetti 3D

## 🚀 Installazione e Setup

### 1. Requisiti
- Node.js 16+
- npm o yarn
- PostgreSQL (Neon già configurato)

### 2. Setup Progetto

```bash
cd NeuroIsland
npm install
```

### 3. Variabili d'Ambiente

Il file `.env.example` contiene già le credenziali del database Neon:

```bash
cp .env.example .env.local
```

**Database Neon (Pre-configurato):**
```
DATABASE_URL=postgresql://neondb_owner:npg_Yg7MDbAa5xqX@ep-sweet-firefly-aer8c7lh-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
DB_HOST=ep-sweet-firefly-aer8c7lh-pooler.c-2.us-east-2.aws.neon.tech
DB_PORT=5432
DB_USER=neondb_owner
DB_PASSWORD=npg_Yg7MDbAa5xqX
DB_NAME=neondb
```

### 4. Inizializzazione Database

Esegui il file SQL per creare tutte le tabelle:

```bash
# Via psql
psql 'postgresql://neondb_owner:npg_Yg7MDbAa5xqX@ep-sweet-firefly-aer8c7lh-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require' < database/init.sql
```

Questo script:
- ✅ Resetta il database completamente
- ✅ Crea 7 tabelle principali
- ✅ Aggiunge indici per performance
- ✅ Inserisce dati di esempio
- ✅ Configura funzioni di auto-update

### 5. Avvia il Progetto

```bash
npm run dev
```

L'app sarà disponibile a `http://localhost:3000`

## 📁 Struttura Progetto

```
NeuroIsland/
├── src/
│   ├── components/          # Componenti React
│   │   ├── HomePage.tsx
│   │   ├── NFTIsland.tsx
│   │   ├── NeuroTrivia.tsx
│   │   ├── WalletIntegration.tsx
│   │   ├── AdminLogin.tsx
│   │   └── AdminDashboard.tsx
│   ├── pages/              # Pagine Next.js
│   │   ├── index.tsx       # Home
│   │   ├── nft-island.tsx
│   │   ├── neuro-trivia.tsx
│   │   ├── wallet.tsx
│   │   └── admin/
│   │       ├── login.tsx
│   │       └── dashboard.tsx
│   ├── lib/
│   │   ├── config.ts       # Configurazione globale
│   │   ├── db.ts           # Client PostgreSQL
│   │   ├── wallet-utils.ts # Utility wallet crypto
│   │   └── trivia-utils.ts # Utility gioco trivia
│   └── styles/
│       └── globals.css     # Stili con effetti neon
├── database/
│   └── init.sql           # Schema database PostgreSQL
├── public/                # Assets statici
└── package.json
```

## 🎮 Pagine e Funzionalità

### 1. **Homepage** (`/`)
- Benvenuto caraibico con animazioni
- 4 pulsanti 3D colorati:
  - 🎨 NFT Island
  - 🧠 Neuro Trivia
  - 💎 Wallet Hub
  - ⚙️ Admin Panel
- Footer con social e info

### 2. **NFT Island** (`/nft-island`)
- Galleria NFT "Neuro in the Barrel 3D"
- Filtri per blockchain (Solana, Ethereum, Cronos)
- Card NFT con rarità e prezzo
- Modal dettagli e acquisto

### 3. **Neuro Trivia** (`/neuro-trivia`)
- 🎯 Selezione categoria (5 categorie disponibili)
- ❓ Domande con 4 risposte multiple
- 💰 Guadagna SOL rispondendo correttamente:
  - Facile: 0.01 SOL
  - Medio: 0.02 SOL
  - Difficile: 0.05 SOL
- 📊 Statistiche finali con percentuale

### 4. **Wallet Hub** (`/wallet`)
- 🔗 Connessione wallet multi-chain:
  - Solana (◎)
  - Ethereum (Ξ)
  - Cronos (₪)
- 💸 Invio criptovalute
- 📊 Saldo in tempo reale
- 📝 Storico transazioni

### 5. **Admin Panel** (`/admin`)

#### Login (`/admin/login`)
- Credenziali protette
- Default: `admin` / `admin123`

#### Dashboard (`/admin/dashboard`)
- 📊 **Overview**: Statistiche globali
- 📁 **Categorie**: Crea, modifica, elimina categorie
- ❓ **Domande**: Visualizza e gestisci domande
- 🤖 **Genera IA**: Genera 3 domande automatiche per categoria

## 🔐 Credenziali Default

```
Admin:
  Username: admin
  Password: admin123
  Email: admin@neuroisland.com

Moderator:
  Username: moderator
  Password: admin123
  Email: mod@neuroisland.com
```

## 💾 Schema Database

### Tabelle Principali

| Tabella | Descrizione |
|---------|-------------|
| **users** | Utenti registrati con stats |
| **user_wallets** | Indirizzi wallet per blockchain |
| **trivia_categories** | Categorie di domande |
| **trivia_questions** | Domande con risposte |
| **trivia_user_answers** | Risposte e punteggi utenti |
| **nft_collections** | Collezioni NFT |
| **transactions** | Storico transazioni crypto |

### Categorie Trivia Precaricate

1. **💰 Criptovalute** - 4 domande
2. **🎨 NFT** - 3 domande
3. **🎮 Gaming** - 0 domande (da aggiungere)
4. **🔗 Web3** - 0 domande (da aggiungere)
5. **⛓️ Blockchain** - 0 domande (da aggiungere)

## 🌐 Blockchain Support

| Chain | RPC | Token | Speed | Wallet |
|-------|-----|-------|-------|--------|
| **Solana** | api.mainnet-beta.solana.com | SOL | Instant | Phantom |
| **Ethereum** | eth.llamarpc.com | ETH | ~15 min | MetaMask |
| **Cronos** | evm.cronos.org | CRO | ~10 sec | MetaMask |

## 🎨 Design & Styling

- **Tailwind CSS**: Utility-first framework
- **Framer Motion**: Animazioni fluide
- **Colori Neon**: Pink, Cyan, Yellow, Purple, Orange, Lime
- **Effetti 3D**: Box-shadow glow, transform, hover effects
- **Responsive**: Mobile, Tablet, Desktop

### Colori Tema

```css
Pink:   #FF006E
Cyan:   #00F5FF
Yellow: #FFFD00
Purple: #A000FF
Orange: #FF6600
Lime:   #39FF14
```

## 📊 Meccanica Gioco

### Neuro Trivia

**Punti per Difficoltà:**
- 🟢 Facile: 0.01 SOL
- 🟡 Medio: 0.02 SOL
- 🔴 Difficile: 0.05 SOL

**Voti:**
- A (90%+): Straordinario! 🎉
- B (80%+): Ottimo lavoro! 😊
- C (70%+): Non male! 👍
- D (60%+): Puoi fare di meglio 📚
- F (<60%): Non mollare! 💪

## 🛠️ Stack Tecnologico

### Frontend
- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- PostgreSQL (Neon)
- next-auth
- Axios

### Blockchain
- @solana/web3.js
- ethers.js
- @solana/wallet-adapter

### Utils
- zustand (state management)
- framer-motion (animazioni)

## 📦 Script Disponibili

```bash
npm run dev      # Avvia server sviluppo (porta 3000)
npm run build    # Build per produzione
npm start        # Avvia server produzione
npm run lint     # Esegui ESLint
```

## 🚀 Features Implementate

- ✅ Homepage caraibica con effetti 3D
- ✅ Galleria NFT interattiva
- ✅ Gioco Trivia con 4 risposte
- ✅ Sistema ricompense in SOL
- ✅ Integrazione wallet multi-chain
- ✅ Admin panel con login
- ✅ Gestione categorie trivia
- ✅ Generazione domande IA (simulata)
- ✅ Database PostgreSQL
- ✅ Footer completo

## 🔮 Features Future

- [ ] Sistema reputation e badge
- [ ] Tornei mensili con premi
- [ ] Stake NFT per bonus
- [ ] Marketplace NFT integrato
- [ ] Social features (amici, team)
- [ ] Mobile app (React Native)
- [ ] Notifiche push
- [ ] Discord bot integration
- [ ] Streaming live
- [ ] Moltiplicatori e power-up

## 🔒 Sicurezza

- ✅ Password hash (bcrypt)
- ✅ Session management
- ✅ Non custodia di chiavi private
- ✅ HTTPS ready
- ✅ Input validation lato server
- ✅ CORS configuration
- ✅ Rate limiting ready

## 📞 Support

- Discord: [Link]
- Email: support@neuroisland.com
- Twitter: [@NeuroIsland]

---

**Made with ❤️ for the Caribbean vibes** 🏝️✨

Happy Gaming! 🎮🚀

✨ **Homepage Caraibica** - Design moderno, colorato e allegro con stile caribico  
🎨 **NFT Island** - Collezione esclusiva "Neuro in the Barrel 3D"  
🧠 **Neuro Trivia** - Gioco Trivial Pursuit con domande a 4 risposte  
💎 **Wallet Integration** - Supporto per Solana, Ethereum e Cronos Chain  
⚙️ **Admin Panel** - Gestione categorie domande e generazione IA automatica  
🤖 **Generazione IA** - Crea automaticamente domande trivia per categoria  

## 📋 Pagine Implementate

### 🏠 Homepage (`/`)
- Header con logo e navigazione
- Hero section con emoji animata
- 4 pulsanti 3D colorati:
  - **NFT Island** - Collezione NFT
  - **Neuro Trivia** - Gioco trivia
  - **Wallet** - Integrazione crypto
  - **Admin** - Pannello admin
- Sezione caratteristiche
- Footer con links e info

### 🎨 NFT Island (`/nft-island`)
- Showcase collezione "Neuro in the Barrel 3D"
- 6 NFT con diversi livelli di rarità
- Filtri per blockchain (Solana, Ethereum, Cronos)
- Modal dettagli NFT
- Statistiche collezione

### 🧠 Neuro Trivia (`/neuro-trivia`)
- Selezione categoria
- Domande a 4 risposte (A, B, C, D)
- Sistema di punteggio
- Guadagno SOL per risposte corrette
- Pagina risultati finale
- Difficoltà variabile (Facile, Medio, Difficile)

### 🛡️ Admin Panel
- **Login** (`/admin/login`) - Autenticazione admin con credenziali
- **Dashboard** (`/admin/dashboard`) - Gestione completa:
  - 📊 Overview con statistiche
  - 📁 Gestione categorie (CRUD)
  - ❓ Gestione domande
  - 🤖 Generazione domande IA

### 💎 Wallet Integration (`/wallet`)
- Connessione multi-chain
- Supporto Solana (◎), Ethereum (Ξ), Cronos (₪)
- Visualizzazione saldo
- Transazioni crypto
- Informazioni reti

## 🛠️ Installazione

### Prerequisiti
- Node.js 16+
- npm o yarn

### Setup
```bash
# Installa dipendenze
npm install

# Avvia server di sviluppo
npm run dev

# Apri http://localhost:3000
```

## 📦 Dipendenze Principali

```json
{
  "next": "^13.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "tailwindcss": "^3.0.0",
  "framer-motion": "^10.0.0",
  "@solana/web3.js": "^1.0.0",
  "@solana/wallet-adapter-react": "^0.15.0",
  "ethers": "^6.0.0",
  "next-auth": "^4.0.0"
}
```

## 🔐 Credenziali Admin (Demo)

| Username | Password |
|----------|----------|
| admin | NeuroIsland2026! |
| moderator | ModPass123! |

**⚠️ In produzione, utilizzare database sicuro!**

## 🎨 Stile e Design

### Colori Caraibici
- 🎨 Sfumature dal rosa al ciano
- 🌈 Neon pink (#FF006E), Cyan (#00F5FF), Lime (#39FF14)
- 🌅 Gradient tropical

### Animazioni
- Blob floating background
- Button 3D hover effects
- Neon glow effects
- Smooth transitions

### Componenti
- Card con shine effects
- 3D buttons con shadow
- Animated progress bars
- Modal transizioni
- Loading states

## 🌐 Blockchain Support

### Solana ◎
- Token: SOL
- Speed: Istantaneo
- Low fees

### Ethereum Ξ
- Token: ETH
- Speed: ~15 min
- High security

### Cronos ₪
- Token: CRO
- Speed: ~10 sec
- Low fees

## 📝 Struttura Progetto

```
NeuroIsland/
├── src/
│   ├── components/
│   │   ├── HomePage.tsx
│   │   ├── NFTIsland.tsx
│   │   ├── NeuroTrivia.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── WalletIntegration.tsx
│   ├── pages/
│   │   ├── index.tsx
│   │   ├── nft-island.tsx
│   │   ├── neuro-trivia.tsx
│   │   ├── wallet.tsx
│   │   ├── admin/
│   │   │   ├── login.tsx
│   │   │   └── dashboard.tsx
│   │   ├── _app.tsx
│   │   └── _document.tsx
│   ├── styles/
│   │   └── globals.css
│   └── lib/
├── public/
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

## 🎮 Gameplay

### Neuro Trivia
1. Seleziona categoria (Criptovalute, NFT, Gaming, Web3)
2. Rispondi alle domande
3. Guadagna SOL per risposte corrette
4. Vedi risultati finali

### Categorie Domande
- 💰 **Criptovalute** - Bitcoin, Ethereum, blockchain
- 🎨 **NFT** - Digital art, collectibles
- 🎮 **Gaming** - Metaverse, P2E games
- 🔗 **Web3** - Blockchain, crypto, DeFi

## 🔧 Configurazione

### Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_NETWORK=mainnet
```

### Tailwind Customization
Colori caraibici estesi in `tailwind.config.ts`:
- `caribbean-*` - Palette caraibica
- `neon-*` - Colori neon
- Custom animations (float, pulse-glow, shimmer)

## 📱 Responsive Design

- ✅ Mobile first approach
- ✅ Tablet optimized
- ✅ Desktop experience
- ✅ All devices supported

## 🚀 Deployment

```bash
# Build per produzione
npm run build

# Start server
npm run start

# Deployment su Vercel
# 1. Push al repo GitHub
# 2. Connect a Vercel
# 3. Auto-deploy!
```

## 🔒 Sicurezza

- ✅ Admin panel autenticato
- ✅ Wallet integration sicura
- ✅ Keys rimangono sul dispositivo
- ✅ HTTPS required per produzione
- ⚠️ Credenziali admin in database reale

## 📊 Statistiche Demo

- 🎨 6 NFT esclusivi
- ❓ 8+ domande trivia
- 👥 1,234+ utenti
- 🎮 1,456+ partite giocate

## 🤝 Contributi

Contributi benvenuti! Apri una PR con miglioramenti.

## 📄 Licenza

Licenza ISC - vedi file LICENSE

## 👨‍💻 Sviluppato da

**NeuroIsland Dev Team** 🧠🏝️

---

## 📞 Supporto

- 💬 Discord: [NeuroIsland Community]
- 🐦 Twitter: [@NeuroIsland]
- 📧 Email: support@neuroisland.com

---

**Built with ❤️ and 🏝️ Caribbean Spirit**

🌴 Enjoy NeuroIsland! 🌴
