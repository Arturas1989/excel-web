import CSS from 'csstype';

export type CellType = {
  cellStyles: CSS.Properties;
  contentStyles: CSS.Properties;
  selected: '' | 'selected';
  address: string;
  content: string;
  contentPaddingLeft: number;
  row: number;
  col: number;
};