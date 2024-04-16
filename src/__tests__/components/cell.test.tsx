import renderer from 'react-test-renderer';
import { RenderHookResult, renderHook, fireEvent, render, screen } from '@testing-library/react';
import { CellContainer } from '../../components';
import { Cells } from '../../Workbook/Cells'
import { useMethods } from '../../hooks/useMethods';
import { WorkbookContext, useWorkbookContext } from '../../context';
import { Methods, WorkbookContextType, SelectionGrid } from '../../types';
import { useGrid } from '../../hooks/useGrid';

const getCell = () => {
  const cells = new Cells();
  const grid = cells.selectionGrid.grid;
  return grid['A1'];
}

const getMethods = () => {
  let contextHook: RenderHookResult<WorkbookContextType, WorkbookContextType>;
  let methodsHook: RenderHookResult<Methods, WorkbookContextType>;
  contextHook = renderHook(() => useWorkbookContext());
  const workbookContext = contextHook.result.current;

  methodsHook = renderHook(() => useMethods(workbookContext));
  const methods = methodsHook.result.current;
  return methods;
}

const getContextProps = () => {
  let gridHook: RenderHookResult<[SelectionGrid, React.Dispatch<React.SetStateAction<SelectionGrid>>, Cells], void>;
  gridHook = renderHook(() => useGrid());
  const contextProps = gridHook.result.current;
  return contextProps;
  
}

const renderContextProvider = () => {
  const [selectionGrid, setGrid, cellsObj] = getContextProps();
  render (
    <WorkbookContext.Provider value={{selectionGrid, setGrid, cellsObj}}>
      <CellContainer />
    </WorkbookContext.Provider>
  )
}

describe('Cell on click and render', () => {
  test('Cell snapshot', () => {
    const [selectionGrid, setGrid, cellsObj] = getContextProps();
    const tree = renderer
      .create(
        <WorkbookContext.Provider value={{selectionGrid, setGrid, cellsObj}}>
          <CellContainer />
        </WorkbookContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Cell is in the document', () => {
    renderContextProvider();
    const cell = screen.getAllByTestId('cell')[0];
    expect(cell).toBeInTheDocument();
  });

  test('Cell has selected border', () => {
    const Cell = new Cells();
    const selectedBorder = Cell.selectedBorder;

    renderContextProvider();
    const cell = screen.getAllByTestId('cell')[0];
    fireEvent.click(cell);

    const selectedCell = screen.getAllByTestId('cell')[0];
    expect(cell).toHaveStyle('border: ' + selectedBorder);
  });
});

describe('Cell on double click', () => {
  test('Cell has a cursorText class', () => {
    renderContextProvider();
    const cell = screen.getAllByTestId('cell')[0];
    expect(cell).not.toHaveClass('cursorText');
    
    fireEvent.doubleClick(cell);
    expect(cell).toHaveClass('cursorText');
  });
  
});

// describe('Cell on blur', () => {
//   const gridCell = getCell();
//   const methods = getMethods();
//   test('Cell has a cursorCell class', () => {
//     render(<Cell cell={gridCell} methods={methods} cellStyle={gridCell.cellStyles} />)
//     const cell = screen.getAllByTestId('cell')[0];
//     fireEvent.blur(cell);
//     expect(cell).toHaveClass('cursorCell');
//   });

//   test('Cell has no selected class', () => {
//     render(<Cell cell={gridCell} methods={methods} cellStyle={gridCell.cellStyles} />)
//     const cell = screen.getAllByTestId('cell')[0];
//     fireEvent.blur(cell);
//     expect(cell).not.toHaveClass('selected');
//   });
// });