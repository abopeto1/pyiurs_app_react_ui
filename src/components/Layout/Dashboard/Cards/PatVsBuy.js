import React, { useEffect } from 'react'
import { Card,Table,Row,Col } from 'antd'

const PatVsBuy = (props) => {
  const { status, entity, read } = props

  useEffect(read,[])
  
  const columns = [
    {
      title:"Label",dataIndex:"name",key:"0",
    },
    {
      title:"Total",dataIndex:"total",key:"1"
    },
  ]

  const data = entity ? entity.value.map((d,i) => ({ ...d, key:i, })) : []

  return (
    <Card title="PAT Vs Achat Marchandises" size="small" style={props.style}>
      <Row>
        <Col span={24} style={{padding:"4px"}}>
          <Table
            bordered columns={columns} dataSource={data}
            loading={status && status.isFetching} pagination={false} size="small"
          />
        </Col>
      </Row>
    </Card>
  )
}

export default PatVsBuy
