import { useState } from 'react';
import { kanaData, kanjiData, kotobaData } from './data';
import type { Kana, Kanji, Kotoba } from './data';

type Mode = 'mainMenu' | 'subMenu' | 'kanjiLevels' | 'kanjiSubMenu' | 'flashcard' | 'quizSelect' | 'quizInput' | 'quizMeaning' | 'tableView' | 'kotobaMenu';
type Category = 'hiragana' | 'katakana' | 'kanji' | 'kotoba';
type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

function App() {
  const [view, setView] = useState<Mode>('mainMenu');
  const [selectedCategory, setSelectedCategory] = useState<Category>('hiragana');
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel>('N5');
  const [currentItem, setCurrentItem] = useState<Kana | Kanji | Kotoba>(kanaData[0]);
  const [options, setOptions] = useState<string[]>([]);
  const [inputAnswer, setInputAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const getSessionData = () => {
    if (selectedCategory === 'kanji') return kanjiData.filter(k => k.level === selectedLevel);
    if (selectedCategory === 'kotoba') return kotobaData;
    return kanaData.filter(k => k.type === selectedCategory);
  };

  const generateQuestion = (mode: Mode) => {
    const data = getSessionData();
    const correct = data[Math.floor(Math.random() * data.length)];
    setCurrentItem(correct);
    setShowAnswer(false);
    setIsCorrect(false);
    setFeedback('');
    setInputAnswer('');

    let correctValue = '';
    if (mode === 'quizMeaning' && 'meaning' in correct) {
      correctValue = correct.meaning;
    } else {
      correctValue = 'romaji' in correct ? (correct as any).romaji : (correct as Kanji).onyomi;
    }

    const wrongOptions = data
      .filter(item => {
        const val = 'romaji' in item ? (item as any).romaji : (mode === 'quizMeaning' ? (item as any).meaning : (item as any).onyomi);
        return val !== correctValue;
      })
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map(item => 'romaji' in item ? (item as any).romaji : (mode === 'quizMeaning' ? (item as any).meaning : (item as any).onyomi));

    setOptions([correctValue, ...wrongOptions].sort(() => 0.5 - Math.random()));
  };

  const checkAnswer = (choice: string) => {
    let correctValue = '';
    if (view === 'quizMeaning' && 'meaning' in currentItem) {
      correctValue = currentItem.meaning;
    } else {
      correctValue = 'romaji' in currentItem ? (currentItem as any).romaji : (currentItem as Kanji).onyomi;
    }

    if (choice.toLowerCase().trim() === correctValue.toLowerCase().trim()) {
      setIsCorrect(true);
      // Menambahkan arti indonesia ke feedback jika ada
      const arti = 'meaning' in currentItem ? ` (${currentItem.meaning})` : '';
      setFeedback(`✅ Benar!${arti}`);
      setTimeout(() => generateQuestion(view), 1200);
    } else {
      setIsCorrect(false);
      setFeedback(`❌ Salah! Jawaban: ${correctValue}`);
    }
  };

  const kanaTables = [
    {
      title: 'Basic Sounds (Seion)',
      rows: [
        { label: 'Vowels', chars: ['a', 'i', 'u', 'e', 'o'] },
        { label: 'K-Row', chars: ['ka', 'ki', 'ku', 'ke', 'ko'] },
        { label: 'S-Row', chars: ['sa', 'shi', 'su', 'se', 'so'] },
        { label: 'T-Row', chars: ['ta', 'chi', 'tsu', 'te', 'to'] },
        { label: 'N-Row', chars: ['na', 'ni', 'nu', 'ne', 'no'] },
        { label: 'H-Row', chars: ['ha', 'hi', 'fu', 'he', 'ho'] },
        { label: 'M-Row', chars: ['ma', 'mi', 'mu', 'me', 'mo'] },
        { label: 'Y-Row', chars: ['ya', 'yu', 'yo'] },
        { label: 'R-Row', chars: ['ra', 'ri', 'ru', 're', 'ro'] },
        { label: 'W-Row', chars: ['wa', 'wo', 'n'] },
      ]
    },
    {
      title: 'Voiced Sounds (Dakuon)',
      rows: [
        { label: 'G-Row', chars: ['ga', 'gi', 'gu', 'ge', 'go'] },
        { label: 'Z-Row', chars: ['za', 'ji', 'zu', 'ze', 'zo'] },
        { label: 'D-Row', chars: ['da', 'ji', 'zu', 'de', 'do'] },
        { label: 'B-Row', chars: ['ba', 'bi', 'bu', 'be', 'bo'] },
      ]
    },
    {
      title: 'P-Sounds (Handakuon)',
      rows: [{ label: 'P-Row', chars: ['pa', 'pi', 'pu', 'pe', 'po'] }]
    },
    {
      title: 'Contracted (Yoon)',
      rows: [
        { label: 'K-Y', chars: ['kya', 'kyu', 'kyo'] },
        { label: 'S-Y', chars: ['sha', 'shu', 'sho'] },
        { label: 'C-Y', chars: ['cha', 'chu', 'cho'] },
        { label: 'N-Y', chars: ['nya', 'nyu', 'nyo'] },
        { label: 'H-Y', chars: ['hya', 'hyu', 'hyo'] },
        { label: 'M-Y', chars: ['mya', 'myu', 'myo'] },
        { label: 'R-Y', chars: ['rya', 'ryu', 'ryo'] },
        { label: 'G-Y', chars: ['gya', 'gyu', 'gyo'] },
        { label: 'J-Y', chars: ['ja', 'ju', 'jo'] },
        { label: 'B-Y', chars: ['bya', 'byu', 'byo'] },
        { label: 'P-Y', chars: ['pya', 'pyu', 'pyo'] },
      ]
    }
  ];

  const kanjiGroups = [
    { title: 'Angka', list: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万'] },
    { title: 'Waktu & Hari', list: ['日', '月', '火', '水', '木', '金', '土', '年', '時', '分', '间', '週', '今', '先', '前', '後', '午', '半'] },
    { title: 'Alam', list: ['天', '気', '雨', '空', '山', '川', '花', '木', '魚'] },
    { title: 'Arah', list: ['北', '東', '西', '南', '左', '右', '上', '下', '中', '外'] },
    { title: 'Manusia', list: ['人', '男', '女', '子', '父', '母', '友', '名', '目', '口', '耳', '手', '足'] },
    { title: 'Sekolah & Kerja', list: ['学', '校', '生', '会', '社', '店', '駅', '电', '车', '道', '书', '闻', '读', '语', '言'] },
  ];

  if (view === 'mainMenu') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>J-Learn</h1>
          <div style={styles.menuGrid}>
            <button style={styles.menuBtn} onClick={() => { setSelectedCategory('hiragana'); setView('subMenu'); }}>あ Hiragana</button>
            <button style={styles.menuBtn} onClick={() => { setSelectedCategory('katakana'); setView('subMenu'); }}>ア Katakana</button>
            <button style={{...styles.menuBtn, backgroundColor: '#ffcc80'}} onClick={() => { setSelectedCategory('kanji'); setView('kanjiLevels'); }}>漢 Kanji</button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'subMenu') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <button onClick={() => setView('mainMenu')} style={styles.backBtn}>← Menu Utama</button>
          <h2 style={styles.title}>{selectedCategory}</h2>
          <div style={styles.menuGrid}>
            {selectedCategory === 'hiragana' && (
              <button style={{...styles.subBtn, backgroundColor: '#c8e6c9'}} onClick={() => setView('kotobaMenu')}>📦 Menu Kotoba (Kosakata)</button>
            )}
            <button style={styles.subBtn} onClick={() => setView('tableView')}>📊 Lihat Tabel Lengkap</button>
            <button style={styles.subBtn} onClick={() => { setView('flashcard'); generateQuestion('flashcard'); }}>📖 Belajar</button>
            <button style={styles.subBtn} onClick={() => { setView('quizSelect'); generateQuestion('quizSelect'); }}>✍️ Pilihan Ganda</button>
            <button style={styles.subBtn} onClick={() => { setView('quizInput'); generateQuestion('quizInput'); }}>⌨️ Isian Romaji</button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'kotobaMenu') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <button onClick={() => setView('subMenu')} style={styles.backBtn}>← Kembali</button>
          <h2 style={styles.title}>Kotoba N5</h2>
          <div style={styles.menuGrid}>
            <button style={styles.subBtn} onClick={() => { setSelectedCategory('kotoba'); setView('flashcard'); generateQuestion('flashcard'); }}>📖 Belajar Kosakata</button>
            <button style={styles.subBtn} onClick={() => { setSelectedCategory('kotoba'); setView('quizSelect'); generateQuestion('quizSelect'); }}>✍️ Tebak Romaji (Pilihan)</button>
            <button style={styles.subBtn} onClick={() => { setSelectedCategory('kotoba'); setView('quizInput'); generateQuestion('quizInput'); }}>⌨️ Ketik Romaji (Isian)</button>
            <button style={styles.subBtn} onClick={() => { setSelectedCategory('kotoba'); setView('quizMeaning'); generateQuestion('quizMeaning'); }}>❓ Tebak Arti Indonesia</button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'kanjiLevels') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <button onClick={() => setView('mainMenu')} style={styles.backBtn}>← Menu Utama</button>
          <h2 style={styles.title}>Pilih Level Kanji</h2>
          <div style={styles.menuGrid}>
            {(['N5', 'N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).map(lvl => (
              <button key={lvl} style={{...styles.subBtn, opacity: lvl === 'N5' ? 1 : 0.5}} disabled={lvl !== 'N5'} onClick={() => { setSelectedLevel(lvl); setView('kanjiSubMenu'); }}>
                {lvl} {lvl !== 'N5' && '(Soon)'}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'kanjiSubMenu') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <button onClick={() => setView('kanjiLevels')} style={styles.backBtn}>← Level Kanji</button>
          <h2 style={styles.title}>Kanji {selectedLevel}</h2>
          <div style={styles.menuGrid}>
            <button style={styles.subBtn} onClick={() => setView('tableView')}>📊 Lihat Tabel Kanji {selectedLevel}</button>
            <button style={styles.subBtn} onClick={() => { setView('flashcard'); generateQuestion('flashcard'); }}>📖 Belajar Kanji</button>
            <button style={styles.subBtn} onClick={() => { setView('quizSelect'); generateQuestion('quizSelect'); }}>✍️ Kuis Pilihan Ganda</button>
            <button style={styles.subBtn} onClick={() => { setView('quizInput'); generateQuestion('quizInput'); }}>⌨️ Isian (Onyomi)</button>
            <button style={styles.subBtn} onClick={() => { setView('quizMeaning'); generateQuestion('quizMeaning'); }}>❓ Kuis Arti Kanji</button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'tableView') {
    return (
      <div style={styles.container}>
        <div style={{...styles.card, maxWidth: '500px'}}>
          <button onClick={() => setView(selectedCategory === 'kanji' ? 'kanjiSubMenu' : 'subMenu')} style={styles.backBtn}>← Kembali</button>
          <h2 style={styles.title}>Tabel {selectedCategory}</h2>
          <div style={{ overflowY: 'auto', width: '100%', maxHeight: '70vh', paddingRight: '5px' }}>
            {selectedCategory === 'kanji' ? (
              kanjiGroups.map(group => (
                <div key={group.title} style={{ marginBottom: '20px', textAlign: 'left' }}>
                  <h4 style={{ color: '#5da9e9', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>{group.title}</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                    {group.list.map(char => {
                      const item = kanjiData.find(k => k.char === char);
                      return item ? (
                        <div key={char} style={styles.tableItem}>
                          <div style={{ fontSize: '20px' }}>{char}</div>
                          <div style={{ fontSize: '9px', color: '#888' }}>{item.meaning}</div>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              ))
            ) : (
              kanaTables.map(section => (
                <div key={section.title} style={{ marginBottom: '25px', textAlign: 'left' }}>
                  <h4 style={{ color: '#5da9e9', borderBottom: '2px solid #e1effe', paddingBottom: '5px', marginBottom: '10px' }}>{section.title}</h4>
                  {section.rows.map(row => (
                    <div key={row.label} style={{ marginBottom: '10px' }}>
                      <div style={{ fontSize: '11px', color: '#999', marginBottom: '3px' }}>{row.label}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
                        {row.chars.map((romaji, idx) => {
                          const item = kanaData.find(k => k.romaji === romaji && k.type === selectedCategory);
                          return item ? (
                            <div key={`${romaji}-${idx}`} style={styles.tableItem}>
                              <div style={{ fontSize: '18px' }}>{item.char}</div>
                              <div style={{ fontSize: '9px', color: '#aaa' }}>{romaji}</div>
                            </div>
                          ) : <div key={idx} />;
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <button onClick={() => { 
          if(selectedCategory === 'kotoba') setView('kotobaMenu');
          else if(selectedCategory === 'kanji') setView('kanjiSubMenu');
          else setView('subMenu');
        }} style={styles.backBtn}>← Kembali</button>
        <div style={styles.kanaDisplay}>{currentItem.char}</div>
        <div style={styles.contentArea}>
          {view === 'flashcard' && (
            <>
              {showAnswer ? (
                <div style={{ width: '100%' }}>
                  <h2 style={styles.romajiText}>{'romaji' in currentItem ? (currentItem as any).romaji : (currentItem as Kanji).onyomi}</h2>
                  <div style={styles.kanjiInfoBox}>
                    <strong>Arti:</strong> {currentItem.meaning}<br/>
                    {'onyomi' in currentItem && (
                      <>
                        <strong>On:</strong> {(currentItem as Kanji).onyomi}<br/>
                        <strong>Kun:</strong> {(currentItem as Kanji).kunyomi}
                      </>
                    )}
                    {selectedCategory === 'kotoba' && (
                       <><strong>Jenis:</strong> {(currentItem as Kotoba).type}</>
                    )}
                  </div>
                </div>
              ) : (<button style={styles.button} onClick={() => setShowAnswer(true)}>Buka Jawaban</button>)}
              <button style={styles.skipButton} onClick={() => generateQuestion(view)}>Ganti Soal</button>
            </>
          )}
          {(view === 'quizSelect' || view === 'quizMeaning') && (
            <>
              <div style={styles.optionGrid}>
                {options.map(opt => <button key={opt} style={styles.optionBtn} onClick={() => checkAnswer(opt)}>{opt}</button>)}
              </div>
              <p style={{color: isCorrect ? '#81c784' : '#e57373', fontWeight: 'bold', marginTop: '10px'}}>{feedback}</p>
            </>
          )}
          {view === 'quizInput' && (
            <form onSubmit={(e) => { e.preventDefault(); checkAnswer(inputAnswer); }}>
              <input style={styles.inputField} type="text" value={inputAnswer} placeholder="Ketik romaji..." onChange={(e) => setInputAnswer(e.target.value)} autoFocus />
              <button type="submit" style={{...styles.button, marginTop: '10px'}}>Cek</button>
              <p style={{color: isCorrect ? '#81c784' : '#e57373', fontWeight: 'bold', marginTop: '10px'}}>{feedback}</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: { backgroundColor: '#ebf4ff', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', position: 'fixed', top: 0, left: 0 },
  card: { backgroundColor: 'white', width: '90%', maxWidth: '400px', borderRadius: '24px', padding: '25px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: '95vh', overflowY: 'auto' },
  title: { color: '#5da9e9', marginBottom: '20px', fontSize: '24px', textTransform: 'capitalize' },
  menuGrid: { display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' },
  menuBtn: { padding: '20px', borderRadius: '15px', border: 'none', backgroundColor: '#5da9e9', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px' },
  subBtn: { padding: '16px', borderRadius: '15px', border: 'none', backgroundColor: '#e1effe', color: '#3b82f6', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', textAlign: 'left' },
  backBtn: { background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', alignSelf: 'flex-start' },
  kanaDisplay: { fontSize: '80px', margin: '10px 0', fontWeight: 'bold', color: '#333' },
  kanjiInfoBox: { fontSize: '13px', textAlign: 'left', width: '100%', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '8px', marginBottom: '10px', marginTop: '10px', lineHeight: '1.5' },
  contentArea: { width: '100%', minHeight: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  romajiText: { color: '#5da9e9', fontSize: '28px', margin: '10px 0' },
  optionGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '8px', width: '100%' },
  optionBtn: { padding: '12px', borderRadius: '12px', border: '2px solid #e1effe', backgroundColor: 'white', cursor: 'pointer', fontSize: '16px' },
  button: { padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#5da9e9', color: 'white', cursor: 'pointer', fontSize: '16px', width: '100%' },
  skipButton: { display: 'block', margin: '10px auto 0', background: 'none', border: 'none', color: '#5da9e9', textDecoration: 'underline', cursor: 'pointer' },
  inputField: { padding: '15px', borderRadius: '12px', border: '2px solid #e1effe', width: '100%', boxSizing: 'border-box', fontSize: '18px', textAlign: 'center' },
  tableItem: { backgroundColor: '#fdfdfd', border: '1px solid #eee', borderRadius: '8px', padding: '6px 2px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }
};

export default App;