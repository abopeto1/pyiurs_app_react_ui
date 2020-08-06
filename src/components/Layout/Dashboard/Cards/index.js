import React from 'react'
import { Row, Col } from 'antd'
import ReadEntity from '../../../../react-redux/Entity/Read/Entity'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'
// import { transformDateFormat } from '../../../../utils'
import Sell from './Sell'
import PatVsBuy from './PatVsBuy'

const Cards = () => {
  return (
    <Row gutter={[8,8]}>
      <Col xs={24} md={16} lg={16}>
        <ReadEntities entityName="dashboard" params={{ sell_activity: true }}>
          {
            rest => (
              <Sell {...rest} style={{ height: "100%" }} />
            )
          }
        </ReadEntities>
      </Col>
      <Col xs={24} md={8} lg={8}>
        <ReadEntity entityName="dashboard" id={2}>
        {
          rest => <PatVsBuy {...rest} style={{height:"100%"}} />
        }
        </ReadEntity>
      </Col>
    </Row>
  )
}

export default Cards
