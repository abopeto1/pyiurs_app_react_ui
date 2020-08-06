import React, {useEffect} from 'react'
import { Table } from '../../../../../utils'

export const BrandTable = ({ read, status, entities, params, ...props}) => {
    const { page } = params
    useEffect(read, [page])

    const data = entities !== undefined && entities.length > 0 ? entities.map(brand => ({
        key: brand.id,
        nom: brand.name,
        slogan: brand.slogan ,
    })) : [{ key: null, nom: null, slogan: null }]

    return (
        <Table data={data} loading={(status && status.isFetching) ?? false} />
    )
}