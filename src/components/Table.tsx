import React from 'react'
import { ITableProps } from '../models/components/ITable';
import { IGroupedWineData, ITableData } from '../models';

function Table({
    finalGroupedWineDataList,
    tableList
}: ITableProps) {
  return (
    <div className="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>
                        Measure
                    </th>
                    {
                        finalGroupedWineDataList.map((data: IGroupedWineData, index: number) => (
                            <th key={index}>
                                {data.class}
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    tableList.map((data: ITableData, index: number) => (
                        <tr key={index}>
                            <td>
                                {data.label}
                            </td>
                            {
                                data.analyticsData.length ? data.analyticsData.map((value: number, i: number) => (
                                    <td key={i}>
                                        {value}
                                    </td>
                                )) : null
                            }
                        </tr>
                    ))

                }
            </tbody>
            <tbody></tbody>
        </table>
    </div>
  )
}

export default Table;