import CSS from 'csstype';
import { type CellType, Row } from '../types';




export class Cells {
  public grid: Row[];
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
  private rows: number;
  private cols: number;

  constructor() {
    this.cellPadding = 8;
    this.contentHeight = 16;
    this.cellWidth = 100;
    this.borderWidth = 1;
    this.contentPaddingleft = 1;
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

    this.grid = this.makeGrid();

    this.updateProperties = this.updateProperties.bind(this);
    window.addEventListener('resize', this.updateProperties);
  }

  updateProperties() {
    
    if(window.innerWidth > this.screenWidth){
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
      this.rows = Math.round(this.screenHeight / this.cellHeight);
      this.cols = Math.round(this.screenWidth / this.cellWidth);
      this.grid = this.makeGrid();
    }
  }

  

  makeGrid(): Row[]{
    console.log(this.cellHeight)
    let grid = [];
    for(let i = 0; i < this.rows; ++i){
      let row = [];
      for(let j = 0; j < this.cols; ++j){
        row.push({
          cellStyles: this.cellStyles,
          contentStyles: this.contentStyles,
          selected: '',
          address: this.getColName(j) + (i + 1),
          content: '',
          contentPaddingLeft: this.contentPaddingleft,
          row: i,
          col: j,
        } as CellType)
      }
      grid.push(row);
    }
    return grid;
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
