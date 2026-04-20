import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ArrowLeftRight, Loader2, Copy, CheckCircle2 } from 'lucide-react';

const TranslatorPanel = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [translateDirection, setTranslateDirection] = useState('kn-en'); // 'kn-en' or 'en-kn'

  const handleTranslate = useCallback(async (textToTranslate) => {
    setIsTranslating(true);
    try {
      const from = translateDirection === 'kn-en' ? 'kn' : 'en';
      const to = translateDirection === 'kn-en' ? 'en' : 'kn';

      const response = await axios.post('http://localhost:5000/api/translate', {
        text: textToTranslate,
        from,
        to
      });

      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Failed to translate', error);
      setTranslatedText('Failed to translate. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  }, [translateDirection]);

  // Debounce logic for auto-translate
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputText.trim()) {
        handleTranslate(inputText);
      } else {
        setTranslatedText('');
      }
    }, 800); // 800ms delay

    return () => clearTimeout(timer);
  }, [inputText, translateDirection, handleTranslate]);

  const handleCopy = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const swapLanguages = () => {
    setTranslateDirection(prev => prev === 'kn-en' ? 'en-kn' : 'kn-en');
    // Swap the texts cleanly
    const tempInput = inputText;
    setInputText(translatedText);
    setTranslatedText(tempInput);
  };

  return (
    <div className="translator-container glass-panel">
      
      {/* Header controls */}
      <div className="translator-header">
        <div className={`lang-indicator ${translateDirection === 'kn-en' ? 'active' : ''}`}>
          {translateDirection === 'kn-en' ? 'Kannada' : 'English'}
        </div>
        
        <button className="swap-btn" onClick={swapLanguages} title="Swap Languages">
          <ArrowLeftRight size={20} />
        </button>

        <div className={`lang-indicator ${translateDirection === 'en-kn' ? 'active' : ''}`}>
          {translateDirection === 'kn-en' ? 'English' : 'Kannada'}
        </div>
      </div>

      {/* Input / Output Grids */}
      <div className="translator-body">
        <div className="input-area">
          <textarea
            className="text-box glass-textarea"
            placeholder={`Enter ${translateDirection === 'kn-en' ? 'Kannada' : 'English'} text here...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        <div className="divider"></div>

        <div className="output-area">
          <div className="output-overlay">
            {isTranslating && <Loader2 className="spinner" size={32} />}
          </div>
          <textarea
            className="text-box glass-textarea read-only"
            placeholder="Translation will appear here..."
            value={translatedText}
            readOnly
          />

          {translatedText && (
            <button className="copy-btn" onClick={handleCopy} title="Copy to clipboard">
              {copied ? <CheckCircle2 size={18} className="text-success" /> : <Copy size={18} />}
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default TranslatorPanel;
