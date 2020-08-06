import React from 'react'
import Entities from '../../../../react-redux/Entity/Read/Entities'
import { Services } from './Services'
import { CreateService } from './CreateService'
import { Row, Typography, Col } from 'antd'
import Create from '../../../../react-redux/Entity/Create'

export const Service = props => {
    const [page, setPage] = React.useState(1)

    return (
        <Row style={{ padding: '20px' }}>
            <Col span={12}>
                <Typography.Title level={2}>Services</Typography.Title>
            </Col>
            <Col span={12}>
                <Entities entityName="segment" params={{ api: true, page: 1, "department": 3, }}>
                    {
                        segments => (
                            <Entities entityName="type" params={{ api: true, page: 1, "segment.department": 3, }}>
                                {
                                    types => (
                                        <Create entityName="product">
                                            {
                                                rest => (
                                                    <CreateService
                                                        {...rest} types={types} segments={segments}
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
                <Entities entityName="product"params={{ api: true, page: page, "type.segment.department": 3, }}>
                    {
                        rest => <Services {...rest} page={page} setPage={setPage} />
                    }
                </Entities>
            </Col>
        </Row>
    )
}