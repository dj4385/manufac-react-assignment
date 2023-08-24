import { useContext, useEffect, useState } from 'react'
import { WineDataContext } from '../context'
import { IGroupedWineData, ITableData, IWineData } from '../models';
import { HelperService } from '../services/HelperService';
import Table from '../components/Table';

function Flavanoids() {
    const [finalGroupedWineDataList, setFinalGroupedWineDataList] = useState<any[]>([]);
    const [tableList, setTableData] = useState<ITableData[]>([]);
    const analyticsList: string[] = ['Mean', 'Median', 'Mode']
    const wineDataList: IWineData[] = useContext(WineDataContext);

    // function to calculate the class-wise mean, median mode
    const calculateClassBaseData = () => {
        let groupedWineDataList = HelperService.transfromWineDataToGroupedWineData(wineDataList);    
        if(groupedWineDataList?.length) {
            groupedWineDataList = groupedWineDataList.map((groupedWineData: IGroupedWineData) => {
                groupedWineData.mean = HelperService.calculateMean(groupedWineData.wineData, 'Flavanoids');
                groupedWineData.median =  HelperService.calculateMedian(groupedWineData.wineData, 'Flavanoids');
                groupedWineData.mode = HelperService.calculateMode(groupedWineData.wineData, 'Flavanoids');
                return groupedWineData;
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
                    label: `Flavanoids ${list}`,
                    analyticsData: listData
                })
            })

            if(arr.length) {
                setTableData(arr);
            }
        }
    }

    useEffect(() => {
        calculateClassBaseData()
    }, [])

    return (
        <div>
            <h1>
                Flavanoids Data 
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

export default Flavanoids