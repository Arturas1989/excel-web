import { useRef, useState } from 'react';
import { CellType } from '../types';

type CellProps = {
  cell: CellType;
};

type DivInput = HTMLDivElement | null;

export const Cell = ({ cell }: CellProps) => {
  const cellRef = useRef<DivInput>(null);
  const [cursor, setCursor] = useState('cursorCell');
  const [selectedClass, setSelected] = useState('');
  const {cellStyles, contentStyles, selected, address, content, contentPaddingLeft} = cell;
  

  function enableEditing(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setCursor('cursorText');
    selectCell();
    if (cellRef.current!.contentEditable === 'true') return;
    cellRef.current!.contentEditable = 'true';
    cellRef.current!.focus();
    const content = cellRef.current!.textContent;

    //changes cursor position
    const range = document.createRange();
    const selection = window.getSelection();
    if (selection && content && content.length !== 0) {
      const start = cellRef.current!.offsetLeft + contentPaddingLeft;
      const letterWidth = cellRef.current!.offsetWidth / content.length;
      let pos = Math.min(
        Math.ceil((e.clientX - start) / letterWidth),
        content.length
      );
      if (pos < 0) pos = 0;
      if (cellRef.current!.firstChild) {
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
    setSelected('');
  }

  function selectCell() {
    setSelected('selected');
  }

  return (
    <div
      id={address}
      style={cellStyles}
      data-testid="cell"
      
      onDoubleClick={(e) => enableEditing(e)}
      onClick={() => selectCell()}
      onBlur={disableEditing}
      className={`cell ${cursor} ${selectedClass}`}
    >
      <div
        ref={cellRef}
        data-testid="content"
        spellCheck="false"
        className="content"
        style={contentStyles}
      >
        {content}
      </div>
    </div>
  );
};
