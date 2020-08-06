import React from 'react'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'
import Table from './Table'

export const Delivery = (props) => {
    const [page, setPage] = React.useState(1)

    return (
        <div style={{ padding: "8px" }}>
            <ReadEntities entityName="delivery" params={{ page: page, "_order[created]": 'desc' }}>
                {
                    rest => (
                        <Table {...rest} setPage={setPage} page={page} />
                    )
                }
            </ReadEntities>
        </div>
    )
}
