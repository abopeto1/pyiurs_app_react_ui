import React from 'react'
import { Row, Col, Typography, List, Space } from 'antd'
import Create from '../../../../../../react-redux/Entity/Create'
import { AddSampleForm } from '../AddSampleForm'

export const ProductDetails = ({entity, status,  ...props}) => {
    const data = [
        {
            title: "Echantillon",
            description: entity && entity.availableSample ? "Disponible" : "Aucun",
            addComponent: <Create entityName="product_sample">
                {
                    rest => <AddSampleForm { ...rest } productId={props.id} />
                }
            </Create>  ,
        },
        {
            title: "Stock",
            description: !entity ? "" : entity.stock && !entity.stock.available
                ? "Epuisé" : entity.stock.availableQte ,
        },
        {
            title: "Type", description: entity && entity.type && entity.type.name,
        },
        {
            title: "Marque", description: entity && entity.brand && entity.brand.name,
        },
        {
            title: "Codebarre", description: entity && entity.codebarre,
        },
        {
            title: "Taille", description: entity && entity.taille,
        },
        {
            title: "Couleur", description: entity && entity.couleur,
        },
    ]
    return (
        <Row gutter="8">
            <Col span={24}><Typography.Title level={4}>Détails</Typography.Title></Col>
            <Col span={24}>
                <List
                    size="small"
                    itemLayout="horizontal" dataSource={data}
                    loading={status && status.isFetching}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.title}
                                // description={item.description}
                            />
                            <Space>
                                <div>{item.description}</div>
                                {item.addComponent && item.addComponent}
                            </Space>
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    )
}