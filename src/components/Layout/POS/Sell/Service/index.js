import React from 'react'
import { Row, Col } from 'antd'
import CreateForm from './CreateForm'
import Table from './TableComponent'
import CreateEntity from '../../../../../react-redux/Entity/Create'
import ReadEntities from '../../../../../react-redux/Entity/Read/Entities'
import { transformDateFormat } from '../../../../../utils'

const Service = () => {
    return (
        <Row gutter={[8,8]}>
            <Col xs={24} md={12}>
                <CreateEntity entityName="service">
                    {
                        props => <CreateForm { ...props } />
                    }
                </CreateEntity>
            </Col>
            <Col xs={24} md={12}>
                <ReadEntities entityName="service" params={{date: transformDateFormat(new Date())}}>
                    {
                        rest => <Table {...rest} />
                    }
                </ReadEntities>
            </Col>
        </Row>
    )
}

export default Service