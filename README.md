# Kannada-English-Translator

A full-stack web application for translating between Kannada and English languages.

## Features

- Real-time translation between Kannada and English
- Modern glass-morphism UI design
- Auto-translate with debouncing
- Copy translated text to clipboard
- Swap languages functionality
- Responsive design

## Tech Stack

- **Frontend**: React 19, Vite, Lucide React icons
- **Backend**: Node.js, Express.js
- **Translation API**: MyMemory Translation API (free tier)
- **Styling**: Custom CSS with glass-morphism effects

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install:all
   ```

## Running the Application

Start both frontend and backend servers:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend on http://localhost:5173

## Translation Service

The application now supports **full Kannada language translation** using:

1. **Dictionary translations** for common phrases (fast, offline)
2. **Google Translate API fallback** for any word/phrase not in the dictionary

### Supported Translations:
- **Dictionary words**: hello, world, thank you, good morning, how are you, i love you, goodbye, please, sorry, yes, no
- **Full language support**: Any English or Kannada text via Google Translate API

### API Features:
- Bi-directional: English ↔ Kannada
- Real-time translation
- Fallback mechanism for comprehensive coverage

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── TranslatorPanel.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
├── server/          # Node.js backend
│   ├── server.js
│   └── package.json
└── package.json     # Root scripts
```