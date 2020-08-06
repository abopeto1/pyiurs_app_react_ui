import React from 'react'
import { Table } from '../../../../utils'
import { Typography } from 'antd'

export const CustomerCategory = (props) => {
    const { read, entities, status } = props
    const { Title } = Typography

    React.useEffect(read,[])
    
    const data = entities ? entities.map(e => ({
        key: e.id, label: e.name, clients: e.total_customer,
    })) : [{key: 0, label: "", clients:''}]

    const loading = (status && status.isFetching) ? true : false

    return (
        <div>
            <Title level={4}>Client par catégorie</Title>
            <Table loading={loading} data={data} />
        </div>
    )
}