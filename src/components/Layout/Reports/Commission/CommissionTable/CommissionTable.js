import React, { useEffect } from 'react'
import {Table} from '../../../../../utils'

export const CommissionTable = props => {
    const { read, status, entities, page } = props

    useEffect(() => {
        function fetch(){
            read({
                api: true,
            })
        }
        fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const data = entities ? entities.map( commission => ({
        key: commission.id,
        mois: commission.month,
        agent: commission.seller,
    })) : [{
        key: null,
        mois: null,
        agent: null,
    }]

    return (
        <Table
            data={data}
            loading={(status && status.isFetching) || false}
            pager={props.pagination}
        />
    )
}