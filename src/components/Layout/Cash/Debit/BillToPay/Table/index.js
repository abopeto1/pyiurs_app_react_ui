/* Dependencies */
import React from 'react'
import { Table,Button } from 'antd'
import { PrinterOutlined } from '@ant-design/icons'
import { transformDateFormat, getColumnSearchProps } from '../../../../../../utils'

const TableComponent = (props) => {
  const { entities, read, status, setBill, setVisible, id } = props
  const [searchedText, setSearchedText] = React.useState("")
  const [filterColumn, setFilterColumn] = React.useState("")

  React.useEffect(read,[id])

  const mainColumns = [
    {
      title:"Client",dataIndex:"customer",key:"3",
      sorter:(a,b) => {
        const n = a.customer.toUpperCase()
        const m = b.customer.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('customer', setSearchedText, searchedText, filterColumn, setFilterColumn)
    },
    {
      title: "Total", dataIndex: "total", key: "6", sorter: (a, b) => a.total - b.total,
    },
    {
      title: "Accompte", dataIndex: "accompte", key: "8", sorter: (a, b) => a.accompte - b.accompte,
    },
    {
      title: "Reste", dataIndex: "reste", key: "9", sorter: (a, b) => a.reste - b.reste,
    },
  ]

  const columns = [
    {title:"Date",dataIndex:"date",key:"0",},
    {title:"Facture",dataIndex:"numero",key:"1"},
    {title:"Net",dataIndex:"net",key:"6"},{title:"Accompte",dataIndex:"accompte",key:"8"},{title:"Reste",dataIndex:"reste",key:"9"},
    {title:"Action",dataIndex:"key",key:"10",render:(text,r) =>
      <Button type="primary" icon={<PrinterOutlined />} shape="round" onClick={() => {
        setBill(r.id)
        setVisible(true)
      }}>Payer</Button>,},
  ]

  const datas = entities ? entities.map(e => ({
    ...e,
    customer: e.name,
    total: e.bills.reduce((a,i) => parseFloat(i.net) + a, 0).toFixed(1),
    accompte: e.bills.reduce((a, i) => parseFloat(i.accompte) + a, 0).toFixed(1),
    reste: e.bills.reduce((a, i) => parseFloat(i.reste) + a, 0).toFixed(1),
    key: e.id,
    bills: e.bills.map(b => ({
      ...b, key: b.id, date: transformDateFormat(b.created),customer: e.id,
    }))
  })) : []

  return (
    <div>
      <Table
        bordered columns={mainColumns} dataSource={datas} loading={(status && status.isFetching) && (!entities || entities.length === 0)}
        expandable={{
          expandedRowRender: record => <Table size="small" columns={columns} dataSource={record.bills} pagination={false} style={{padding:"20px"}} />,
          rowExpandable: record => true,
        }}
        size="small"
      />
    </div>
  )
}

export default TableComponent
