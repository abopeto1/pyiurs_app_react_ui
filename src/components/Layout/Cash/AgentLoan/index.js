import React from 'react'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'
import Table from './Table'

export const AgentLoan = propss => {
    return (
        <ReadEntities entityName="agent" params={{}}>
            {
                rest => <Table { ...rest } />
            }
        </ReadEntities>
    )
}
