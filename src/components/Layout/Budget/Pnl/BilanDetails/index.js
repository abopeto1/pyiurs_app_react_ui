/* Dependencies */
import React, { useEffect } from 'react'
import { Typography,Table,Button } from 'antd'
import CreateForm from './CreateForm'

const BilanDetails = (props) => {
  const { read, entities, status } = props
  const period = { month:(new Date()).getMonth()+1, year:(new Date()).getFullYear(), }

  const [form,setForm] = React.useState({month:period.month, year:period.year, bilan_account:null,value:null})
  const [select,setSelect] = React.useState({})
  const [visible,setVisible] = React.useState(false)
  
  useEffect(read,[])

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
      return !r.children && props.toUpdate ? (
        <Button type="primary" onClick={() => {
            setSelect(r);
            setVisible(true);
            setForm({...form,bilan_account:r.key,value:r.budget})
          }}
        >
          Modifier
        </Button>
      ) : ""
    }},
  ]

  const datas = entities ? entities.map(d => ({
    key: d.id, name:d.name, code: d.code,
    budget: d.bilan_accounts.reduce((a,ea) => {
      const bd = ea.bilan_budgets.find(b => parseInt(b.month) === parseInt(period.month) && parseInt(b.year) === parseInt(period.year))
      return bd ? parseFloat(bd.value) + a : a
    },0).toFixed(0),
    value: d.bilan_accounts.reduce((a,i) => parseInt(i.value_month) + a, 0 ),
    children:d.bilan_accounts.map(ea => ({
      key:ea.id, code: ea.code, name: ea.name,
      bilan_budgets: ea.bilan_budgets.find(b => parseInt(b.month) === parseInt(period.month) && parseInt(b.year) === parseInt(period.year)),
      value: ea.value_month.toFixed(0),
      budget: ea.bilan_budgets.find(b =>  parseInt(b.month) === parseInt(period.month) && parseInt(b.year) === parseInt(period.year)) ?
      ea.bilan_budgets.find(b =>  parseInt(b.month) === parseInt(period.month) && parseInt(b.year) === parseInt(period.year)).value : 0,
    }))
  })) : []

  return (
      <div style={{marginBottom: "8px"}}>
        <Typography.Title level={3}>Compte Bilan</Typography.Title>
        <Table columns={columns} dataSource={datas} loading={status && status.isFetching} size="small" pagination={false} />
        <CreateForm form={form} setForm={setForm} visible={visible} setVisible={setVisible} select={select} setSelect={setSelect} />
      </div>
  )
}

export default BilanDetails
