/* Dependencies */
import React from 'react'
import { Row,Col } from 'antd'
import Table from './TableComponent'

export const HistoryPnl = (props) => {
  const { entities, status, period } = props
  const [year, month] = period.split('-')
  
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
  ]
  
  const datas = entities ? entities.map(d => ({
    key: d.id, name:d.name, code: d.code,
    budget:  d.expence_accounts.reduce((a,ea) => {
      const bd = ea.budgets.find(b => parseInt(b.month) === parseInt(month) && parseInt(b.year) === parseInt(year))
      return bd ? parseFloat(bd.value) + a : a
    },0).toFixed(0),
    value: d.expence_accounts.reduce((a,ea) => {
      return ea.expences.filter(e => e.statut).reduce((b,i) => {
        return i.currency === "USD" ? b + parseFloat(i.montant) : b + parseFloat(i.montant/i.taux)
      },0) + a
    },0).toFixed(0),
    children:d.expence_accounts.map(ea => ({
      key:ea.id, code: ea.code, name: ea.name,
      budgets: ea.budgets.find(b => parseInt(b.month) === parseInt(month) && parseInt(b.year) === parseInt(year)),
      value: ea.expences ? ea.expences.reduce((b,i) => {
        return i.currency === "USD" ? b + parseFloat(i.montant) : b + parseFloat(i.montant/i.taux)
      },0).toFixed(0) : 0,
      budget: ea.budgets.find(b =>  parseInt(b.month) === parseInt(month) && parseInt(b.year) === parseInt(year)) ?
      ea.budgets.find(b =>  parseInt(b.month) === parseInt(month) && parseInt(b.year) === parseInt(year)).value : 0,
    }))
  })) : []
  
  const dataExcel = entities ? entities.reduce((a,i) => {
    const accounts = i.expence_accounts.map(ea => ({
      "Code Catégorie": i.code, "Catégorie": i.name, "Code": ea.code, "Compte": ea.name,
      "Valeur": ea.expences.filter(e => e.statut).reduce((b, i) => {
        return i.currency === "USD" ? b + parseFloat(i.montant) : b + parseFloat(i.montant / i.taux)
      }, 0).toFixed(0),
      "Budget": ea.budgets.find(b => parseInt(b.month) === parseInt(month) && parseInt(b.year) === parseInt(year)) ?
        ea.budgets.find(b => parseInt(b.month) === parseInt(month) && parseInt(b.year) === parseInt(year)).value : 0,
    }))

    return [...a, ...accounts]
  },[]) : []

  return (
      <Row>
        <Col span={24}>
          <Table
            columns={columns} datas={datas} loading={status && status.isFetching} entities={entities}
            dataExcel={dataExcel} period={period}
          />
        </Col>
      </Row>
  )
}
