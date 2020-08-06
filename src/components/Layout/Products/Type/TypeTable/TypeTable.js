import React, {useEffect} from 'react'
import { Table } from '../../../../../utils'

export const TypeTable = ({ read, status, entities, page, setPage, ...props}) => {
    useEffect(() => read(), [read,page])

    const data = entities !== undefined && entities.length > 0 ? entities.map(type => ({
        key: type.id,
        nom: type.name,
        segment: type.segment ? type.segment.name : "Aucun",
    })) : [{ key: null, nom: null, segment: null }]

    return (
        <Table
            data={data} loading={(status && status.isFetching) ?? false} page={page}
            pager={props.pagination} setPage={setPage} entityName={props.entityName}
        />
    )
}