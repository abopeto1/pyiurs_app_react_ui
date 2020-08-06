/* Dependencies */
import React from 'react'
import { Table,Button } from 'antd'
import { PrinterOutlined } from '@ant-design/icons'
import ExportToExcel, { transformDateFormat } from '../../../../../../utils'
import { baseUrl } from '../../../../../../redux/services/api'

const TableComponent = (props) => {
  const { entities, read, status, params } = props
  React.useEffect(read,[])

  
function print(id){
  window.open(`${baseUrl}/cloture/pdf/${id}`)
}

  const columns = [
    {title:"Date",dataIndex:"date",key:"0",},{title:"Opérateur",dataIndex:"created_by",key:"1"},{title:"Total Vente",dataIndex:"sell",key:"2"},
    {title:"Total Dépense",dataIndex:"expence",key:"3"},{title:"Cumul Vente",dataIndex:"cumSell",key:"3"},{title:"Action",dataIndex:"key",key:"9",render:(text,r) =>
      <Button type="primary" icon={<PrinterOutlined />} shape="round" onClick={() => print(r.key)}></Button>,},
  ]
  const data = entities !== undefined ? entities.reduce((a,i) => {
    const sell = i.bills.reduce((b,c) => c.type_paiement.id === 2 ? b+parseFloat(c.accompte) : b+parseFloat(c.net),0)
    const expence = i.expences.reduce(
      (b,c) => ((c.periode && c.periode === transformDateFormat(i.created,'Y-m')) || !c.periode) ? c.currency === "CDF" ? b+(parseFloat(c.montant/c.taux)) : b+parseFloat(c.montant) : b+0,0
    ).toFixed(1)

    return [...a, {
      ...i, date: transformDateFormat(i.created,'Y-m-d'),
      sell: sell.toFixed(0), key:i.id, expence: expence,
      cumSell: (a[a.length-1] ? parseFloat(a[a.length-1].cumSell)+parseFloat(a[a.length-1].sell) : 0).toFixed(0),
    }]
  },[]) : []

  return (
    <div>
      {
        (data.length > 0) && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <ExportToExcel dataArray={data} fileName={`Rapport Vente par Facture du ${params.start} au ${params.end}`} />
          </div>
        )
      }
      <Table
        bordered columns={columns} dataSource={data} size="small"
        loading={(status && status.isFetching) && (!entities || entities.length === 0)}
      />
    </div>
  )
}

export default TableComponent
