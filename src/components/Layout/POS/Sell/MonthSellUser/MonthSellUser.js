import React from 'react'
import Entities from '../../../../../react-redux/Entity/Read/Entities'
import { SellerCommission } from './SellerCommission'

export const MonthSellUser = (props) => {
    const { read, entity } = props
    
    React.useEffect(read, [])

    return (
        <div style={{
            marginBottom: '8px', padding: 8, backgroundColor: '#1890ff', fontSize: 14, display: 'flex',
            justifyContent: 'space-around',
            }}>
            <h3 style={{ color: 'white', }}>Mes Ventes : {entity && Math.round(entity.total_sell_month)}</h3>
            <Entities entityName="agent" params={{ "user.id": sessionStorage.id}}>
                {
                    rest => <SellerCommission {...rest} />
                }
            </Entities>
        </div>
    )
}