import { Cells } from '../Workbook/Cells';
import { SelectionGrid } from './SelectionGrid';

export type WorkbookContextType = {
  selectionGrid: SelectionGrid;
  setGrid: React.Dispatch<React.SetStateAction<SelectionGrid>>;
  cellsObj: Cells;
};
