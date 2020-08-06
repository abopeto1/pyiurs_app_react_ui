/* Dependencies */
import React from 'react'
import { Row, Col, Typography } from 'antd'
import TableComponent from './Table'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'

const Billing = (props) => {
  const { Title } = Typography

  return (
    <Row>
      <Col span={24} style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
        <Title level={2}>Facturation</Title>
      </Col>
      <Col span={24}>
        <ReadEntities entityName="bill" params={{today:true}}>
          {
            billProps => <TableComponent { ...billProps } />
          }
        </ReadEntities>
      </Col>
    </Row>
  )
}

export default Billing
