import React from 'react'
import { Card } from 'antd'
import { RadialChart } from 'react-vis'

export const CustomerCategory = (props) => {
    const { read, entities, status } = props

    React.useEffect(read,[])

    const datas = entities ? entities.map(c => ({
        angle: c.total_customer/ entities.reduce((a,i) => a + i.total_customer, 0),
        subLabel: c.name,

    })) : []

    return (
        <Card title="Client par catégorie" loading={status && status.isFetching}>
            <RadialChart
                data={datas} width={300} height={300}
                animation showLabels
            />
        </Card>
    )
}