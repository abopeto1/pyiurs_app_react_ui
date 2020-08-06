import React from 'react'
import Entities from '../../../../react-redux/Entity/Read/Entities'
import { BrandTable } from './BrandTable'
import { CreateBrand } from './CreateBrand'
import { Row, Typography, Col } from 'antd'
import Create from '../../../../react-redux/Entity/Create'

export const Brand = props => {
    return (
        <Row style={{ padding: '20px' }}>
            <Col span={12}>
                <Typography.Title level={2}>Marques</Typography.Title>
            </Col>
            <Col span={12}>
                <Create entityName="brand">
                    {
                        rest => <CreateBrand { ...rest } />
                    }
                </Create> 
            </Col>
            <Col span={24}>
                <Entities entityName="brand" params={{ api: true, page: 1,  }}>
                    {
                        rest => <BrandTable {...rest} />
                    }
                </Entities>
            </Col>
        </Row>
    )
}