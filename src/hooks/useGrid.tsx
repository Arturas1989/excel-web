import { useEffect, useMemo, useState } from "react";
import { Cells } from "../Workbook/Cells";
import { type SelectionGrid } from "../types";

export const useGrid = (): [SelectionGrid,  React.Dispatch<React.SetStateAction<SelectionGrid>>, Cells] => {
  const cells = useMemo(() => {
    return new Cells();
  }, []) 
  const [selectionGrid, setSelectionGrid] = useState<SelectionGrid>(cells.selectionGrid);
  
  useEffect(() => {
    const updateGrid = () => {
      const {grid, selected} = selectionGrid;
      setSelectionGrid(cells.makeSelectionGrid(grid, selected));
    }
    window.addEventListener('resize', updateGrid);

    return () => window.removeEventListener('resize', updateGrid);
  },[cells, selectionGrid])
  return [selectionGrid, setSelectionGrid, cells];
};
