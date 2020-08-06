/* Dependencies */
import React from 'react'
import { Row, Col, Typography, Tabs } from 'antd'
import {DebitDivers} from './DebitDivers'
import BillToPay from './BillToPay'

export const Debit = (props) => {
  const { Title } = Typography
  const { TabPane } = Tabs

  return (
    <Row>
      <Col span={24} style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
        <Title level={2}>Débit</Title>
      </Col>
      <Col span={24}>
        <div className="card-container">
          <Tabs type="card">
            <TabPane tab="Débit Client" key={0}>
              <BillToPay />
            </TabPane>
            <TabPane tab="Débit Divers" key={1}>
              <DebitDivers />
            </TabPane>
          </Tabs>
        </div>

      </Col>
    </Row>
  )
}
