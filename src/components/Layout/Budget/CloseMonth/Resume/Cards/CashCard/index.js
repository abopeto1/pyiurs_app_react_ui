import React, {useEffect} from 'react'
import { Card,Table,Typography } from 'antd'
import { transformDateFormat } from '../../../../../../../utils'

const BillCard = (props) => {
  const { read, entities, status, getCashins, reload } = props
  const { Text } = Typography
  useEffect(read,[reload])
  useEffect(getCashins,[reload])

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
      key:0, label: "Entrée Cash Brut",
      value: props.cashins ? (props.cashins.reduce((acc,item) => {
        return item.currency === "CDF" ? acc + (parseFloat(item.amount)/parseFloat(item.taux)) : acc + parseFloat(item.amount)
      },0)).toFixed(0) : 0,
    },
    {
      key:'2',label:'Cash Divers',
      value: (entities ? entities.filter(d => d.type === "divers" && transformDateFormat(d.created) === transformDateFormat(new Date())).reduce(
        (acc,item) => item.currency === "CDF" ? acc + (parseFloat(item.amount)/parseFloat(item.taux)) :
        item.currency === "EUR" ? acc + (parseFloat(item.amount)*parseFloat(item.tauxEuro)) : acc + parseFloat(item.amount),0
      ) : 0).toFixed(0)
    },
    {
      key:'3',label:'Cash Bancaire',
      value: (entities ? entities.filter(d => d.type === "bank" && transformDateFormat(d.created) === transformDateFormat(new Date())).reduce(
        (acc,item) => item.currency === "CDF" ? acc + (parseFloat(item.amount)/parseFloat(item.taux)) :
        item.currency === "EUR" ? acc + (parseFloat(item.amount)*parseFloat(item.tauxEuro)) : acc + parseFloat(item.amount),0
      ) : 0).toFixed(0)
    },
  ] : []

  return (
    <Card title="Autres Revenus"  style={{height:"100%"}}>
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
