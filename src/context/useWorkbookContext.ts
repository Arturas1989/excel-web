import { createContext, useContext } from "react";
import { WorkbookContextType } from "../types";

export const WorkbookContext = createContext({} as WorkbookContextType);

export const useWorkbookContext = () => useContext(WorkbookContext);