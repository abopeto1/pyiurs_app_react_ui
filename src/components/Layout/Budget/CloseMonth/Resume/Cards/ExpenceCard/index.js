import React, {useEffect} from 'react'
import { Card,Table,Typography } from 'antd'

const BillCard = (props) => {
  const { read, entities, status, reload } = props
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
      key:'2',label:'Dépense Total du Mois',
      value: (entities ? entities.reduce(
        (acc,item) => item.currency === "CDF" ? acc + (parseFloat(item.montant)/parseFloat(item.taux)) : acc + parseFloat(item.montant),0
      ) : 0).toFixed(0)
    },
  ] : []

  return (
    <Card title="Dépenses"  style={{height:"100%"}}>
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
