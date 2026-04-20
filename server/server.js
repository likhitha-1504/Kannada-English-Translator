const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/translate', async (req, res) => {
  try {
    const { text, from = 'kn', to = 'en' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required for translation' });
    }

    // Mock translation for demo purposes - limited dictionary
    let translatedText = '';

    if (from === 'en' && to === 'kn') {
      // English to Kannada translations
      const translations = {
        'hello': 'ನಮಸ್ಕಾರ',
        'world': 'ಲೋಕ',
        'thank you': 'ಧನ್ಯವಾದಗಳು',
        'good morning': 'ಶುಭೋದಯ',
        'how are you': 'ನೀವು ಹೇಗಿದ್ದೀರಿ',
        'i love you': 'ನಾನು ನಿನ್ನನ್ನು ಪ್ರೀತಿಸುತ್ತೇನೆ',
        'goodbye': 'ವಿದಾಯ',
        'please': 'ದಯವಿಟ್ಟು',
        'sorry': 'ಕ್ಷಮಿಸಿ',
        'yes': 'ಹೌದು',
        'no': 'ಇಲ್ಲ'
      };
      translatedText = translations[text.toLowerCase()];
    } else if (from === 'kn' && to === 'en') {
      // Kannada to English translations
      const translations = {
        'ನಮಸ್ಕಾರ': 'hello',
        'ಲೋಕ': 'world',
        'ಧನ್ಯವಾದಗಳು': 'thank you',
        'ಶುಭೋದಯ': 'good morning',
        'ನೀವು ಹೇಗಿದ್ದೀರಿ': 'how are you',
        'ನಾನು ನಿನ್ನನ್ನು ಪ್ರೀತಿಸುತ್ತೇನೆ': 'i love you',
        'ವಿದಾಯ': 'goodbye',
        'ದಯವಿಟ್ಟು': 'please',
        'ಕ್ಷಮಿಸಿ': 'sorry',
        'ಹೌದು': 'yes',
        'ಇಲ್ಲ': 'no'
      };
      translatedText = translations[text];
    }

    // If translation not found in dictionary, try Google Translate API
    if (!translatedText) {
      try {
        // Using Google Translate API (free tier, no API key required for basic usage)
        const googleTranslateUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;

        const response = await axios.get(googleTranslateUrl);

        if (response.data && response.data[0] && response.data[0][0]) {
          translatedText = response.data[0][0][0];
        } else {
          translatedText = `(${text} - translation not available)`;
        }
      } catch (apiError) {
        console.error('Google Translate API error:', apiError.message);
        translatedText = `(${text} - translation not available)`;
      }
    }

    res.json({
      originalText: text,
      translatedText: translatedText,
      from,
      to
    });
  } catch (error) {
    console.error('Translation error:', error.message);
    res.status(500).json({ error: 'Failed to translate text' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
