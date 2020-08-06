/* Dependencies */
import React from 'react'
import { Typography,Table,Button } from 'antd'
import CreateForm from './CreateForm'

export const ActualMonthPnl = (props) => {
  const { read, entities, status } = props
  const period = { month:(new Date()).getMonth()+1, year:(new Date()).getFullYear(), }
  const [form,setForm] = React.useState({month:period.month, year:period.year, expence_account:null,value:null})
  const [select,setSelect] = React.useState({})
  const [visible,setVisible] = React.useState(false)
  React.useEffect(read,[])

  const columns = [
    { title: 'Code', dataIndex:"code", key:"3",render:(v,r) => {
      return !r.children ? v : <strong>{v}</strong>
    }},
    { title: 'Compte', dataIndex:"name", key:"0",render:(v,r) => {
      return !r.children ? v : <strong>{v}</strong>
    }},
    { title: 'Budget', dataIndex:"budget", key:"1",render:(v,r) => {
      return !r.children ? v : <strong>{v}</strong>
    }},
    { title: 'Valeur', dataIndex:"value", key:"2",render:(v,r) => {
      return !r.children ? v : <strong>{v}</strong>
    }},
    { title: '', dataIndex:"set", key:"4",render:(v,r) => {
      return !r.children ? (
        <Button type="primary" onClick={() => {
            setSelect(r); setVisible(true);setForm({...form,expence_account:r.key,value:r.budget})
          }}
        >
          Modifier
        </Button>
      ) : ""
    }},
  ]

  const datas = entities ? entities.map(d => ({
    key: d.id, name:d.name, code: d.code,
    budget:  d.expence_accounts.reduce((a,ea) => {
      const bd = ea.budgets.find(b => parseInt(b.month) === parseInt(period.month) && parseInt(b.year) === parseInt(period.year))
      return bd ? parseFloat(bd.value) + a : a
    },0).toFixed(0),
    value: d.expence_accounts.reduce((a,ea) => {
      return ea.expences.reduce((b,i) => {
        return i.currency === "USD" ? b + parseFloat(i.montant) : b + parseFloat(i.montant/i.taux)
      },0) + a
    },0).toFixed(0),
    children:d.expence_accounts.map(ea => ({
      key:ea.id, code: ea.code, name: ea.name,
      budgets: ea.budgets.find(b => parseInt(b.month) === parseInt(period.month) && parseInt(b.year) === parseInt(period.year)),
      value: ea.expences ? ea.expences.reduce((b,i) => {
        return i.currency === "USD" ? b + parseFloat(i.montant) : b + parseFloat(i.montant/i.taux)
      },0).toFixed(0) : 0,
      budget: ea.budgets.find(b =>  parseInt(b.month) === parseInt(period.month) && parseInt(b.year) === parseInt(period.year)) ?
      ea.budgets.find(b =>  parseInt(b.month) === parseInt(period.month) && parseInt(b.year) === parseInt(period.year)).value : 0,
    }))
  })) : []

  return (
      <div>
        <Typography.Title level={3}>PNL Mois Actuel</Typography.Title>
        <Table columns={columns} dataSource={datas} loading={status && status.isFetching} size="small" pagination={false} />
        <CreateForm form={form} setForm={setForm} visible={visible} setVisible={setVisible} select={select} setSelect={setSelect} />
      </div>
  )
}
