import React, { useEffect } from 'react'
import { Card, Table,Typography } from 'antd'

const SingleCard = (props) => {
  const { entities, status, read, entityName } = props
  useEffect(read,[])
  const { Text } = Typography
  const columns = [
    {
      title:"Label", dataIndex:"label", render: text => <Text strong>{text}</Text>,
    },
    {
      title:"value", dataIndex:"value", render: text => <Text strong>{`${text} $`}</Text>,
    },
  ]

  const datas = entities ? entities.map(d => ({
    key: d.id,label:d.name ? d.name : d.label, value: entityName === 'type_paiement' ? (d.bills.reduce((a,i) => {
      return d.id === 2 ? a + parseFloat(i.accompte) : a + parseFloat(i.net)
    },0)).toFixed(0) : (d.bills.reduce((a,i) => {
      return i.type_paiement.id === 2 ? a + parseFloat(i.accompte) : a + parseFloat(i.net)
    },0)).toFixed(0),
  })) : []

  return (
    <Card title={props.title} style={props.style}>
      <Table
        columns = {columns} dataSource={datas}
        loading={status && status.isFetching}
        showHeader={false}
        size="small"
        pagination={false}
      />
    </Card>
  )
}

export default SingleCard
