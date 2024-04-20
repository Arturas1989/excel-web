import renderer from 'react-test-renderer';
import { RenderHookResult, renderHook, fireEvent, render, screen } from '@testing-library/react';
import { CellContainer } from '../../components';
import { Cells } from '../../Workbook/Cells'
import { WorkbookContext } from '../../context';
import { SelectionGrid } from '../../types';
import { useGrid } from '../../hooks/useGrid';

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
    const cell = screen.getByTestId('A1');
    expect(cell).toBeInTheDocument();
  });
});

describe('Cell on double click', () => {
  test('Cell has a cursorText class', () => {
    renderContextProvider();
    const cell = screen.getByTestId('A1');
    expect(cell).not.toHaveClass('cursorText');
    
    fireEvent.doubleClick(cell);
    expect(cell).toHaveClass('cursorText');
  });
  
});
describe('Cell on blur', () => {
  test('Cell has a cursorCell class', () => {
    renderContextProvider();
    const cell = screen.getByTestId('A1');
    fireEvent.blur(cell);
    expect(cell).toHaveClass('cursorCell');
  });

  test('Cell has no selected class', () => {
    renderContextProvider();
    const cell = screen.getByTestId('A1');
    fireEvent.blur(cell);
    expect(cell).not.toHaveClass('selected');
  });
});