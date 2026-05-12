import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { themes } from '../../store/themes';

// Calculator - Fixed
export const CalculatorApp: React.FC = () => {
  const theme = themes[useStore(s => s.settings).theme];
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay(String(-parseFloat(display)));
  };

  const inputPercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue;
      let newValue = currentValue;

      switch (operator) {
        case '+': newValue = currentValue + inputValue; break;
        case '-': newValue = currentValue - inputValue; break;
        case '×': newValue = currentValue * inputValue; break;
        case '÷': newValue = inputValue !== 0 ? currentValue / inputValue : 0; break;
      }

      setDisplay(String(parseFloat(newValue.toFixed(10))));
      setPrevValue(newValue);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = () => {
    if (!operator || prevValue === null) return;

    const inputValue = parseFloat(display);
    let newValue = prevValue;

    switch (operator) {
      case '+': newValue = prevValue + inputValue; break;
      case '-': newValue = prevValue - inputValue; break;
      case '×': newValue = prevValue * inputValue; break;
      case '÷': newValue = inputValue !== 0 ? prevValue / inputValue : 0; break;
    }

    setDisplay(String(parseFloat(newValue.toFixed(10))));
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const Button: React.FC<{ value: string; wide?: boolean; accent?: boolean; onClick: () => void }> = ({ value, wide, accent, onClick }) => (
    <button
      onClick={onClick}
      className={`${wide ? 'col-span-2' : ''} h-14 rounded-xl text-lg font-medium transition-all active:scale-95 hover:brightness-110`}
      style={{ background: accent ? theme.accent : theme.bgTertiary, color: accent ? '#fff' : theme.text }}
    >
      {value}
    </button>
  );

  return (
    <div className="flex flex-col h-full p-4" style={{ color: theme.text, background: theme.bg }}>
      {/* Display */}
      <div className="text-right text-4xl font-light mb-4 px-4 py-6 rounded-xl min-h-[80px] flex items-end justify-end overflow-hidden"
        style={{ background: theme.bgTertiary }}>
        <span className="truncate">{display}</span>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        <Button value="C" onClick={clear} />
        <Button value="±" onClick={toggleSign} />
        <Button value="%" onClick={inputPercent} />
        <Button value="÷" accent onClick={() => performOperation('÷')} />

        <Button value="7" onClick={() => inputDigit('7')} />
        <Button value="8" onClick={() => inputDigit('8')} />
        <Button value="9" onClick={() => inputDigit('9')} />
        <Button value="×" accent onClick={() => performOperation('×')} />

        <Button value="4" onClick={() => inputDigit('4')} />
        <Button value="5" onClick={() => inputDigit('5')} />
        <Button value="6" onClick={() => inputDigit('6')} />
        <Button value="-" accent onClick={() => performOperation('-')} />

        <Button value="1" onClick={() => inputDigit('1')} />
        <Button value="2" onClick={() => inputDigit('2')} />
        <Button value="3" onClick={() => inputDigit('3')} />
        <Button value="+" accent onClick={() => performOperation('+')} />

        <Button value="0" wide onClick={() => inputDigit('0')} />
        <Button value="." onClick={inputDot} />
        <Button value="=" accent onClick={calculate} />
      </div>
    </div>
  );
};

// Notes
export const NotesApp: React.FC = () => {
  const theme = themes[useStore(s => s.settings).theme];
  const [notes, setNotes] = useState<{ id: string; title: string; text: string }[]>(() => {
    try {
      const s = localStorage.getItem('cemos-notes');
      return s ? JSON.parse(s) : [{ id: '1', title: 'Welcome', text: 'Welcome to CemOS Notes!\n\nStart typing here...' }];
    } catch {
      return [{ id: '1', title: 'Welcome', text: 'Welcome to CemOS Notes!' }];
    }
  });
  const [active, setActive] = useState(notes[0]?.id);

  const save = (updated: typeof notes) => {
    setNotes(updated);
    localStorage.setItem('cemos-notes', JSON.stringify(updated));
  };

  const current = notes.find(n => n.id === active);

  const addNote = () => {
    const id = Date.now().toString();
    const updated = [{ id, title: 'Untitled', text: '' }, ...notes];
    save(updated);
    setActive(id);
  };

  const deleteNote = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    save(updated);
    if (active === id && updated.length > 0) setActive(updated[0].id);
  };

  return (
    <div className="flex h-full" style={{ color: theme.text }}>
      <div className="w-48 shrink-0 flex flex-col py-2 border-r overflow-y-auto no-scrollbar" style={{ background: theme.bgSecondary, borderColor: theme.border }}>
        <div className="flex items-center justify-between px-3 pb-2 mb-1 border-b" style={{ borderColor: theme.border }}>
          <span className="text-xs font-semibold">Notes</span>
          <button onClick={addNote} className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10" style={{ color: theme.accent }}>+</button>
        </div>
        {notes.map(n => (
          <div key={n.id} className="flex items-center group mx-1">
            <button onClick={() => setActive(n.id)} className="flex-1 text-left px-3 py-1.5 rounded text-[12px] transition-colors truncate"
              style={{ background: active === n.id ? `${theme.accent}15` : undefined, color: active === n.id ? theme.accent : theme.textSecondary }}>
              {n.title || 'Untitled'}
            </button>
            <button onClick={() => deleteNote(n.id)} className="opacity-0 group-hover:opacity-100 p-1 text-xs" style={{ color: theme.textMuted }}>×</button>
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col p-4">
        {current ? (
          <>
            <input
              value={current.title}
              onChange={e => save(notes.map(n => n.id === active ? { ...n, title: e.target.value } : n))}
              className="text-lg font-semibold bg-transparent outline-none mb-3 pb-2 border-b"
              style={{ color: theme.text, borderColor: theme.border }}
              placeholder="Title"
            />
            <textarea
              value={current.text}
              onChange={e => save(notes.map(n => n.id === active ? { ...n, text: e.target.value } : n))}
              className="flex-1 bg-transparent outline-none resize-none text-sm leading-relaxed"
              style={{ color: theme.textSecondary }}
              placeholder="Start typing..."
            />
          </>
        ) : (
          <p className="text-xs m-auto" style={{ color: theme.textMuted }}>No note selected</p>
        )}
      </div>
    </div>
  );
};

// Terminal
export const TerminalApp: React.FC = () => {
  useStore(s => s.settings);
  const [lines, setLines] = useState<string[]>(['CemOS Terminal v11.3.0', 'Type "help" for commands.', '']);
  const [input, setInput] = useState('');

  const exec = (cmd: string) => {
    const c = cmd.trim().toLowerCase();
    let out = '';
    if (c === 'help') out = 'Commands: help, clear, date, whoami, neofetch, echo [text], zoro';
    else if (c === 'clear') { setLines([]); setInput(''); return; }
    else if (c === 'date') out = new Date().toString();
    else if (c === 'whoami') out = 'user@cemos-desktop';
    else if (c === 'zoro') out = '╔═══════════════════════════════╗\n║     ZORO ECOSYSTEM v2.0       ║\n║   Creating the future, today  ║\n╚═══════════════════════════════╝';
    else if (c === 'neofetch') out = `       ╭──────────╮
       │  CemOS   │    user@cemos
       │    11    │    OS: CemOS 11 Pro
       ╰──────────╯    Kernel: 11.3.0
    ╭──────────────╮   Shell: cemsh
    │   ░░░░░░░░   │   CPU: Virtual @ 3.6GHz
    │   ░░░░░░░░   │   Memory: 16GB
    │   ░░░░░░░░   │   by ZORO
    ╰──────────────╯`;
    else if (c.startsWith('echo ')) out = cmd.slice(5);
    else if (c) out = `cemsh: command not found: ${cmd}`;
    setLines([...lines, `$ ${cmd}`, ...(out ? out.split('\n') : [])]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full p-3 font-mono text-xs" style={{ background: 'rgba(0,0,0,0.92)', color: '#00ff41' }}>
      <div className="flex-1 overflow-y-auto whitespace-pre-wrap no-scrollbar">
        {lines.map((l, i) => <div key={i}>{l}</div>)}
      </div>
      <form onSubmit={e => { e.preventDefault(); exec(input); }} className="flex items-center gap-1 mt-2 pt-2 border-t border-green-900">
        <span className="text-green-400">$</span>
        <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 bg-transparent outline-none" style={{ color: '#00ff41' }} autoFocus />
      </form>
    </div>
  );
};
