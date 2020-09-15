import React, { useEffect } from 'react'
import { Spin } from 'antd'

export const SellerCommission = props => {
    const { read, entities, status } = props

    useEffect(() => {
        function fetch(){
            read({
                api: true,
            })
        }
        fetch()
    // eslint-disable-next-line
    },[1])

    const data = entities && entities[0] ? entities[0] : [{ monthCommission: 0 }]

    return (
        <h3 style={{ color: 'white', }}>Ma Commission sur Vente:
            {
                status && status.isFetching ? <Spin color="white" /> : data.monthCommission
            }
        </h3>
    )
}