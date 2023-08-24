export interface IWineData {
    "Alcalinity of ash": number,
    "Alcohol": number,
    "Ash": number,
    "Color intensity": number,
    "Flavanoids": number
    "Hue": number,
    "Magnesium": number,
    "Malic Acid": number,
    "Nonflavanoid phenols": number,
    "OD280/OD315 of diluted wines": number,
    "Proanthocyanins": string,
    "Total phenols": number,
    "Unknown": number,
    "Gamma"?: number
}

export interface IGroupedWineData {
    class: string,
    wineData: IWineData[],
    Alcohol: number,
    mean?: number,
    median?: number,
    mode?: number,
    label?: string
}

export interface ITableData {
    label: string,
    analyticsData: number[]
}