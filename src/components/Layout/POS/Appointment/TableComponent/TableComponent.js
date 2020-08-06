import React, { useEffect } from 'react'
import { Table } from '../../../../../utils'
import moment from 'moment'

export const TableComponent = ({ read, status, entities, entityName, params}) => {
    const { page } = params
    useEffect(read,[page])
    
    const data = entities && entities.length > 0 ? entities.map(e => ({
        key: e.id,
        date: moment(e.created).format("DD MMM YYYY HH:mm"),
        code: e.code,
        service: e.service ? e.service.description : "Aucun",
        client: e.customer.name,
        agent: e.agent.name,
    })) : [{ key: null, date: null, code: null, service: null, client: null, agent: null,}]

    const loading = (status && status.isFetching) ?? false
    
    return (
        <Table data={data} loading={loading} entityName={entityName} />
    )
}
