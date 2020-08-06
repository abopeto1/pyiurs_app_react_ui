import React, { useEffect } from 'react'
import { Table,Typography } from 'antd'

const TableComponent = props => {
    const { totalCash, loading, service } = props
    const { Text } = Typography

    useEffect(service.read,[])

    const columns = [
        {
            title: "Label", dataIndex: "label", render: text => <Text strong>{text}</Text>, key:0
        },
        {
            title: "value", dataIndex: "value", render: text => <Text strong>{`${text.toFixed(0)} $`}</Text>, key: 1
        },
    ]

    const datas = [
        {
            key:0, label: "Entrée Cash",
            value: totalCash ?? 0,
        },
        {
            key: 1, label: "Service",
            value: props.totalService,
        }
    ]

    return (
        <Table
            dataSource={datas} columns={columns} size="small" loading={loading}
            showHeader={false} pagination={false}
        />
    )
}

export default TableComponent