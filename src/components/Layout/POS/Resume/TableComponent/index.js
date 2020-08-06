/* Dependencies */
import React from 'react'
import { Table,Button } from 'antd'
import { PrinterOutlined } from '@ant-design/icons'
import { transformDateFormat } from '../../../../../utils'
import { baseUrl } from '../../../../../redux/services/api'

const TableComponent = (props) => {
  const { entities, read, status } = props

  React.useEffect(read,[])
  

  const print = (id) => {
    window.open(`${baseUrl}/pdf/${props.entityName}/${id}`)
  }

  const columns = [
    {
      title:"Date",dataIndex:"date",key:"0",
    },
    {
      title:"Opérateur",dataIndex:"operator_name",key:"1"
    },
    {
      title:"Vente",dataIndex:"sell",key:"2"
    },
    {
      title: "Entree Cash", dataIndex: "cash", key: "5"
    },
    {
      title:"Dépense",dataIndex:"expence",key:"3"
    },
    {
      title:"Cumul Vente",dataIndex:"cumSell",key:"4"
    },
    {
      title: "Cumul Cash", dataIndex: "cumul_cash", key: "6"
    },
    {
      title:"Action",dataIndex:"key",key:"9",render:(text,r) =>
      <Button type="primary" icon={<PrinterOutlined />} shape="round" onClick={() => print(r.key)}></Button>,
    },
  ]

  const data = entities ? entities.reduce((a,i) => {
    const sell = i.bills.reduce((b,c) => c.type_paiement.id === 2 ? b+parseFloat(c.accompte) : b+parseFloat(c.net),0).toFixed(0)
    const expence = i.expences.reduce(
      (b,c) => ((c.periode && c.periode === transformDateFormat(i.created,'Y-m')) || !c.periode) ? c.currency === "CDF" ? b+(parseFloat(c.montant/c.taux)) : b+parseFloat(c.montant) : b+0,0
    ).toFixed(0)
    const cash = i.cash_ins.reduce((a, i) => i.currency === "CDF" ? (i.amount / i.taux) + a : i.amount,0)

    return [...a, {
      ...i,
      operator_name:i.operator ? `${i.operator.name} ${i.operator.lastname}` : "",
      date: transformDateFormat(i.created, 'Y-m-d'),
      cumul_cash: a[a.length - 1] ? a[a.length - 1].cumul_cash + a[a.length - 1].cash + a[a.length - 1].sell - a[a.length - 1].expence : 0,
      sell: parseInt(sell), cash: parseInt(cash),
      key:i.id,
      expence: parseInt(expence),
      cumSell: a[a.length-1] ? a[a.length-1].cumSell+a[a.length-1].sell : 0,
    }]
  },[]) : []

  return (
    <Table bordered columns={columns} dataSource={data} loading={(status && status.isFetching) && (!entities || entities.length === 0)}
      style={{
        overflowX: 'scroll',
      }}
    />
  )
}

export default TableComponent
