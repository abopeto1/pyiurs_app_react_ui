/* Dependencies */
import React from 'react'
import { Row, Col, Typography, Tabs } from 'antd'
import ExpenceReport from './ExpenceReport'

export const ExpenceReports = (props) => {
    const { Title } = Typography
    const { TabPane } = Tabs

    return (
        <Row>
            <Col span={24} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Title level={2}>Rapports Dépense</Title>
            </Col>
            <Col span={24}>
                <div className="card-container">
                    <Tabs type="card">
                        <TabPane tab="Rapport Dépense" key={0}>
                            <ExpenceReport />
                        </TabPane>
                    </Tabs>
                </div>

            </Col>
        </Row>
    )
}
