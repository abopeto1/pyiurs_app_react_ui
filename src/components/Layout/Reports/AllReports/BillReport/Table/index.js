/* Dependencies */
import React from 'react'
import { Table,Typography, Tag } from 'antd'
import { transformDateFormat, getColumnSearchProps } from '../../../../../../utils'
import ExportToExcel from '../../../../../../utils/ExportToExcel'

const TableComponent = (props) => {
  const { entities, status, params, } = props
  const { Title } = Typography

  const [searchedText, setSearchedText] = React.useState("")
  const [filterColumn, setFilterColumn] = React.useState("")
  
  const columns = [
    {
      title: "Date",dataIndex:"date",key:"0",
      sorter: (a, b) => {
        const n = a.date.toUpperCase()
        const m = a.date.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('date', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
    {
      title: "Facture",dataIndex:"numero",key:"1",
      sorter: (a, b) => {
        const n = a.numero.toUpperCase()
        const m = a.numero.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('numero', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
    {
      title: "Client",dataIndex:"customer",key:"2",
      sorter: (a, b) => {
        const n = a.customertype.toUpperCase()
        const m = a.customertype.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('customertype', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
    {
      key: 7, title: "Catégorie Client", dataIndex: 'category',
      sorter: (a, b) => {
        const n = a.category.toUpperCase()
        const m = a.category.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('category', setSearchedText, searchedText, filterColumn, setFilterColumn),
      render: (v, r) => (
        <Tag color={r.cid === 1 ? "#f06292" : r.cid === 2 ? "#b2ebf2" : r.cid === 3 ? "#303f9f" : "#cddc39"}>{v}</Tag>
      ),
    },
    {
      title: "Paiement",dataIndex:"type",key:"3",
      sorter: (a, b) => {
        const n = a.type.toUpperCase()
        const m = a.type.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('type', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
    {
      title: "Net",dataIndex:"net",key:"4",
      sorter: (a, b) => a.net - b.net,
      ...getColumnSearchProps('date', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
    {
      title: "Accompte",dataIndex:"accompte",key:"5",
      sorter: (a, b) => a.accompte - b.accompte,
      ...getColumnSearchProps('date', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
    {
      title: "Reste",dataIndex:"reste",key:"6",
      sorter: (a, b) => a.reste - b.reste,
      ...getColumnSearchProps('date', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
  ]

  const data = entities !== undefined ? entities.map(c => ({
    key:c.id, date: c.created!==undefined ? transformDateFormat(new Date(c.created),"Y-m-d H:i"):"inconnue",
    customer: `${c.customer.name} (${c.customer.telephone})`,type:c.type_paiement.label, reste: c.reste, 
    net: c.net, accompte: c.accompte, numero: c.numero, cid: c.customer.categorie.id, 
    category: c.customer.categorie.name,
  })) : []

  return (
    <div>
    {
      (data.length > 0) && (
          <div style={{display:"flex", justifyContent: "space-between"}}>
            <Title level={4}>
              Total produits vendus : {`
              ${
                entities.reduce((a, i) => {
                  return i.type_paiement.id === 2 ? a + parseFloat(i.accompte) : a + parseFloat(i.net)
                }, 0).toFixed(0)
              } $`}
            </Title>
            <ExportToExcel dataArray={data} fileName={`Rapport Vente par Facture du ${params.start} au ${params.end}`} />
          </div>
      )
    }
      <Table dataSource={data} columns={columns} style={{ overflowX: "scroll"}} 
        loading={status && status.isFetching} size="small"
      />
    </div>
  )
}

export default TableComponent
