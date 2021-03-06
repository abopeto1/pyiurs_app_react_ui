/* Dependencies */
import React from 'react'
import moment from 'moment'
import { Table } from '../../../../../utils'
import { DeleteInventory } from './DeleteInventory'
import Delete from '../../../../../react-redux/Entity/Delete'

export const InventoryTable = (props) => {
    const { read, entities, status, page, setPage } = props

    React.useEffect(
        () => {
            function fetch(){
                read({
                    api: true,
                })
            }
            fetch()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [page]
    )

    const data = entities && entities.length > 0 ? entities.map(inventory => ({
        key: inventory.id,
        nom: `Inventaire du ${moment(inventory.created).format('YYYY-MM-DD')}`,
        total: inventory.total,
        "scannés": inventory.scanned,
        "non scannés": inventory.notScanned,
        linkedPage: {
            nom: {
                pathname: "/stock/inventories",
                id: inventory.id,
            },
        },
        action: <Delete entityName="inventory" id={inventory.id}>
            {
                rest => <DeleteInventory { ...rest } read={read} />
            }
        </Delete>,
    })) : [
        {
            key: null,
            nom: null,
            total: null,
            "scannés": null,
            "non scannés": null,
        },
    ]

    return (
        <Table
            data={data} loading={(status && status.isFetching) || false}
            pager={props.pagination} page={page} setPage={setPage}
        />
    )
}
