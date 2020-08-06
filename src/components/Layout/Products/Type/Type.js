import React from 'react'
import Entities from '../../../../react-redux/Entity/Read/Entities'
import { TypeTable } from './TypeTable'
import { CreateType } from './CreateType'
import { Row, Typography, Col } from 'antd'
import Create from '../../../../react-redux/Entity/Create'

export const Type = props => {
    const [page, setPage] = React.useState(1)

    return (
        <Row style={{ padding: '20px' }}>
            <Col span={12}>
                <Typography.Title level={2}>Types</Typography.Title>
            </Col>
            <Col span={12}>
                <Entities entityName="segment" params={{ api: true, page: 1, }}>
                    {
                        segments => (
                            <Create entityName="type">
                                {
                                    rest => <CreateType {...rest} segments={segments} />
                                }
                            </Create> 
                        ) 
                    }
                </Entities>
            </Col>
            <Col span={24}>
                <Entities entityName="type" params={{ api: true, page: page,  }}>
                    {
                        rest => <TypeTable {...rest} setPage={setPage} />
                    }
                </Entities>
            </Col>
        </Row>
    )
}