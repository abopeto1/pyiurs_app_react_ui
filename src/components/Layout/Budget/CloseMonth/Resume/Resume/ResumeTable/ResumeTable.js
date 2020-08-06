import React, { useEffect } from 'react'
import { Typography } from 'antd'
import { Table } from '../../../../../../../utils'

export const ResumeTable = props => {
    const { entities, read, status, reload, title, params,  } = props

    const loading = status && status.isFetching ? true : false

    const data = entities && entities[0]

    useEffect(read, [reload])

    return (
        <div style={{ width: '100%', marginBottom: '16px', }}>
            <Typography.Title level={4}>{title}</Typography.Title>
            <Table
                loading={loading} entityName="dashboard" pagination={false}
                data={
                    !data ? [] : Array.isArray(data[params.value]) ? 
                    data[params.value].map((d,i) => ({
                        key: i, ...d
                    })) : Object.keys(data[params.value]).map((k, i) => ({
                        key: i, label: k, value: data[params.value][k],
                    }))
                }
            />
        </div>
    )
}