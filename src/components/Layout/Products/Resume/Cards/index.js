import React from 'react'
import { Col,Row,Table,Typography } from 'antd'

const Cards = (props) => {
  const { open, added, selled, closed } = props
  
  const { Title } = Typography
  
  const columns = [
    { key: 0, title: "", dataIndex: "label" },
    { key: 1, title: "Qte", dataIndex: "total" },
    { key: 2, title: "PAT", dataIndex: "pat" },
    { key: 3, title: "Valeur Marchande", dataIndex: "value" },
  ]
  
  const data = [
    {
      key:0,
      label: "Stock D'Ouverture",
      total: open.entities ? open.entities.reduce((a,i) => i.products.length+a, 0) : 0,
      pat: open.entities ? open.entities.reduce(
        (a, i) => i.products.reduce((aa, ii) => parseInt(ii.pu) + parseInt(ii.caa) + aa,0) + a, 0) : 0,
      value: open.entities ? open.entities.reduce(
        (a, i) => i.products.reduce((aa, ii) => parseInt(ii.pv) + aa, 0) + a, 0) : 0,
      children: open.entities ? open.entities.map(e => ({
        label: e.name,
        total: e.products.length,
        pat: e.products.reduce((aa, ii) => parseInt(ii.pu) + parseInt(ii.caa) + aa, 0),
        value: e.products.reduce((aa, ii) => parseInt(ii.pv) + aa, 0),
      })) : []
    },
    {
      key:1,
      label: "Stock Ajouté",
      total: added.entities ? added.entities.reduce((a, i) => i.products.length + a, 0) : 0,
      pat: added.entities ? added.entities.reduce(
        (a, i) => i.products.reduce((aa, ii) => parseInt(ii.pu) + parseInt(ii.caa) + aa, 0) + a, 0) : 0,
      value: added.entities ? added.entities.reduce(
        (a, i) => i.products.reduce((aa, ii) => parseInt(ii.pv) + aa, 0) + a, 0) : 0,
      children: added.entities ? added.entities.map(e => ({
        label: e.name,
        total: e.products.length,
        pat: e.products.reduce((aa, ii) => parseInt(ii.pu) + parseInt(ii.caa) + aa, 0),
        value: e.products.reduce((aa, ii) => parseInt(ii.pv) + aa, 0),
      })) : []
    },
    {
      key: 2,
      label: "Stock Vendus",
      total: selled.entities ? selled.entities.reduce((a, i) => i.products.length + a, 0) : 0,
      pat: selled.entities ? selled.entities.reduce(
        (a, i) => i.products.reduce((aa, ii) => parseInt(ii.pu) + parseInt(ii.caa) + aa, 0) + a, 0) : 0,
      value: selled.entities ? selled.entities.reduce(
        (a, i) => i.products.reduce((aa, ii) => parseInt(ii.pv) + aa, 0) + a, 0) : 0,
      children: selled.entities ? selled.entities.map(e => ({
        label: e.name,
        total: e.products.length,
        pat: e.products.reduce((aa, ii) => parseInt(ii.pu) + parseInt(ii.caa) + aa, 0),
        value: e.products.reduce((aa, ii) => parseInt(ii.pv) + aa, 0),
      })) : []
    },
    {
      key: 3,
      label: "Stock à la Boutique",
      total: closed.entities ? closed.entities.reduce((a, i) => i.products.length + a, 0) : 0,
      pat: closed.entities ? closed.entities.reduce(
        (a, i) => i.products.reduce((aa, ii) => parseInt(ii.pu) + parseInt(ii.caa) + aa, 0) + a, 0) : 0,
      value: closed.entities ? closed.entities.reduce(
        (a, i) => i.products.reduce((aa, ii) => parseInt(ii.pv) + aa, 0) + a, 0) : 0,
      children: closed.entities ? closed.entities.map(e => ({
        label: e.name,
        total: e.products.length,
        pat: e.products.reduce((aa, ii) => parseInt(ii.pu) + parseInt(ii.caa) + aa, 0),
        value: e.products.reduce((aa, ii) => parseInt(ii.pv) + aa, 0),
      })) : []
    },
  ]

  React.useEffect(open.read,[])
  React.useEffect(added.read, [])
  React.useEffect(selled.read, [])
  React.useEffect(closed.read, [])

  return (
    <div style={{padding:"8px"}}>
      <Row gutter={16}>
        <Col span={24}>
          <Title level={4}>Resumé Stock</Title>
        </Col>
        <Col span={24}>
          <Table
            dataSource={data} columns={columns} loading={open.status && open.status.isFetching}
            pagination={false}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Cards
