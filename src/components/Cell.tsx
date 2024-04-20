import { memo, useRef, useState } from 'react';
import { setCursorPositionInACell } from '../utils/helpers/cellHelper';
import { type DivInput, CellType, Methods } from '../types';
import CSS from 'csstype';

type CellProps = {
  cell: CellType;
  methods: Methods;
  cellStyle: CSS.Properties;
};

const InitialCell = ({ cell, methods, cellStyle }: CellProps) => {
  const cellRef = useRef<DivInput>(null);
  const [cursor, setCursor] = useState('cursorCell');
  const {
    contentStyles,
    address,
    content,
    contentPaddingLeft,
  } = cell;
  
  const {changeSelected} = methods;
  if(address === 'A1')console.log(cellStyle)

  function enableEditing(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setCursor('cursorText');
    selectCell();
    if (cellRef.current!.contentEditable === 'true') return;
    cellRef.current!.contentEditable = 'true';
    cellRef.current!.focus();
    const content = cellRef.current!.textContent;

    //changes cursor position
    setCursorPositionInACell(content, cellRef, contentPaddingLeft, e)
  }

  function disableEditing() {
    cellRef.current!.contentEditable = 'false';
    setCursor('cursorCell');
    changeSelected('ordinary', address);
  }

  function selectCell() {
    changeSelected('selected', address);
  }


  return (
    <div
      id={address}
      style={cellStyle}
      data-testid={address}
      onDoubleClick={(e) => enableEditing(e)}
      onClick={() => selectCell()}
      onBlur={disableEditing}
      className={`cell ${cursor}`}
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

export const Cell = memo(InitialCell);
