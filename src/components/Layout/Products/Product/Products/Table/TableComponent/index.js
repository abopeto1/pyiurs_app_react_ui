/* Dependencies */
import React from 'react'
import { Link } from 'react-router-dom'
import { Typography,Table,Row,Button } from 'antd'
import { transformData } from './transformData'

const ProductComponent = (props) => {
  const { Title } = Typography
  const { read, entities, status } = props

  React.useEffect(() => {
    read()
  },[read])

  const columns = [
    {
      title:"Nom",
      dataIndex:"name",
      key:"name",
      render:(name,record) => <Link to={`/promotion/${record.id}`}>{name}</Link>
    },
    {title:"Type",dataIndex:"type",key:"type"},
    {title:"Variable",dataIndex:"variable",key:"variable"},
    {
      title:"Action",
      dataIndex:"id",
      key:"id",
      render: (name,r) => (
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <Button type="primary" size="small">Modifier</Button>
          <Button type="danger" size="small">Supprimer</Button>
        </div>
      )
    },
  ]

  const data = entities !== undefined ? transformData(entities) : []

  return (
    <div style={{padding:'8px'}}>
      <Row style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
        <Title level={2}>Produits</Title>
      </Row>
      <Table columns={columns} dataSource={data} loading={status && status.isFetching} />
    </div>
  )
}

export default ProductComponent
