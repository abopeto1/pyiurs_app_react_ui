import React from 'react'
import { Table } from '../../../../utils'
import { Typography } from 'antd'

export const AverageSell = (props) => {
    const { read, entity, status } = props
    const { Title } = Typography
    
    React.useEffect(read, [])

    const data = entity ? entity.value.map((e, i) => ({
        key: i, label: e.name, Moyenne: e.total,
    })) : [{ key: 0, label: "", Moyenne: '' }]

    const loading = (status && status.isFetching) ? true : false

    return (
        <div>
            <Title level={3}>Moyenne des ventes</Title>
            <Table loading={loading} data={data} />
        </div>
    )
}