import CSS from 'csstype';
import { type Grid, SelectionGrid } from '../types';


export class Cells {
  public selectionGrid: SelectionGrid;

  public selectedBorder: string;
  public ordinaryBorder: string;
  private cellStyles: CSS.Properties;
  private contentStyles: CSS.Properties;
  private selectedStyles: CSS.Properties;
  private screenWidth: number;
  private screenHeight: number;
  private cellPadding: number;
  private borderWidth: number;
  private contentHeight: number;
  private contentPaddingleft: number;
  private cellWidth: number;
  private cellHeight: number;
  public rows: number;
  public cols: number;

  constructor() {
    this.selectedBorder = '2.5px solid rgb(33, 115, 70)';
    this.cellPadding = 8;
    this.contentHeight = 16;
    this.cellWidth = 100;
    this.borderWidth = 1;
    this.contentPaddingleft = 1;
    this.ordinaryBorder = `${this.borderWidth}px solid rgb(212, 212, 212)`;
    this.selectedStyles = {};
    this.cellHeight = this.contentHeight + (this.cellPadding + this.borderWidth) * 2;
    this.cellStyles = {
      padding: this.cellPadding + 'px',
      width: this.cellWidth + 'px',
      border: `${this.borderWidth}px solid rgb(212, 212, 212)`,
      height: this.cellHeight + 'px',
      overflow: 'clip'
    };
    this.contentStyles = {
      fontSize: this.contentHeight + 'px',
      paddingLeft: this.contentPaddingleft + 'px',
    };

    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.rows = Math.ceil(this.screenHeight / this.cellHeight);
    this.cols = Math.ceil(this.screenWidth / this.cellWidth);

    this.selectionGrid = this.makeSelectionGrid({}, []);

    // this.updateProperties = this.updateProperties.bind(this);
    // window.addEventListener('resize', this.updateProperties);
  }

  updateDimensions() {
    
    if(window.innerWidth > this.screenWidth){
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
      this.rows = Math.round(this.screenHeight / this.cellHeight);
      this.cols = Math.round(this.screenWidth / this.cellWidth);
      // this.selectionGrid = this.makeSelectionGrid();
    }
  }

  getAddress(row: number, col: number): string{
    return this.getColName(col) + row;
  }
  
  makeSelectionGrid(oldGrid: Grid, oldSelection: string[]): SelectionGrid{
    this.updateDimensions();
    let grid = {} as Grid, selected = [...oldSelection] as string[];
    
    for(let i = 0; i < this.rows * this.cols; i++){
        const row = Math.floor(i / this.cols) + 1;
        const col = i % this.cols;
        const address = this.getAddress(row, col);
        if(address in oldGrid){
          grid[address] = {...oldGrid[address]};
        } else {
          grid[address] = {
            cellStyles: {...this.cellStyles},
            contentStyles: {...this.contentStyles},
            prevSelected: null,
            address,
            content: '',
            contentPaddingLeft: this.contentPaddingleft,
            row,
            col,
            index: i 
          }
        }
    }
    return {grid, selected};
  }

  getColName(col: number): string{
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let colLetters = [];
    while(col !== -1){
      const rem = col % 26;
      colLetters.push(letters[rem]) ;
      col = (col - rem) / 26 - 1;
    }
    return colLetters.reverse().join('');
  }
}
