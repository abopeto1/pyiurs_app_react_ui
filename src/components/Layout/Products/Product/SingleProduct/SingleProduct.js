import React, { useEffect } from 'react'
import { Row, Col, Typography, Spin } from 'antd'
import { AddStockForm } from './AddStockForm'
import Update from '../../../../../react-redux/Entity/Update'
import { ProductMovements } from './ProductMovements'
import { ProductDetails } from './ProductDetails'

export const SingleProduct = ({ entity, read, status, ...props }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => read({ api: true, }),[])
    
    return (
        <Row gutter={8}>
            <Col xs={24} sm={14}>
                <Typography.Title level={3}>
                    {
                        (status && status.isFetching) ?  <Spin /> : (entity && entity.description)
                    }
                </Typography.Title>
            </Col>
            <Col xs={24} sm={10}>
                <Update entityName="product_stock" id={entity && entity.stock.id}>
                    {
                        rest => <AddStockForm { ...rest } />
                    }
                </Update>
            </Col>
            <Col xs={24} sm={14}>
                <ProductMovements id={props.id} />
            </Col>
            <Col xs={24} sm={10}>
                <ProductDetails entity={entity} id={props.id} status={status} />
            </Col>
        </Row>
    )
}