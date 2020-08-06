import React, {useEffect} from 'react'
import { Card,Table,Typography } from 'antd'

const BillCard = (props) => {
  const { read, entities, status,reload } = props
  const { Text } = Typography
  
  useEffect(read,[reload])

  const columns = [
    {
      title:"Label", dataIndex:"label", render: (text,r) => r.key === 0 ? <Text strong>{text}</Text> : text,
    },
    {
      title:"value", dataIndex:"value", render: (text,r) =>  r.key === 0 ? <Text strong>{`${text} $`}</Text> : `${text} $`,
    },
  ]

  const datas = entities ? [
    {
      key:0, label: "TOTAL VENTE",
      value: (entities.reduce((a,i) => i.type_paiement.id === 2 ? a+parseFloat(i.accompte) : a+parseFloat(i.net),0)).toFixed(0),
    },
    {
      key:1, label: "Segment Femme",
      value: (entities.reduce((a,i) => {
        const tot = i.bill_details.reduce((ac,it) => it.product.segment.id === 2 ? ac+parseFloat(it.net) : ac,0)
        return a+tot
      },0)).toFixed(0),
    },
    {
      key:2, label: "Segment Enfant",
      value: (entities.reduce((a,i) => {
        const tot = i.bill_details.reduce((ac,it) => it.product.segment.id === 1 ? ac+parseFloat(it.net) : ac,0)
        return a+tot
      },0)).toFixed(0),
    },
  ] : []

  return (
    <Card title="Vente" style={{height:"100%"}}>
      <Table
        columns = {columns}
        dataSource={datas}
        loading={status && status.isFetching}
        showHeader={false}
        size="small"
        pagination={false}
      />
    </Card>
  )
}

export default BillCard
