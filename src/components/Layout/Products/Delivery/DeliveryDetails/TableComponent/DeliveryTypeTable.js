import React, { useEffect } from 'react'
import { Table } from '../../../../../../utils'

export const DeliveryTypeTable = ({ status, read, entities, page, setPage, setOpen, ...props }) => {
    const modalAction = (id, params = {}) => {
        props.setModalParams({
            ...props.modalParams,
            type: id,
            required: params,
        })
        setOpen(true)
    }

    const data = entities ? entities.map( type => ({
        key: type.id,
        nom: type.name,
        total: type.details ? type.details.total : "",
        "Non Chargés": type.details ? type.details.totalNotLoaded : "",
        "Chargés": type.details ? type.details.totalLoaded : "",
        "Vendus": type.details ? type.details.selled : "",
        "En Boutique": type.details ? type.details.totalShop : "",
        modals:{
            total:{
                tag: true, onClick: () => modalAction(type.id, {}),
                color: "#108ee9",
            },
            "Non Chargés": {
                tag: true, onClick: () => modalAction(type.id, { moveStatus: 0,}),
                color: "#d9363e",
            },
            "Chargés": {
                tag: true, onClick: () => modalAction(type.id, { moveStatus: 1,}),
                color: "#1890ff",
            },
            "Vendus": {
                tag: true, onClick: () => modalAction(type.id, {
                    "stock.available": false, moveStatus: 1
                }),
                color: "#e91e63",
            },
            "En Boutique": {
                tag: true, onClick: () => modalAction(type.id, {
                    moveStatus: 1, "stock.available": true, 
                }),
                color: "#ff5722",
            },
        }
    })) : [{
        key: null, nom: null, total: null, "Non Chargés": null, "Chargés": null,
        "Vendus": null, "En Boutique": null,
    }]

    useEffect(() => {
        function fetch(){
            read({ api: true, })
        }
        fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page])

    return (
        <Table
            data={data} loading={(status && status.isFetching) || false}
            pager={props.pagination} page={page} setPage={setPage}
        />
    )
}