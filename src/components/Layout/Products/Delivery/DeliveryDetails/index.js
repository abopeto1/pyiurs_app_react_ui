import React from 'react'
import { useParams } from 'react-router-dom'
import Entity from '../../../../../react-redux/Entity/Read/Entity'
import TableComponent from './TableComponent'

export const DeliveryDetails = (rest) => {
    const {id} = useParams()
    const { state } = rest.location

    return (
        <div style={{padding:"8px"}}>
            <Entity entityName="delivery" id={id}>
                {
                    props => (
                        <TableComponent {...props } delivery={state && state.entity} />
                    )
                }
            </Entity>
        </div>
    )
}
