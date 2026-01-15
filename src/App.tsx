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
        <button onClick={() => setView('menu')} style={styles.backBtn}>← Kembali</button>
        <div style={styles.kanaDisplay}>{currentKana.char}</div>
        {view === 'flashcard' ? (
          <div>
            {showAnswer ? (
              <h2 style={{color: '#5da9e9'}}>{currentKana.romaji}</h2>
            ) : (
              <button style={styles.button} onClick={() => setShowAnswer(true)}>Buka Jawaban</button>
            )}
            <button style={styles.skipButton} onClick={() => generateQuestion(selectedType)}>Lanjut Huruf Lain</button>
          </div>
        ) : (
          <div>
            <div style={styles.optionGrid}>
              {options.map(opt => (
                <button key={opt} style={styles.optionBtn} onClick={() => checkAnswer(opt)}>{opt}</button>
              ))}
            </div>
            <p style={{marginTop: '20px', color: feedback.includes('✅') ? '#81c784' : '#e57373'}}>{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: { backgroundColor: '#ebf4ff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: 'sans-serif' },
  card: { backgroundColor: 'white', width: '100%', maxWidth: '400px', borderRadius: '24px', padding: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center' },
  title: { color: '#5da9e9', marginBottom: '30px' },
  menuGrid: { display: 'flex', flexDirection: 'column', gap: '10px' },
  menuBtn: { padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#e1effe', color: '#3b82f6', fontWeight: 'bold', cursor: 'pointer' },
  quizBtn: { padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#5da9e9', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
  kanaDisplay: { fontSize: '100px', margin: '20px 0', fontWeight: 'bold', color: '#333' },
  optionGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' },
  optionBtn: { padding: '15px', borderRadius: '8px', border: '2px solid #e1effe', backgroundColor: 'white', cursor: 'pointer', fontSize: '18px' },
  button: { padding: '12px 24px', borderRadius: '12px', border: 'none', backgroundColor: '#5da9e9', color: 'white', cursor: 'pointer' },
  backBtn: { background: 'none', border: 'none', color: '#999', cursor: 'pointer', float: 'left', fontSize: '14px' },
  skipButton: { display: 'block', margin: '20px auto', background: 'none', border: 'none', color: '#5da9e9', textDecoration: 'underline', cursor: 'pointer' }
};

export default App;