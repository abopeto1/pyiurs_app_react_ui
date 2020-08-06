import React from 'react'
import Entities from '../../../../react-redux/Entity/Read/Entities'
import { ProductCatalog } from './ProductCatalog'
import { CreateProduct } from './CreateProduct'
import { Row, Typography, Col } from 'antd'
import Create from '../../../../react-redux/Entity/Create'

export const Catalog = props => {
    const [page, setPage] = React.useState(1)

    return (
        <Row style={{ padding: '20px' }}>
            <Col span={12}>
                <Typography.Title level={2}>Catalogue des Produits</Typography.Title>
            </Col>
            <Col span={12}>
                <Entities entityName="type" params={{ api:true, page: 1, "segment.department": 2, }}>
                    {
                        types => (
                            <Entities entityName="brand" params={{ api: true, page: 1, }}>
                                {
                                    brands => (
                                        <Create entityName="product">
                                            {
                                                rest => (
                                                    <CreateProduct
                                                        {...rest} brands={brands}
                                                        types={types}
                                                    />
                                                )
                                            }
                                        </Create>
                                    )
                                }
                            </Entities>
                        )
                    }
                </Entities>
            </Col>
            <Col span={24}>
                <Entities entityName="product" params={{ api: true, page: page, "type.segment.department": 2, }}>
                    {
                        rest => <ProductCatalog {...rest} page={page} setPage={setPage} />
                    }
                </Entities>
            </Col>
        </Row>
    )
}