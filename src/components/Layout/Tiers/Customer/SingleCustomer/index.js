import React from 'react'
import { SingleCustomer as Customer } from './SingleCustomer'
import Entity from '../../../../../react-redux/Entity/Read/Entity'

export const SingleCustomer = ({ match, ...props}) => {
    return (
        <div style={{ padding: '20px', }}>
            {
                match.params.id ? (
                    <Entity entityName="customer" id={match.params.id}>
                        {
                            rest => <Customer {...rest} />
                        }
                    </Entity>
                ) : "Customer Not Found"
            }
        </div>
    )
}