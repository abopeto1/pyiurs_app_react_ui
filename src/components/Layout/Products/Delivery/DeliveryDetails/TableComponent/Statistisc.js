import React from 'react'
import { Row, List, Col, Space} from 'antd'

export const DeliveryStatistics = ({delivery}) => {
    const data = [
        {
            title: "Valeur Produits en Boutique",
            description: "",
            value: delivery ? delivery.loadedValue + ' $' : "",
        },
        {
            title: "Valeur Produits en Entrepot",
            description: "",
            value: delivery ? delivery.notLoadedValue + ' $' : "",
        },
        {
            title: "Valeur Produits Vendus",
            description: "",
            value: delivery ? delivery.selledValue + ' $' : "",
        },
        {
            title: "Total Vente",
            description: "",
            value: delivery ? delivery.netValue + ' $' : "",
        },
        {
            title: "Taux de rentabilité",
            description: "",
            value: delivery ? delivery.benefits + ' %' : "",
        },
    ]
    return (
        <Row gutter={8}>
            <Col span={24}>
                <List
                    size="small"
                    itemLayout="horizontal" dataSource={data}
                    renderItem={
                        item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.title}
                                // description={item.description}
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