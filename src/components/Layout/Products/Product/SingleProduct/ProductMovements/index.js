import React, { useState } from 'react'
import { ProductMovements as Table } from './ProductMovements'
import Entities from '../../../../../../react-redux/Entity/Read/Entities'

export const ProductMovements = props => {
    const [page, setPage] = useState(1)

    return (
        <Entities
            entityName="product_movement"
            params={{ api:true, page: page, parentName: "product", parentId: props.id }}
        >
            {
                rest => <Table { ...rest } page={page} setPage={setPage} />
            }
        </Entities>
    )
}