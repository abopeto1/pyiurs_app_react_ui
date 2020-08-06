import React from 'react'
import { Row, List, Col, Space } from 'antd'

export const Details = ({ delivery, ...props }) => {
    const data = [
        {
            title: "Agence",
            description: "",
            value: delivery ? delivery.agency : "",
        },
        {
            title: "Poids",
            description: "",
            value: delivery ? delivery.weight : "",
        },
        {
            title: "Frais Agence",
            description: "",
            value: delivery && delivery.costs_agency ? delivery.costs_agency + ' $' : "",
        },
        {
            title: "Frais Accéssoires D'Achat",
            description: delivery ? delivery.details : "",
            value: delivery && delivery.costs_other ? delivery.costs_other + ' %' : "",
        },
    ]
    return (
        <Row gutter={8}>
            <Col span={24}>
                <List
                    title="Détails" size="small"
                    itemLayout="horizontal" dataSource={data}
                    renderItem={
                        item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.title}
                                    description={item.description}
                                />
                                <Space>
                                    <div>{item.value}</div>
                                    {item.addComponent && item.addComponent}
                                </Space>
                            </List.Item>
                        )
                    }
                />
            </Col>
        </Row>
    )
}