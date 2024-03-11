import { useRef, useState } from 'react';
import './App.css';

type DivInput = HTMLDivElement | null;

function App() {
  const cellRef = useRef<DivInput>(null);
  const [cursor, setCursor] = useState('cursorCell');
  const content = 'afg';

  function enableEditing(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setCursor('cursorText');
    if(cellRef.current!.contentEditable === 'true') return;
    cellRef.current!.contentEditable = 'true';
    cellRef.current!.focus();
    const content = cellRef.current!.textContent;

    //changes cursor position
    const range = document.createRange();
    const selection = window.getSelection();
    if (selection && content && content.length !== 0) {
      const start = cellRef.current!.offsetLeft;
      const letterWidth = cellRef.current!.offsetWidth / content.length;
      let pos = Math.min(Math.ceil((e.clientX - start) / letterWidth), content.length);
      if(pos < 0) pos = 0;
      if(cellRef.current!.firstChild){
        range.setStart(cellRef.current!.firstChild, pos);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }

  function disableEditing() {
    cellRef.current!.contentEditable = 'false';
    setCursor('cursorCell');
  }

  return (
    <div className="App">
      <div
        onDoubleClick={(e) => enableEditing(e)}
        onBlur={disableEditing}
        className={`cell ${cursor}`}
        
      >
        {' '}
        <div ref={cellRef} className="content">{content}</div>{' '}
      </div>
    </div>
  );
}

export default App;
