/* Dependencies */
import React from 'react'
import { Row, Col, Typography, Tabs } from 'antd'
import DailySell from './DailySell'
import BillReport from './BillReport'
import SellReport from './SellReport'

export const AllReports = (props) => {
    const { Title } = Typography
    const { TabPane } = Tabs

    return (
        <Row>
            <Col span={24} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Title level={2}>Rapports</Title>
            </Col>
            <Col span={24}>
                <div className="card-container">
                    <Tabs type="card">
                        <TabPane tab="Vente Journalière" key={0}>
                            <DailySell />
                        </TabPane>
                        <TabPane tab="Rapport Vente Par Facture" key={1}>
                            <BillReport />
                        </TabPane>
                        <TabPane tab="Rapport Vente Produit" key={2}>
                            <SellReport />
                        </TabPane>
                    </Tabs>
                </div>

            </Col>
        </Row>
    )
}
