import React, { useEffect } from 'react'
import { Divider } from 'antd'
import { Table, transformDateFormat } from '../../../../../utils'

const History = props => {
    const { entities, read, status } = props

    useEffect(read, [])

    const data = entities ? entities.map(e => ({
        key: e.id, date: transformDateFormat(e.created), ouverture: e.open, "ajouté": e.added, vendu: e.selled,
        fermeture: e.closed, pat: e.pat_value_closed.toFixed(0), "valeur Vente": e.value_closed.toFixed(0),
    })) : [{
        key: null, date: null, ouverture: null, "ajouté": null, vendu: null,
        fermeture: null, pat: null, "valeur Vente": null,}]
    
    return (
        <div>
            <Divider>Historique Mensuelle</Divider>
            <Table data={data} loading={(status && status.isFetching) ?? false} />
        </div>
    )
}

export default History