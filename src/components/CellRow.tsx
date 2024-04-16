import { memo } from "react";
import { CellType, Methods } from "../types";
import { Cell } from "./Cell";
import {isEqual} from 'lodash';

type CellRowProps = {
  row: CellType[];
  methods: Methods;
  index: number;
};

const InitialCellRow = ({ row, methods, index }: CellRowProps) => {
  console.log('rendered row: ' + index)
  return (
    <div className="cell-row">
      {row.map(cell => {
        return (
          <Cell
            key={cell.address}
            cell={cell}
            methods={methods}
            cellStyle={cell.cellStyles}
          />
        );
      })}
    </div>
  );
};

const propsAreEqual = (oldProps: CellRowProps, newProps: CellRowProps) => {
  let prop: keyof CellRowProps;
  for(prop in oldProps){
    if(!isEqual(oldProps[prop], newProps[prop])) return false;
  }
  return true;
}

export const CellRow = memo(InitialCellRow, propsAreEqual);
