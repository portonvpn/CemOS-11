import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { themes } from '../../store/themes';

// Calculator
export const CalculatorApp: React.FC = () => {
  const theme = themes[useStore(s=>s.settings).theme];
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<string|null>(null);
  const [op, setOp] = useState<string|null>(null);
  const [fresh, setFresh] = useState(true);

  const input = (v: string) => {
    if (fresh) { setDisplay(v); setFresh(false); } else { setDisplay(display === '0' ? v : display + v); }
  };
  const doOp = (o: string) => { setPrev(display); setOp(o); setFresh(true); };
  const calc = () => {
    if (!prev || !op) return;
    const a = parseFloat(prev), b = parseFloat(display);
    let r = 0;
    if (op === '+') r = a + b; if (op === '-') r = a - b; if (op === '×') r = a * b; if (op === '÷') r = b !== 0 ? a / b : 0;
    setDisplay(String(parseFloat(r.toFixed(8)))); setPrev(null); setOp(null); setFresh(true);
  };
  const clear = () => { setDisplay('0'); setPrev(null); setOp(null); setFresh(true); };

  const Btn: React.FC<{v:string;w?:boolean;accent?:boolean;action?:()=>void}> = ({v,w,accent,action}) => (
    <button onClick={action||(()=>v.match(/\d|\./) ? input(v) : v==='C' ? clear() : v==='=' ? calc() : doOp(v))}
      className={`${w?'col-span-2':''} h-12 rounded-lg text-sm font-medium transition-all active:scale-95 hover:brightness-110`}
      style={{background: accent ? theme.accent : theme.bgTertiary, color: accent ? '#fff' : theme.text}}>
      {v}
    </button>
  );

  return (
    <div className="flex flex-col h-full p-4" style={{color:theme.text}}>
      <div className="text-right text-3xl font-light mb-4 px-2 py-4 rounded-xl min-h-[64px] flex items-end justify-end" style={{background:theme.bgTertiary,color:theme.text}}>
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1.5 flex-1">
        <Btn v="C"/><Btn v="±" action={()=>setDisplay(String(-parseFloat(display)))}/><Btn v="%"action={()=>setDisplay(String(parseFloat(display)/100))}/><Btn v="÷" accent/>
        <Btn v="7"/><Btn v="8"/><Btn v="9"/><Btn v="×" accent/>
        <Btn v="4"/><Btn v="5"/><Btn v="6"/><Btn v="-" accent/>
        <Btn v="1"/><Btn v="2"/><Btn v="3"/><Btn v="+" accent/>
        <Btn v="0" w/><Btn v="."/><Btn v="=" accent/>
      </div>
    </div>
  );
};

// Notes
export const NotesApp: React.FC = () => {
  const theme = themes[useStore(s=>s.settings).theme];
  const [notes, setNotes] = useState<{id:string;title:string;text:string}[]>(() => {
    try { const s = localStorage.getItem('cemos-notes'); return s ? JSON.parse(s) : [{id:'1',title:'Welcome',text:'Welcome to CemOS Notes! Start typing...'}]; } catch { return [{id:'1',title:'Welcome',text:'Welcome to CemOS Notes!'}]; }
  });
  const [active, setActive] = useState(notes[0]?.id);

  const save = (updated: typeof notes) => { setNotes(updated); localStorage.setItem('cemos-notes', JSON.stringify(updated)); };
  const current = notes.find(n=>n.id===active);

  return (
    <div className="flex h-full" style={{color:theme.text}}>
      <div className="w-44 shrink-0 flex flex-col py-2 border-r overflow-y-auto no-scrollbar" style={{background:theme.bgSecondary,borderColor:theme.border}}>
        <div className="flex items-center justify-between px-3 pb-2 mb-1 border-b" style={{borderColor:theme.border}}>
          <span className="text-xs font-semibold" style={{color:theme.text}}>📝 Notes</span>
          <button onClick={()=>{const id=Date.now().toString();const upd=[{id,title:'Untitled',text:''},...notes];save(upd);setActive(id);}}
            className="text-xs px-1.5 py-0.5 rounded hover:bg-white/10" style={{color:theme.accent}}>+</button>
        </div>
        {notes.map(n=>(
          <button key={n.id} onClick={()=>setActive(n.id)} className="text-left px-3 py-1.5 mx-1 rounded text-[12px] transition-colors"
            style={{background:active===n.id?`${theme.accent}10`:undefined,color:active===n.id?theme.accent:theme.textSecondary}}>
            {n.title||'Untitled'}
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col p-3">
        {current ? (<>
          <input value={current.title} onChange={e=>{const u=notes.map(n=>n.id===active?{...n,title:e.target.value}:n);save(u);}}
            className="text-base font-semibold bg-transparent outline-none mb-2 pb-2 border-b" style={{color:theme.text,borderColor:theme.border}} placeholder="Title"/>
          <textarea value={current.text} onChange={e=>{const u=notes.map(n=>n.id===active?{...n,text:e.target.value}:n);save(u);}}
            className="flex-1 bg-transparent outline-none resize-none text-[13px] leading-relaxed" style={{color:theme.textSecondary}} placeholder="Start typing..."/>
        </>) : <p className="text-xs m-auto" style={{color:theme.textMuted}}>No note selected</p>}
      </div>
    </div>
  );
};

// Terminal
export const TerminalApp: React.FC = () => {
  useStore(s=>s.settings);
  const [lines, setLines] = useState<string[]>(['CemOS Terminal v11.3.0', 'Type "help" for available commands.', '']);
  const [input, setInput] = useState('');

  const exec = (cmd: string) => {
    const c = cmd.trim().toLowerCase();
    let out = '';
    if (c === 'help') out = 'Commands: help, clear, date, whoami, neofetch, echo [text], uname';
    else if (c === 'clear') { setLines([]); setInput(''); return; }
    else if (c === 'date') out = new Date().toString();
    else if (c === 'whoami') out = 'user@cemos-desktop';
    else if (c === 'uname') out = 'CemOS 11.3.0 x86_64';
    else if (c === 'neofetch') out = '       ██████\n     ██      ██\n    ██  CemOS  ██    user@cemos-desktop\n     ██      ██     OS: CemOS 11 Pro\n       ██████       Kernel: 11.3.0\n                    Shell: cemsh\n                    CPU: Virtual @ 3.6GHz\n                    Memory: 16GB';
    else if (c.startsWith('echo ')) out = cmd.slice(5);
    else if (c) out = `cemsh: command not found: ${cmd}`;
    setLines([...lines, `$ ${cmd}`, ...(out ? out.split('\n') : []), '']);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full p-3 font-mono text-xs" style={{background:'rgba(0,0,0,0.85)',color:'#00ff41'}}>
      <div className="flex-1 overflow-y-auto whitespace-pre-wrap no-scrollbar">{lines.map((l,i)=><div key={i}>{l}</div>)}</div>
      <form onSubmit={e=>{e.preventDefault();exec(input)}} className="flex items-center gap-1 mt-1">
        <span>$</span>
        <input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 bg-transparent outline-none" style={{color:'#00ff41'}} autoFocus/>
      </form>
    </div>
  );
};
