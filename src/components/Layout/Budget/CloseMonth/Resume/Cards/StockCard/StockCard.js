import React, { useEffect } from 'react'

export const StockCard = (props) => {
    const { read, status, entity } = props
    useEffect(read,[])
    console.log(entity, status)

    return (
        <div>Okay</div>
    )
}