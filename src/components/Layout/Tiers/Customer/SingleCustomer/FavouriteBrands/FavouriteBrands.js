import React, { useEffect } from 'react'
import { Row, Col, Typography, Spin, Tag } from 'antd'

export const FavouriteBrands = ({ read, entities, status, ...props}) => {
    useEffect(read,[])

    return (
        <Row>
            <Col span={24}>
                <Typography.Title level={4}>Marques Préférées</Typography.Title>
            </Col>
            <Col span={24}>
                <Row gutter="8">
                    {
                        status && status.isFetching ? 
                        (
                            <div style={{ textAlign: "center"}}><Spin /></div>
                        ) : (
                            (entities && entities.length > 0) ? entities.map( brand => (
                                <Col span={3}><Tag>{brand.name}</Tag></Col>
                            )) : <Col span={24}>Aucun</Col>
                        )
                    }
                </Row>
            </Col>
        </Row>
    )
}