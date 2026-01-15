import { useState } from 'react';
import { kanaData } from './data';
import type { Kana } from './data';

type Mode = 'menu' | 'flashcard' | 'quiz';
type KanaType = 'hiragana' | 'katakana';

function App() {
  const [view, setView] = useState<Mode>('menu');
  const [selectedType, setSelectedType] = useState<KanaType>('hiragana');
  const [currentKana, setCurrentKana] = useState<Kana>(kanaData[0]);
  const [options, setOptions] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedback, setFeedback] = useState('');

  const startSession = (mode: Mode, type: KanaType) => {
    setSelectedType(type);
    setView(mode);
    generateQuestion(type);
  };

  const generateQuestion = (type: KanaType) => {
    const data = kanaData.filter(k => k.type === type);
    const correct = data[Math.floor(Math.random() * data.length)];
    setCurrentKana(correct);
    setShowAnswer(false);
    setFeedback('');

    const wrongOptions = data
      .filter(k => k.romaji !== correct.romaji)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map(k => k.romaji);
    
    setOptions([correct.romaji, ...wrongOptions].sort(() => 0.5 - Math.random()));
  };

  const checkAnswer = (choice: string) => {
    if (choice === currentKana.romaji) {
      setFeedback('✅ Benar!');
      setTimeout(() => generateQuestion(selectedType), 800);
    } else {
      setFeedback(`❌ Salah! Itu adalah "${currentKana.romaji}"`);
    }
  };

  if (view === 'menu') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>J-Learn Menu</h1>
          <div style={styles.menuGrid}>
            <button style={styles.menuBtn} onClick={() => startSession('flashcard', 'hiragana')}>📖 Belajar Hiragana</button>
            <button style={styles.menuBtn} onClick={() => startSession('flashcard', 'katakana')}>📖 Belajar Katakana</button>
            <button style={styles.quizBtn} onClick={() => startSession('quiz', 'hiragana')}>✍️ Kuis Hiragana</button>
            <button style={styles.quizBtn} onClick={() => startSession('quiz', 'katakana')}>✍️ Kuis Katakana</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.topBar}>
          <button onClick={() => setView('menu')} style={styles.backBtn}>← Kembali</button>
        </div>
        
        <div style={styles.kanaDisplay}>{currentKana.char}</div>
        
        {view === 'flashcard' ? (
          <div style={styles.contentArea}>
            {showAnswer ? (
              <h2 style={styles.romajiText}>{currentKana.romaji}</h2>
            ) : (
              <button style={styles.button} onClick={() => setShowAnswer(true)}>Buka Jawaban</button>
            )}
            <button style={styles.skipButton} onClick={() => generateQuestion(selectedType)}>Ganti Huruf</button>
          </div>
        ) : (
          <div style={styles.contentArea}>
            <div style={styles.optionGrid}>
              {options.map(opt => (
                <button key={opt} style={styles.optionBtn} onClick={() => checkAnswer(opt)}>{opt}</button>
              ))}
            </div>
            <div style={styles.feedbackContainer}>
               <p style={{color: feedback.includes('✅') ? '#81c784' : '#e57373', fontWeight: 'bold'}}>{feedback}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: { 
    backgroundColor: '#ebf4ff', 
    width: '100vw', // Pastikan lebar penuh layar
    height: '100vh', // Pastikan tinggi penuh layar
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    margin: 0,
    padding: 0,
    position: 'fixed', // Menghindari scroll aneh di beberapa browser mobile
    top: 0,
    left: 0
  },
  card: { 
    backgroundColor: 'white', 
    width: '90%', // Mengambil 90% lebar di HP
    maxWidth: '400px', 
    borderRadius: '24px', 
    padding: '25px', 
    boxShadow: '0 15px 35px rgba(0,0,0,0.1)', 
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  topBar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '10px'
  },
  title: { color: '#5da9e9', marginBottom: '25px', fontSize: '24px' },
  menuGrid: { display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' },
  menuBtn: { padding: '16px', borderRadius: '15px', border: 'none', backgroundColor: '#e1effe', color: '#3b82f6', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' },
  quizBtn: { padding: '16px', borderRadius: '15px', border: 'none', backgroundColor: '#5da9e9', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' },
  kanaDisplay: { fontSize: '100px', margin: '15px 0', fontWeight: 'bold', color: '#333', lineHeight: '1.2' },
  contentArea: { width: '100%', minHeight: '150px' },
  romajiText: { color: '#5da9e9', fontSize: '32px', margin: '10px 0' },
  optionGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', width: '100%' },
  optionBtn: { padding: '15px 5px', borderRadius: '12px', border: '2px solid #e1effe', backgroundColor: 'white', cursor: 'pointer', fontSize: '18px', fontWeight: '500' },
  button: { padding: '15px 30px', borderRadius: '12px', border: 'none', backgroundColor: '#5da9e9', color: 'white', cursor: 'pointer', fontSize: '18px', width: '100%' },
  backBtn: { background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' },
  skipButton: { display: 'block', margin: '15px auto 0', background: 'none', border: 'none', color: '#5da9e9', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px' },
  feedbackContainer: { minHeight: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }
};

export default App;