import { WineDataContext } from "../context";
import wineDataJson  from "../assets/wine-data.json";



export const WineDataProvider = ({
    children
}: any) => {
    const wineData: any = wineDataJson;

    return <WineDataContext.Provider value={wineData}>{children}</WineDataContext.Provider>
}
