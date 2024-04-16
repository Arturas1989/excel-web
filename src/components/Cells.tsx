import { Methods, Grid } from '../types';
import { getAddress } from '../utils/helpers/cellHelper';
import { CellRow } from './CellRow';

type CellRowProps = {
  grid: Grid;
  rows: number;
  cols: number;
  methods: Methods;
};

export const Cells = ({ grid, rows, cols, methods }: CellRowProps) => {
  let cells = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      const address = getAddress(i, j);
      if(grid[address]) row.push(grid[address]);
    }
    cells.push(row);
  }

  return (
    <>
      {cells.map((row, i) => {
        return <CellRow key={i} row={row} methods={methods} index={i}/>
      })}
    </>
  );
};
