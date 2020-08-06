/* Dependencies */
import React from 'react'
import { Spin,Typography } from 'antd'
import MUIDataTable from "mui-datatables"
import { transformDateFormat } from '../../../../../utils'

const TableComponent = (props) => {
  const { entities, status } = props
  const { Title } = Typography

  const columns = [
    {label: "Date",options: {filter:true, sort:true,}},{label: "Facture",options: {filter:true, sort:true}},
    {label: "Client",options: {filter:true, sort:true}},{label: "PAT",options: {filter:true, sort:true}},
    {label: "Net",options: {filter:true, sort:true}},
  ]

  const data = entities !== undefined ? entities.map(c => {
    return [
      c.created!==undefined ? transformDateFormat(new Date(c.created),"Y-m-d H:i"):"inconnue",c.bill.numero,
      c.bill.customer.name,parseInt(c.product.pu)+parseInt(c.product.caa),c.net, ]
  }) : []

  const options = {
    rowsPerPage:10,
    selectableRows: 'none',
    textLabels: {
      body:{
        noMatch: status && status.isFetching ? <Spin /> : "Aucun Client Trouvé",
      }
    },
    setTableProps:() => ({
      size: "small",
    })
  }

  return (
    <div>
    {
      (entities !== undefined && entities.length > 0) && <Title level={4}>Total produits vendus : {`${entities.reduce((a,i) => {
        return !i.rs ? a + parseInt(i.net) : a
      },0)} $`}</Title>
    }
      <MUIDataTable data={data} columns={columns} options={options} />
    </div>
  )
}

export default TableComponent
