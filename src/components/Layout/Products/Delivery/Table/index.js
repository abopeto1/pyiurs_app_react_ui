import React, { useEffect } from 'react'
import { Row, Col ,Typography } from 'antd'
import { Table } from '../../../../../utils'
import moment from 'moment'

const TableComponent = ({read,status,entities, page, setPage, ...props}) => {
    useEffect(() => {
        function fetch(){
            read({ api: true, })
        }
        fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [read, page]
)
    
    const data = entities ? entities.map(delivery => ({
        key: delivery.id,
        nom: delivery.name,
        total: delivery.totalProducts,
        "Non Chargés": delivery.productsNotLoaded,
        "Chargés": delivery.productsLoaded,
        pat: delivery.pat,
        "Prix Vente": delivery.sellValue,
        date: moment(delivery.created).format('YYYY-MM-DD HH:MM'),
        linkedPage: {
            nom: {
                pathname: '/stock/deliveries',
                state: {
                    entity: delivery,
                },
            }
        }
    })): [{
        key: null,
        nom: null,
        total: null,
        "Non Chargés": null,
        "Chargés": null,
        pat: null,
        sell: null,
        date: null,
    }]
    
    return (
        <Row gutter={[8,8]}>
            <Col span={24}>
                <Typography.Title level={4}>Liste de Livraisons</Typography.Title>
                <Table
                    data={data}
                    loading={(status && status.isFetching) || false}
                    pager={props.pagination} setPage={setPage} page={page}
                />
            </Col>
        </Row>
    )
}

export default TableComponent