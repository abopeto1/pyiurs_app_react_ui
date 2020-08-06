import React, { useEffect } from 'react'
import { Row, Col, Typography } from 'antd'
import { Table } from '../../../../../../utils'
import moment from 'moment'

export const CustomerSellHistory = (props) => {
    const { read, entities, status, page } = props

    useEffect(read,[])

    const data = entities ? entities.map( billDetail => ({
        key: billDetail.id,
        date: moment(billDetail.created).format("YYYY mm DD HH:ii"),
        produit: billDetail.product.description,
        type: billDetail.product.type ? billDetail.product.type.name : "",
        "vendu à": billDetail.net,
    })) : [{
        key: null,
        date: null,
        produit: null,
        type: null,
        "vendu à": null,
    }]

    return (
        <Row>
            <Col span={24}>
                <Typography.Title level={4}>Historique Achat</Typography.Title>
            </Col>
            <Col span={24}>
                <Table
                    data={data} loading={(status && status.isFetching) || false}
                    pager={props.pagination} page={page} setPage={props.setPage}
                />
            </Col>
        </Row>
    )
}