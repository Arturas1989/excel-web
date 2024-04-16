import CSS from 'csstype';

export type CellType = {
  cellStyles: CSS.Properties;
  contentStyles: CSS.Properties;
  prevSelected: null | number;
  address: string;
  content: string;
  contentPaddingLeft: number;
  row: number;
  col: number;
  index: number;
};