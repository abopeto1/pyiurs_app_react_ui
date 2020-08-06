import React, { useEffect } from 'react'
import { Spin } from 'antd'
import OrderDetails from './OrderDetails'
import UpdateEntity from '../../../../../../react-redux/Entity/Update'

const Details = (props) => {
    const { read, entity, status } = props
    useEffect(read, [])

    return (
        <div>
        {
            status && status.isFetching 
            ?
                <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <Spin />
                </div>
            :
                <UpdateEntity entityName="order" id={entity && entity.id}>
                    {
                        rest => <OrderDetails {...rest} entity={entity} />
                    }
                </UpdateEntity>
        }
        </div>
    )
}

export default Details