import React from 'react'
import Entities from '../../../../react-redux/Entity/Read/Entities'
import { SegmentTable } from './SegmentTable'
import { CreateSegment } from './CreateSegment'
import { Row, Typography, Col } from 'antd'
import Create from '../../../../react-redux/Entity/Create'

export const Segment = props => {
    return (
        <Row style={{ padding: '20px' }}>
            <Col span={12}>
                <Typography.Title level={2}>Segments</Typography.Title>
            </Col>
            <Col span={12}>
                <Entities entityName="product_department" params={{}}>
                    {
                        productDepartment => (
                            <Create entityName="segment" productDepartment={productDepartment}>
                                {
                                    rest => <CreateSegment {...rest} />
                                }
                            </Create>
                        )
                    }
                </Entities>
            </Col>
            <Col span={24}>
                <Entities entityName="segment" params={{ api: true, page: 1,  }}>
                    {
                        rest => <SegmentTable {...rest} />
                    }
                </Entities>
            </Col>
        </Row>
    )
}