import React from 'react'
import { Table } from '../../../../utils'
import { Typography } from 'antd'

export const CustomerCategory = (props) => {
    const { read, entities, status } = props
    const { Title } = Typography

    React.useEffect(read,[])
    
    const data = entities ? entities.map(e => ({
        key: e.id, label: e.name, clients: e.total_customer,
    })) : [{key: null, label: null, clients:null}]

    return (
        <div>
            <Title level={4}>Client par catégorie</Title>
            <Table loading={(status && status.isFetching) || false} data={data} />
        </div>
    )
}