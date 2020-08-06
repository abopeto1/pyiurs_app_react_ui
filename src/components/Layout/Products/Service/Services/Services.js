import React, {useEffect} from 'react'
import { Table } from '../../../../../utils'

export const Services = ({ read, status, entities, params, page, setPage, ...props}) => {
    useEffect(() => read(), [read, page])

    const data = entities !== undefined && entities.length > 0 ? entities.map(product => ({
        key: product.id,
        codebarre: product.codebarre,
        description: product.description,
        pv: 0,
        type: product.type ? product.type.name : "",
        segment: product.segment ? product.segment.name : "",
        linkedPage: {
            pathname: `/stock/services`,
            dataIndex: "codebarre",
        }
    })) : [{
        key: null,
        codebarre: null,
        description: null,
        pv: null,
        type: null,
        segment: null,
    }]

    return (
        <Table
            data={data} loading={(status && status.isFetching) ?? false}
            entityName="product" page={page} setPage={setPage} pager={props.pagination}
        />
    )
}