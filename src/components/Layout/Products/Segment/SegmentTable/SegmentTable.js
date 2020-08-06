import React, {useEffect} from 'react'
import { Table } from '../../../../../utils'

export const SegmentTable = ({ read, status, entities, params, ...props}) => {
    const { page } = params

    useEffect(read, [page])

    const data = entities !== undefined && entities.length > 0 ? entities.map(segment => ({
        key: segment.id,
        nom: segment.name,
        departement: segment.department ? segment.department.name : "Aucun",
    })) : [{ key: null, nom: null, department: null, }]

    return (
        <Table data={data} loading={(status && status.isFetching) ?? false} />
    )
}