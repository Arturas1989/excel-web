import { useGrid } from './hooks/useGrid';
import { WorkbookContext } from './context/useWorkbookContext';
import { CellContainer } from './components';

function App() {
  const [selectionGrid, setGrid, cellsObj] = useGrid();

  return (
    <WorkbookContext.Provider value={{selectionGrid, setGrid, cellsObj}}>
      <CellContainer />
    </WorkbookContext.Provider>
  );
}

export default App;
