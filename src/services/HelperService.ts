import { IGroupedWineData, IWineData } from "../models";

export class HelperService {

    // function to calculate the mean
    static calculateMean(wineDataList: IWineData[], key: string): number {
        let sum: number = 0;
        wineDataList.forEach((data: any) => {
            sum += +data[key];
        })
        return +(sum / wineDataList.length).toFixed(3);    
    }

    // function to calculate the median
    static calculateMedian(wineDataList: IWineData[], key: string): number {
        const medianValues: number[] = [];
        wineDataList.forEach((data: any) => {
            medianValues.push(typeof(data[key]) === 'string' ? +data[key] : data[key])
        })
        const sortedMedianValues = medianValues.sort((a: number, b: number) => a-b);
        const middleIndex = Math.floor(sortedMedianValues.length / 2);
        if (sortedMedianValues.length % 2 === 0) {
            return +((sortedMedianValues[middleIndex - 1] + sortedMedianValues[middleIndex]) / 2).toFixed(3);
        } else {
            return +sortedMedianValues[middleIndex].toFixed(3);
        }
    }

    // function to calculate the mode
    static calculateMode(wineDataList: IWineData[], key: string): number {
        let modeFrequency: any = {};
        let maxCount: number = 0;
        let mode: number = 0;
        wineDataList.forEach((wineData: any) => {
            const value = typeof(wineData[key]) === 'string' ? +wineData[key] : wineData[key];
            modeFrequency[value] = (+modeFrequency[value] || 0) + 1;
            if (modeFrequency[value] > maxCount) {
                maxCount = modeFrequency[value];
                mode = value;
            } else if (modeFrequency[value] === maxCount) {
                mode = value;
            }
        });
        return mode;
    }

    // function to group the wine data based on Alcohol
    static transfromWineDataToGroupedWineData(wineDataList: IWineData[]): IGroupedWineData[] {
        const classList: number[] = [];
        const groupedWineDataList: IGroupedWineData[] = [];
        wineDataList.forEach((wineData: IWineData) => {
            if(classList.includes(wineData.Alcohol)) {
                if(groupedWineDataList.length) {
                    groupedWineDataList.forEach((groupeWineData: IGroupedWineData) => {
                        if(groupeWineData.Alcohol === wineData.Alcohol) {
                            groupeWineData.wineData.push(wineData);
                        } 
                    })
                }
            } else {
                classList.push(wineData.Alcohol);
                groupedWineDataList.push({
                    class: `Class${wineData.Alcohol}`,
                    wineData: [wineData],
                    Alcohol: wineData.Alcohol
                })
            }
        })
        return groupedWineDataList;
    }
}
