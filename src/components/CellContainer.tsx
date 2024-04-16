import { useWorkbookContext } from '../context/useWorkbookContext';
import { Cells } from '../components';
import { useMethods } from '../hooks/useMethods';

export const CellContainer = () => {
  const workbookContext = useWorkbookContext();
  const { selectionGrid, cellsObj } = workbookContext;
  const { rows, cols } = cellsObj;

  const methods = useMethods(workbookContext);

  const { grid } = selectionGrid;

  return (
    <div className="cell-container">
      <Cells grid={grid} rows={rows} cols={cols} methods={methods}/>
    </div>
  );
};
