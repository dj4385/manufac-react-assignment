import { createContext } from "react";
import { IWineData } from "../models";

export const WineDataContext = createContext<IWineData[]>([]);
