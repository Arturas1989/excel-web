import { useCallback, useMemo } from "react";
import { resetPrevSelected, updateStyle } from "../utils";
import { WorkbookContextType } from "../types";


export const useMethods = (workbookContext: WorkbookContextType) => {
  const { setGrid, cellsObj } = workbookContext;
  const { selectedBorder, ordinaryBorder } = cellsObj;
  const changeSelected = useCallback(
    (borderType: 'selected' | 'ordinary', address: string) => {
      const border =
        borderType === 'selected' ? selectedBorder : ordinaryBorder;
      setGrid((prevObj) => {
        const { grid, selected } = prevObj;

        let newGrid = {...grid};
        updateStyle(newGrid, address, 'border', border);

        let newSelected = [...selected];
        resetPrevSelected(newSelected, newGrid, address, ordinaryBorder);

        newSelected.push(address);
        return { grid: newGrid, selected: newSelected };
      });
    },
    [ordinaryBorder, selectedBorder, setGrid]
  );

  const methods = useMemo(() => {
    return {changeSelected};
  },[changeSelected])
  return methods;
}