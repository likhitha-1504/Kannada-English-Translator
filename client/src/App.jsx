import React from 'react';
import TranslatorPanel from './components/TranslatorPanel';
import './index.css'; // Ensure the global styles are loaded

function App() {
  return (
    <div className="app-container">
      <header className="brand-header">
        <h1 className="brand-title">Lingo</h1>
        <p className="brand-subtitle">Seamless Kannada & English Translation</p>
      </header>

      <main style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <TranslatorPanel />
      </main>

      <footer style={{ marginTop: 'auto', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        POWERED BY GENAI EXPERT
      </footer>
    </div>
  );
}

export default App;
