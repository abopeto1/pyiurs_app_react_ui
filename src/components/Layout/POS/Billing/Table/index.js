/* Dependencies */
import React from 'react'
import { Table,Button,Grid } from 'antd'
import { PrinterOutlined } from '@ant-design/icons'
import { transformDateFormat, getColumnSearchProps, print } from '../../../../../utils'

const TableComponent = (props) => {
  const { entities, read, status, entityName } = props
  const bk = Grid.useBreakpoint()
  React.useEffect(read,[])

  const [searchedText, setSearchedText] = React.useState("")
  const [filterColumn, setFilterColumn] = React.useState("")

  const columns = [
    {
      title:"Date",dataIndex:"date",key:"0",
      sorter: (a, b) => {
        const n = new Date(a.date)
        const m = new Date(b.date)
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('date', setSearchedText, searchedText, filterColumn, setFilterColumn)
    },
    {
      title:"Facture",dataIndex:"numero",key:"1",
      sorter: (a, b) => {
        const n = a.numero.toUpperCase()
        const m = b.numero.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('numero', setSearchedText, searchedText, filterColumn, setFilterColumn)
    },
    {
      title:"Client",dataIndex:"customer",key:"3",
      sorter: (a, b) => {
        const n = a.customer.toUpperCase()
        const m = b.customer.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('customer', setSearchedText, searchedText, filterColumn, setFilterColumn)
    },
    {
      title:"Total",dataIndex:"total",key:"4",
      sorter: (a, b) => a.total - b.total,
      ...getColumnSearchProps('total', setSearchedText, searchedText, filterColumn, setFilterColumn)
    },
    {
      title: "TVA", dataIndex: "taxe", key: "5",
      sorter: (a, b) => a.taxe - b.taxe,
      ...getColumnSearchProps('taxe', setSearchedText, searchedText, filterColumn, setFilterColumn)
    },
    {
      title:"Net",dataIndex:"net",key:"6",
      sorter: (a, b) => a.net - b.net,
      ...getColumnSearchProps('net', setSearchedText, searchedText, filterColumn, setFilterColumn)
    },
    {
      title:"Paiement",dataIndex:"paiement",key:"7",
      sorter: (a, b) => {
        const n = a.paiement.toUpperCase()
        const m = b.paiement.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('paiement', setSearchedText, searchedText, filterColumn, setFilterColumn)
    },
    {
      title:"Accompte",dataIndex:"accompte",key:"8",
      sorter: (a, b) => a.net - b.net,
      ...getColumnSearchProps('accompte', setSearchedText, searchedText, filterColumn, setFilterColumn)
    },
    {
      title:"Action",dataIndex:"key",key:"9",render:(text,r) => (
        <Button type="primary" icon={<PrinterOutlined />} shape="round" onClick={() => print(r.key, entityName) }/>
    )},
  ]

  const data = entities !== undefined ? entities.reduce((a,i) => {
    return [...a, {
      ...i, date: transformDateFormat(i.created,'Y-m-d H:i'),customer: i.customer.name, accompte: i.type_paiement.id !== 2 ? "" : i.accompte,
      paiement: i.type_paiement.label, key:i.id,
    }]
  },[]) : []

  return (
    <Table 
      bordered columns={columns} dataSource={data} loading={status && status.isFetching} size="small"
      style={{
        overflowX: 'scroll', backgroundColor: bk['xs'] || bk['sm'] ? 'white' : 'none',
      }}
    />
  )
}

export default TableComponent
