import React from 'react'
import { Typography } from 'antd'
import { Table } from '../../../../../../../../utils'

export const ProductsTable = props => {
    const { pagination, status, read, entities, page, types } = props

    React.useEffect(
        () => {
            function fetch(){
                read({
                    api: true
                })
            }
            fetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[page, types,]
    )
    const data = entities && entities.length > 0 ? entities.map(inventory_product => ({
        codebarre: inventory_product.product.codebarre,
        segment:inventory_product.product.segment,
        type:inventory_product.product.type.name,
        categorie: inventory_product.product.cat,
        key:inventory_product.id,
    })) : [{
        codebarre: null,
        segment: null,
        type: null,
        categorie: null,
        key: null,
    }]

    return (
        <>
            <Typography.Title level={4}>
                {props.title} : {pagination && pagination.total_items} Articles
            </Typography.Title>
            <Table
                loading={(status && status.isFetching) || false}
                data={data}
                pager={pagination}
            />
        </>
    )
}