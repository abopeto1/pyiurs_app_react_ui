/* Dependencies */
import React from 'react'
import { Table, Grid, Button } from 'antd'
import { PrinterOutlined } from '@ant-design/icons'
import { transformDateFormat, getColumnSearchProps } from '../../../../../utils'
import CreateEntity from '../../../../../react-redux/Entity/Create'
import CreditForm from './CreditForm'

const TableComponent = (props) => {
  const { entities, status, /*setBill, setOpen*/ } = props
  const bk = Grid.useBreakpoint()

  const [searchedText, setSearchedText] = React.useState("")
  const [filterColumn, setFilterColumn] = React.useState("")
  const [addCredit, setAddCredit] = React.useState({
    openModal: false,
    form: {
      type:"dette", taux: sessionStorage.taux, tauxEuro: null, currency:"USD", nbr_echeance: null,
      amount: 0, provider: null, agent: null, motif:""
    }, 
  })

  const creditColumns = [
    { title: "Date", dataIndex: "date", key: "0", },
    { title: "Motif", dataIndex: "motif", key: "1" },
    {
      title: "Montant", dataIndex: "amount",key: "6", render: (v,r) => (
        <span>{`${v} ${r.currency}`}</span>
      ),
    },
    {
      title: "Action", dataIndex: "key", key: "10", render: (text, r) =>
        <Button type="primary" icon={<PrinterOutlined />} shape="round" onClick={() => {
          // setBill(r.id)
          // setOpen(true)
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
      key: 3, title: "Fonction", dataIndex: 'fonction',
      sorter: (a, b) => {
        const n = a.fonction.toUpperCase()
        const m = a.fonction.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('fonction', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
    {
      title: "Action", dataIndex: "key", key: "10", render: (text, r) =>
        <Button type="primary" shape="round" size="small" onClick={() => {
          setAddCredit({ ...addCredit, openModal: true, form:{ ...addCredit.form, agent: r.id}})
        }}>Prêter</Button>,
    },
  ]

  const data = entities !== undefined ? entities.map(c => ({
    ...c, date: c.created!==undefined ? transformDateFormat(new Date(c.created)) : "inconnue", key: c.id,
  })) : []


  return (
    <div>
      <Table
        dataSource={data} columns={columns} loading={status && status.isFetching}
        style={{
          overflowX: 'scroll', backgroundColor: bk['xs'] || bk['sm'] ? 'white' : 'none',
        }} size="small"
        expandable={{
          expandedRowRender: record => (
            <Table
              size="small" columns={creditColumns} pagination={false}
              dataSource={
                record.credits.map(
                    c => ({ ...c, key: c.id, date: transformDateFormat(c.created) }
                  )
                )
              }
              style={{ padding: "20px" }}
            />
          ),
          rowExpandable: record => true,
        }}
      />
      <CreateEntity entityName="credit">
        {
          createProps => <CreditForm {...createProps} setAddCredit={setAddCredit} addCredit={addCredit} />
        }
      </CreateEntity>
    </div>
  )
}

export default TableComponent
