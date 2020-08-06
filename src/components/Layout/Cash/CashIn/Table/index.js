/* Dependencies */
import React from 'react'
import { Table } from 'antd'
import { transformDateFormat } from '../../../../../utils'

const TableComponent = (props) => {
  const { getCashin, cashins, status } = props
  
  React.useEffect(getCashin,[])
  console.log(cashins);
  
  const columns = [
    {title:"Date",dataIndex:"date",key:"0",},{title:"Forunisseur",dataIndex:"provider",key:"1"},
    {title:"Montant",dataIndex:"total",key:"5",render:v => v.toFixed(1)},
    {title:"Motif",dataIndex:"motif",key:"2",},
    {title:"Operateur",dataIndex:"operator",key:"3",},{title:"Commentaires",dataIndex:"comment",key:"4",},
  ]
  const data = cashins !== undefined ? cashins.reduce((a,i) => {
    console.log(i.amount,i.currency,i.taux)
    return [...a, {
      date:transformDateFormat(i.created), provider: i.provider.name,
      total: i.currency === "CDF" ? parseInt(i.amount)/parseInt(i.taux) : i.currency === "EUR" ? parseInt(i.amount)/parseInt(i.taux_euro) : i.amount ,
      motif: i.motif, operator: i.operator,paied: 0,
    }]
  },[]) : []

  return (
    <Table bordered columns={columns} dataSource={data} loading={(status && status.isFetching) && (!cashins || cashins.length === 0)} />
  )
}

export default TableComponent
