import React, { useEffect } from 'react'
import { Row, Col, Typography, Spin } from 'antd'
import { FavouriteBrands } from './FavouriteBrands'
import Entities from '../../../../../react-redux/Entity/Read/Entities'
import { CustomerSellHistory } from './CustomerSellHistory/CustomerSellHistory'

export const SingleCustomer = ({ entity, read, status, ...props }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => read({ api: true, }),[])
    const [page, setPage] = React.useState(1)

    return (
        <Row gutter={8}>
            <Col span={24}>
                <Typography.Title level={3}>
                    {
                        (status && status.isFetching) ?  <Spin /> : (entity && entity.name)
                    }
                </Typography.Title>
            </Col>
            <Col span={24}>
                <Entities entityName="brand" params={{
                    api: true, page: 1, "products.billDetails.bill.customer": props.id
                }}>
                    {
                        rest => <FavouriteBrands { ...rest } />
                    }
                </Entities>
                <Entities entityName="bill_detail" params={{
                    api: true, page: page, "bill.customer": props.id
                }}>
                    {
                        rest => <CustomerSellHistory {...rest} page={page} setPage={setPage} />
                    }
                </Entities>
            </Col>
        </Row>
    )
}