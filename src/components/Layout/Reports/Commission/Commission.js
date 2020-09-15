import React from 'react'
import { Typography, Row, Col } from 'antd'
import { AddCommissionForm } from './AddCommissionForm'
import { CommissionTable } from './CommissionTable'
import moment from 'moment'
import Entities from '../../../../react-redux/Entity/Read/Entities'

export const Commission = props => {
    const [page, setPage] = React.useState(1)
    
    return (
        <div>
            <Row>
                <Col xs={24} sm={12}>
                    <Typography.Title level={3}>Commission Agent</Typography.Title>
                </Col>
                <Col xs={24} sm={12} style={{ textAlignLast: "end", padding: '4px'}}>
                    <AddCommissionForm />
                </Col>
            </Row>
            <Entities entityName="commission" params={{ page:page, month: moment().format("YYYY[-]MM")}}>
            {
                rest => <CommissionTable {...rest} setPage={e => setPage(e)} />
            }
            </Entities>
        </div>
    )
}