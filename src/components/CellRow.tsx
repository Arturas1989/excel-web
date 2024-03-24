import { CellType } from "../types";
import { Cell } from "../components";

type CellRowProps = {
  row: CellType[];
};

export const CellRow = ({ row }: CellRowProps) => {
  return (
    <div className="cell-row">
      {row.map(cell => <Cell key={cell.address} cell={cell}/>)}
    </div>
  )
};
