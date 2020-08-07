/* Dependencies */
import React from 'react'
import { Row, Col, Typography } from 'antd'
import TableComponent from './Table'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'

const Products = (props) => {
  const { Title } = Typography
  const [page, setPage] = React.useState(1)

  return (
    <Row>
      <Col span={24} style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
        <Title level={2}>Produits en Boutique</Title>
      </Col>
      <Col span={24}>
        <ReadEntities
          entityName="product"
          params={{ page: page, "stock.available":true, "type.segment.department": 1, }}
        >
          {
            rest => <TableComponent { ...rest } setPage={setPage} page={page} />
          }
        </ReadEntities>
      </Col>
    </Row>
  )
}

export default Products
