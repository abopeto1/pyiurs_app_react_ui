/* Dependencies */
import React from 'react'
import { Table, Grid, Button } from 'antd'
import { PrinterOutlined } from '@ant-design/icons'
import { transformDateFormat, getColumnSearchProps } from '../../../../../utils'

const TableComponent = (props) => {
  const { entities, read, status, setBill, setOpen } = props
  React.useEffect(read,[])
  const bk = Grid.useBreakpoint()

  const [searchedText, setSearchedText] = React.useState("")
  const [filterColumn, setFilterColumn] = React.useState("")

  const billColumns = [
    { title: "Date", dataIndex: "date", key: "0", },
    { title: "Facture", dataIndex: "numero", key: "1" },
    { title: "Net", dataIndex: "net", key: "6" }, { title: "Accompte", dataIndex: "accompte", key: "8" },
    { title: "Reste", dataIndex: "reste", key: "9" },
    {
      title: "Action", dataIndex: "key", key: "10", render: (text, r) =>
        <Button type="primary" icon={<PrinterOutlined />} shape="round" onClick={() => {
          setBill(r.id)
          setOpen(true)
        }}>Payer</Button>,
    },
  ]

  const columns = [
    {
      key:0,title:"Nom",dataIndex:'name',
      sorter: (a, b) => {
        const n = a.name.toUpperCase()
        const m = a.name.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('name', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
    {
      key: 1, title: "Prenom", dataIndex: 'lastname',
      sorter: (a, b) => {
        const n = a.lastname.toUpperCase()
        const m = a.lastname.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('lastname', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
    {
      title: "Compte Client", key: 2,
      sorter: (a, b) => a.telephone - b.telephone,
      ...getColumnSearchProps('telephone', setSearchedText, searchedText, filterColumn, setFilterColumn),
      render: (v, r) => <span>{r.customer_account ? `${r.customer_account.name}` : "Aucun" }</span>
    },
    {
      title:"Téléphone",key:2,dataIndex:"telephone",
      sorter: (a, b) => a.telephone - b.telephone,
      ...getColumnSearchProps('telephone', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
    {
      key: 3, title: "Fonction", dataIndex: 'fonction',
      sorter: (a, b) => {
        const n = a.fonction.toUpperCase()
        const m = a.fonction.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('fonction', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
    {
      key: 4, title: "Mail", dataIndex: 'mail',
      sorter: (a, b) => {
        const n = a.mail.toUpperCase()
        const m = a.mail.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('mail', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
    {
      key: 6, title: "Adresse", dataIndex: 'adress',
      sorter: (a, b) => {
        const n = a.adress.toUpperCase()
        const m = a.adress.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('adress', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
    {
      key: 7, title: "Date", dataIndex: 'date',
      sorter: (a, b) => {
        const n = a.date.toUpperCase()
        const m = a.date.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('date', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
  ]

  const data = entities !== undefined ? entities.map(c => ({
    ...c, date: c.created!==undefined ? transformDateFormat(new Date(c.created)) : "inconnue", key: c.id,
  })) : []


  return (
    <Table
      dataSource={data} columns={columns} loading={status && status.isFetching}
      style={{
        overflowX: 'scroll', backgroundColor: bk['xs'] || bk['sm'] ? 'white' : 'none',
      }} size="small"
      expandable={{
        expandedRowRender: record => (
          <Table
            size="small" columns={billColumns} pagination={false}
            dataSource={
              record.customer_account ? 
              record.customer_account.bills.filter(
                b => b.type_paiement.id === 2 && b.reste > 0
              ).map(
                b => ({...b, key:b.id, date: transformDateFormat(b.created)}
              )
            ) : [] }
            style={{ padding: "20px" }}
          />
        ),
        rowExpandable: record => true,
      }}
    />
  )
}

export default TableComponent
