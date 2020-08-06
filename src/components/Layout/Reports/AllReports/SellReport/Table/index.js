/* Dependencies */
import React from 'react'
import { Typography } from 'antd'
import ExportToExcel, { transformDateFormat, Table } from '../../../../../../utils'

const TableComponent = (props) => {
  const { entities, status, params } = props
  const { Title } = Typography
  console.log(entities);
  
  const data = entities ? entities.map((c,i) => ({
    key: c.id, date: c.created!==undefined ? transformDateFormat(new Date(c.created),"Y-m-d H:i"):"inconnue",
    numero: c.bill.numero, client: c.bill.customer.name, 
    "catégorie client": c.bill.customer.category, 
    pat: parseInt(c.product.pu)+parseInt(c.product.caa),
    net: c.net, 
    categorie: c.product.cat,
    type: c.product.type,
  })) : [{
    key: null, numero: null, client: null, "catégorie client": null, pat: null, net: null, categorie: null,
    type: null, }]

  return (
    <div>
    {
      (data.length > 0) && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title level={4}>Total produits vendus : {`${entities && entities.reduce((a,i) => {
                return !i.rs ? a + parseInt(i.net) : a
              },0)} $`}
            </Title>
            <ExportToExcel dataArray={data} fileName={`Rapport Vente par Produit du ${params.start} au ${params.end}`} />
          </div>
        )
    }
      <Table data={data} style={{overflowX:"scroll",}} loading={(status && status.isFetching) ?? false} />
    </div>
  )
}

export default TableComponent
