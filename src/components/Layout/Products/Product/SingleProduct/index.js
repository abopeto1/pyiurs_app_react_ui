import React from 'react'
import { SingleProduct as Product } from './SingleProduct'
import Entity from '../../../../../react-redux/Entity/Read/Entity'

export const SingleProduct = ({ match, ...props}) => {
    return (
        <div style={{ padding: '20px', }}>
            {
                match.params.id ? (
                    <Entity entityName="product" id={match.params.id}>
                        {
                            rest => <Product {...rest} />
                        }
                    </Entity>
                ) : "Product Not Found"
            }
        </div>
    )
}