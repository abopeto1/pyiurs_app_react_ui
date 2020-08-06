import React from 'react'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'
import Chart from './Chart'
import { transformDateFormat } from '../../../../utils'

const YearComparisonChart = ({ today,...rest }) => {  
    const [dateFilter,setDateFilter] = React.useState({start:transformDateFormat(today),end:transformDateFormat(today)})
    // const datePrev = { 
    //     start: `${parseInt(dateFilter.start.split('-')[0]) - 1}-${dateFilter.start.split('-')[1]}-${dateFilter.start.split('-')[2]}`,
    //     end: `${parseInt(dateFilter.end.split('-')[0]) - 1}-${dateFilter.end.split('-')[1]}-${dateFilter.end.split('-')[2]}`,
    // }
    
    return (
        <div>
            <ReadEntities entityName="segment" params={{
                reports: true, start: dateFilter.start, end: dateFilter.end
            }}>
                {
                    props => (
                        <Chart {...props} dateFilter={dateFilter} setDateFilter={setDateFilter}
                            today={transformDateFormat(today)}
                        />
                    )
                }
            </ReadEntities>
        </div>
    )
}

export default YearComparisonChart