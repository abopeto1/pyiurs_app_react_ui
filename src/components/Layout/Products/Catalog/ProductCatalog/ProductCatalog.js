import React, {useEffect} from 'react'
import { Table } from '../../../../../utils'

export const ProductCatalog = ({ read, status, entities, page, ...props}) => {
    useEffect(() => read(), [read, page])

    const data = entities !== undefined && entities.length > 0 ? entities.map(product => ({
        key: product.id,
        codebarre: product.codebarre,
        description: product.description,
        taille: product.taille,
        pu: product.pu,
        couleur: product.couleur,
        marque: product.brand ? product.brand.name : product.marque,
        pv: 0,
        type: product.type ? product.type.name : "",
        segment: product.type && product.type.segment ? product.type.segment.name : "",
        linkedPage: {
            "codebarre": {
                pathname: `/stock/catalogs/products`,
            },
        }
    })) : [{
        key: null,
        codebarre: null,
        description: null,
        taille: null,
        pu: null,
        couleur: null,
        marque: null,
        pv: null,
        type: null,
        segment: null,
    }]

    return (
        <Table
            data={data} loading={(status && status.isFetching) ?? false} entityName="product"
            pager={props.pagination} setPage={props.setPage} page={page}
        />
    )
}