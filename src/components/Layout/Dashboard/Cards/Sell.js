import React, { useEffect } from 'react'
import { Card,Table} from 'antd'

const Sell = (props) => {
  const { status, entities, read } = props
  
  useEffect(read, [])
  
  const columns = [
    {
      title:"",dataIndex:"name",key:"0",
    },
    {
      title:"Mois Actuel",dataIndex:"month",key:"1"
    },
    {
      title: "M-1", dataIndex: "previous_month", key: "2"
    },
    {
      title: "YoY", dataIndex: "last_year", key: "3",
    },
    {
      title:"Budget",dataIndex:"budget",key:"4",
    },
  ]

  const entity = entities ? entities.find(e => e.id === 1) : {}

  const data = entity && entity.value ? entity.value.map((e,i) => ({
    key: i, ...e
  })) : []

  return (
    <Card title="Ventes" size="small" style={props.style}>
      <div style={{padding:"4px"}}>
        <Table
          bordered columns={columns} dataSource={data} loading={status && status.isFetching} 
          pagination={false} size="small"
        />
      </div>
    </Card>
  )
}

export default Sell
