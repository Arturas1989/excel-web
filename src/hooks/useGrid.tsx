import { useEffect, useState } from "react";
import { Cells } from "../Workbook/Cells";
import { type Row } from "../types";

export const useGrid = (): [Row[],  React.Dispatch<React.SetStateAction<Row[]>>] => {
  const cells = new Cells();
  const [grid, setGrid] = useState<Row[]>(cells.grid);
  
  useEffect(() => {
    const updateGrid = () => {
      setGrid(cells.grid);
    }
    window.addEventListener('resize', updateGrid);

    return () => window.removeEventListener('resize', updateGrid);
  },[cells.grid])
  return [grid, setGrid];
};
