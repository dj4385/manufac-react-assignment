import { useContext, useEffect, useState } from "react";
import { WineDataContext } from "../context";
import { IGroupedWineData, ITableData, IWineData } from "../models";
import { HelperService } from "../services/HelperService";
import Table from "../components/Table";

function Gamma() {
    const [finalGroupedWineDataList, setFinalGroupedWineDataList] = useState<IGroupedWineData[]>([]);
    const [tableList, setTableData] = useState<ITableData[]>([]);
    const analyticsList: string[] = ['Mean', 'Median', 'Mode']
    let wineDataList: IWineData[] = useContext(WineDataContext);

    // function to calculate the class-wise mean, median mode
    const calculateClassBaseData = () => {
        wineDataList = wineDataList.map((wineData: IWineData) => {
            wineData.Gamma = +((wineData.Ash * wineData.Hue) / wineData.Magnesium).toFixed(3);
            return wineData;
        })
        let groupedWineDataList = HelperService.transfromWineDataToGroupedWineData(wineDataList);    
        if(groupedWineDataList?.length) {
            groupedWineDataList = groupedWineDataList.map((groupedWineData: IGroupedWineData) => {
                groupedWineData.mean = HelperService.calculateMean(groupedWineData.wineData, 'Gamma')
                groupedWineData.median =  HelperService.calculateMedian(groupedWineData.wineData, 'Gamma');
                groupedWineData.mode = HelperService.calculateMode(groupedWineData.wineData, 'Gamma')
                return groupedWineData
            })
            setFinalGroupedWineDataList(groupedWineDataList);
            let arr: ITableData[] = [];
            analyticsList.forEach((list) => {
                let listData: any[] = [];
                groupedWineDataList.forEach((groupedWineData: IGroupedWineData) => {
                    if(list === 'Mean') {
                        listData.push(groupedWineData.mean)
                    }
                    if(list === 'Median') {
                        listData.push(groupedWineData.median)
                    }
                    if(list === 'Mode') {
                        listData.push(groupedWineData.mode)
                    }
                })
                arr.push({
                    label: `Gamma ${list}`,
                    analyticsData: listData
                })
            })

            if(arr.length) {
                setTableData(arr);
            }
        }
    }

    useEffect(() => {
        calculateClassBaseData();
    }, [])

    return (
        <div>
            <h1>
                Gamma Data 
            </h1>
            {
                finalGroupedWineDataList?.length ? (
                    <Table
                        finalGroupedWineDataList={finalGroupedWineDataList}
                        tableList={tableList}
                    />
                ) : null
            }
        </div>
    )
}

export default Gamma