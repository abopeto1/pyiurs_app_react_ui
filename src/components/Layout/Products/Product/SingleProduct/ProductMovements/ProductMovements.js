import React from 'react'
import { Table, } from '../../../../../../utils'
import moment from 'moment'
import { Row, Col, Typography } from 'antd'

export const ProductMovements = props => {
    const { read, entities, status, page } = props

    React.useEffect(
        () => {
            function fetch(){
                read()
            }
            fetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [page]
    )
    const data = entities && entities.length > 0 ? entities.map(movement => ({
        key: movement.id,
        operation: movement.type,
        qte: movement.qte,
        date: moment(movement.created).format(),
    })) : [{
        key: null,
        operation: null,
        qte: null,
        date: null,
    }]

    return (
        <Row>
            <Col span={24}>
                <Typography.Title level={4}>Historique Mouvement</Typography.Title>
            </Col>
            <Col span={24}>
                <Table
                    entityName="Product Movement" data={data} pager={props.pagination}
                    page={page} setPage={props.setpage} loading={(status && status.isFetching) || false}
                />
            </Col>
        </Row>
    )
}