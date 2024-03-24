import { CellRow } from './components/CellRow';
import { useGrid } from './hooks/useGrid';

function App() {
  const [grid, setGrid] = useGrid();

  return (<div className='cell-container'>
    {grid.map((row, i) => <CellRow key={i} row={row} />)}
  </div>);
}

export default App;
