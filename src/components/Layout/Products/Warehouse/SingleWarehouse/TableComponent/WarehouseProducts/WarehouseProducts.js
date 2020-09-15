import React, { useEffect } from 'react'
import {Table} from "../../../../../../../utils"
import { Typography } from 'antd'

export const WarehouseProducts = props => {
    const { read, entities, page, setPage, status } = props

    useEffect(() => {
        function fetch(){
            read({
                api: true
            })
        }
        fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    const data = entities ? entities.map(product => ({
        key: product.id,
        codebarre: product.codebarre,
        type: product.type.name,
        segment: product.segment,
        "catégorie": product.cat,
        "code Livraison": product.delivery.name,
        taille: product.taille,
        couleur: product.couleur,
        marque: product.marque,
        description: product.description,
        "PU": product.pu,
        "CAA": product.caa,
        "PV": product.pv,
    })) : [{
        key: null,
        codebarre: null,
        type: null,
        segment: null,
        "catégorie": null,
        "code Livraison": null,
        taille: null,
        couleur: null,
        marque: null,
        description: null,
        "PU": null,
        "CAA": null,
        "PV": null,
    }]

    return (
        <React.Fragment>
            <Typography.Title level={4}>
                {`${props.pagination ? props.pagination.total_items : 0} produits`}
            </Typography.Title>
            <Table
                data={data}
                setPage={setPage} page={page}
                loading={(status && status.isFetching) || false}
                pager={props.pagination} 
            />
        </React.Fragment>
    )
}