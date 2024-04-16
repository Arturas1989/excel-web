import CSS from 'csstype';
import { Grid } from '../../types';

export const updateStyle = (grid: Grid, address: string, property: keyof CSS.Properties, value: string) => {
  let cell = {...grid[address]};
  cell['cellStyles'] = {...cell['cellStyles'], [property] : value};
  grid[address] = cell;
}

export const resetPrevSelected = (selected: string[], grid: Grid, address: string, resetBorder: string) => {
  if(selected.length){
    const prevAddress = selected.pop() as string;
    if(prevAddress !== address) updateStyle(grid, prevAddress, 'border', resetBorder);
  }
}