/* Dependencies */
import React from 'react'
import { Row, Col, Typography, Tabs } from 'antd'
import CreditDivers from './CreditDivers'
import CreditBank from './CreditBank'
// import CreditProvider from './CreditProvider'

export const Credit = (props) => {
  const { Title } = Typography
  const { TabPane } = Tabs

  return (
    <Row>
      <Col span={24} style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
        <Title level={2}>Crédit</Title>
      </Col>
      <Col span={24}>
        <div className="card-container">
          <Tabs type="card">
            <TabPane tab="Crédit Bancaire" key={0}>
              <CreditBank />
            </TabPane>
            <TabPane tab="Crédit Divers" key={1}>
              <CreditDivers />
            </TabPane>
            {
              // <TabPane tab="Crédit Fournisseur" key={2}>
              //   <CreditProvider />
              // </TabPane>
            }
          </Tabs>
        </div>

      </Col>
    </Row>
  )
}
