import { DivInput } from '../../types';

export function getAddress(row: number, col: number): string {
  return getColName(col) + row;
}

export function getColName(col: number): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let colLetters = [];
  while (col !== -1) {
    const rem = col % 26;
    colLetters.push(letters[rem]);
    col = (col - rem) / 26 - 1;
  }
  return colLetters.reverse().join('');
}

export function setCursorPositionInACell(
  content: string | null,
  cellRef: React.MutableRefObject<DivInput>,
  contentPaddingLeft: number,
  e: React.MouseEvent<HTMLDivElement, MouseEvent>
) {
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
