import React from 'react'
import { Table, transformDateFormat } from '../../../../../../utils'

const TableComponent = ({ read, status, entities, entityName}) => {
    React.useEffect(read,[])
    
    const data = entities && entities.length > 0 ? entities.map(e => ({
        key: e.id, date: transformDateFormat(e.created), description: e.description,
        montant: `${e.amount} ${e.currency}`, operateur: e.operator.name,
    })) : [{ key: null, date: null, description: null, montant: null, operateur: null,}]

    const loading = (status && status.isFetching) ?? false
    
    return (
        <Table data={data} loading={loading} entityName={entityName} />
    )
}

export default TableComponent