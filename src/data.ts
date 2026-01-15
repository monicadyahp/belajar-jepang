// src/data.ts
export interface Kana {
  char: string;
  romaji: string;
  type: 'hiragana' | 'katakana';
}

export const kanaData: Kana[] = [
  // HIRAGANA SEION
  { char: 'あ', romaji: 'a', type: 'hiragana' }, { char: 'い', romaji: 'i', type: 'hiragana' },
  { char: 'う', romaji: 'u', type: 'hiragana' }, { char: 'え', romaji: 'e', type: 'hiragana' },
  { char: 'お', romaji: 'o', type: 'hiragana' }, { char: 'か', romaji: 'ka', type: 'hiragana' },
  { char: 'き', romaji: 'ki', type: 'hiragana' }, { char: 'く', romaji: 'ku', type: 'hiragana' },
  { char: 'け', romaji: 'ke', type: 'hiragana' }, { char: 'こ', romaji: 'ko', type: 'hiragana' },
  { char: 'さ', romaji: 'sa', type: 'hiragana' }, { char: 'し', romaji: 'shi', type: 'hiragana' },
  { char: 'す', romaji: 'su', type: 'hiragana' }, { char: 'せ', romaji: 'se', type: 'hiragana' },
  { char: 'そ', romaji: 'so', type: 'hiragana' }, { char: 'た', romaji: 'ta', type: 'hiragana' },
  { char: 'ち', romaji: 'chi', type: 'hiragana' }, { char: 'つ', romaji: 'tsu', type: 'hiragana' },
  { char: 'て', romaji: 'te', type: 'hiragana' }, { char: 'と', romaji: 'to', type: 'hiragana' },
  { char: 'な', romaji: 'na', type: 'hiragana' }, { char: 'に', romaji: 'ni', type: 'hiragana' },
  { char: 'ぬ', romaji: 'nu', type: 'hiragana' }, { char: 'ね', romaji: 'ne', type: 'hiragana' },
  { char: 'の', romaji: 'no', type: 'hiragana' }, { char: 'は', romaji: 'ha', type: 'hiragana' },
  { char: 'ひ', romaji: 'hi', type: 'hiragana' }, { char: 'ふ', romaji: 'fu', type: 'hiragana' },
  { char: 'へ', romaji: 'he', type: 'hiragana' }, { char: 'ほ', romaji: 'ho', type: 'hiragana' },
  { char: 'ま', romaji: 'ma', type: 'hiragana' }, { char: 'み', romaji: 'mi', type: 'hiragana' },
  { char: 'む', romaji: 'mu', type: 'hiragana' }, { char: 'め', romaji: 'me', type: 'hiragana' },
  { char: 'も', romaji: 'mo', type: 'hiragana' }, { char: 'や', romaji: 'ya', type: 'hiragana' },
  { char: 'ゆ', romaji: 'yu', type: 'hiragana' }, { char: 'よ', romaji: 'yo', type: 'hiragana' },
  { char: 'ら', romaji: 'ra', type: 'hiragana' }, { char: 'り', romaji: 'ri', type: 'hiragana' },
  { char: 'る', romaji: 'ru', type: 'hiragana' }, { char: 'れ', romaji: 're', type: 'hiragana' },
  { char: 'ろ', romaji: 'ro', type: 'hiragana' }, { char: 'わ', romaji: 'wa', type: 'hiragana' },
  { char: 'を', romaji: 'wo', type: 'hiragana' }, { char: 'ん', romaji: 'n', type: 'hiragana' },

  // KATAKANA SEION
  { char: 'ア', romaji: 'a', type: 'katakana' }, { char: 'イ', romaji: 'i', type: 'katakana' },
  { char: 'ウ', romaji: 'u', type: 'katakana' }, { char: 'エ', romaji: 'e', type: 'katakana' },
  { char: 'オ', romaji: 'o', type: 'katakana' }, { char: 'カ', romaji: 'ka', type: 'katakana' },
  { char: 'キ', romaji: 'ki', type: 'katakana' }, { char: 'ク', romaji: 'ku', type: 'katakana' },
  { char: 'ケ', romaji: 'ke', type: 'katakana' }, { char: 'コ', romaji: 'ko', type: 'katakana' },
  { char: 'サ', romaji: 'sa', type: 'katakana' }, { char: 'シ', romaji: 'shi', type: 'katakana' },
  { char: 'ス', romaji: 'su', type: 'katakana' }, { char: 'セ', romaji: 'se', type: 'katakana' },
  { char: 'ソ', romaji: 'so', type: 'katakana' }, { char: 'タ', romaji: 'ta', type: 'katakana' },
  { char: 'チ', romaji: 'chi', type: 'katakana' }, { char: 'ツ', romaji: 'tsu', type: 'katakana' },
  { char: 'テ', romaji: 'te', type: 'katakana' }, { char: 'ト', romaji: 'to', type: 'katakana' },
  { char: 'ナ', romaji: 'na', type: 'katakana' }, { char: 'ニ', romaji: 'ni', type: 'katakana' },
  { char: 'ヌ', romaji: 'nu', type: 'katakana' }, { char: 'ネ', romaji: 'ne', type: 'katakana' },
  { char: 'ノ', romaji: 'no', type: 'katakana' }, { char: 'ハ', romaji: 'ha', type: 'katakana' },
  { char: 'ヒ', romaji: 'hi', type: 'katakana' }, { char: 'フ', romaji: 'fu', type: 'katakana' },
  { char: 'ヘ', romaji: 'he', type: 'katakana' }, { char: 'ホ', romaji: 'ho', type: 'katakana' },
  { char: 'マ', romaji: 'ma', type: 'katakana' }, { char: 'ミ', romaji: 'mi', type: 'katakana' },
  { char: 'ム', romaji: 'mu', type: 'katakana' }, { char: 'メ', romaji: 'me', type: 'katakana' },
  { char: 'モ', romaji: 'mo', type: 'katakana' }, { char: 'ヤ', romaji: 'ya', type: 'katakana' },
  { char: 'ユ', romaji: 'yu', type: 'katakana' }, { char: 'ヨ', romaji: 'yo', type: 'katakana' },
  { char: 'ラ', romaji: 'ra', type: 'katakana' }, { char: 'リ', romaji: 'ri', type: 'katakana' },
  { char: 'ル', romaji: 'ru', type: 'katakana' }, { char: 'レ', romaji: 're', type: 'katakana' },
  { char: 'ロ', romaji: 'ro', type: 'katakana' }, { char: 'ワ', romaji: 'wa', type: 'katakana' },
  { char: 'ヲ', romaji: 'wo', type: 'katakana' }, { char: 'ン', romaji: 'n', type: 'katakana' },
];