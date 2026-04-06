import React from 'react';

const LANGUAGES = [
  '',
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C#',
  'C++',
  'C',
  'Go',
  'Rust',
  'PHP',
  'Ruby',
  'Swift',
  'Kotlin',
  'Dart',
  'Scala',
  'Shell',
  'Lua',
  'R',
  'Perl',
  'Haskell',
  'Elixir',
  'Clojure',
  'Erlang',
  'Julia',
  'Zig',
  'Objective-C',
  'HTML',
  'CSS',
  'SCSS',
  'Vue',
  'Svelte',
];

const LanguageForm = ({ value, onChange }) => {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)} className="form-select form-select-sm">
      {LANGUAGES.map((lang) => (
        <option key={lang} value={lang}>
          {lang || 'All languages'}
        </option>
      ))}
    </select>
  );
};

export default LanguageForm;
