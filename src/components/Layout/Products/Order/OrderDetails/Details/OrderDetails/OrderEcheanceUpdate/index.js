import React from 'react'
import { Button, message } from 'antd'

const OrderEcheanceUpdate = (props) => {
    const { update, status } = props

    return (
        <Button type="primary" loading={status && status.isFetching} onClick={() => update({
            operator: parseInt(sessionStorage.id),
        },{
            onSuccess: d => {
                message.success("Echeance payé avec succés")
            },
            onFail: e => {
                message.error("Something wrong")
                console.log(e)
            }
        })}>
            Payer
        </Button>
    )
}

export default OrderEcheanceUpdate