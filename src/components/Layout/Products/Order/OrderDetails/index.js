import React from 'react'
import { useParams } from 'react-router-dom'
import ReadEntity from '../../../../../react-redux/Entity/Read/Entity'
import Details from './Details'

export const OrderDetails = () => {
    const {id} = useParams()

    return (
        <div style={{padding:"8px"}}>
            <ReadEntity entityName="order" id={id}>
            {
                props => <Details {...props} />
            }
            </ReadEntity>
        </div>
    )
}
