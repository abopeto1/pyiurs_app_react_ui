import React from 'react'

export const MonthSellUser = (props) => {
    const { read, entity } = props
    const roles = sessionStorage.roles ? sessionStorage.roles.split(',') : []
    
    React.useEffect(read, [])

    return (
        <div style={{
            marginBottom: '8px', padding: 8, backgroundColor: '#1890ff', fontSize: 14, display: 'flex',
            justifyContent: 'space-around',
            }}>
            <h3 style={{ color: 'white', }}>Mes Ventes : {entity && Math.round(entity.total_sell_month)}</h3>
            <h3 style={{ color: 'white', }}>Ma Commission:
            {
                roles.includes('ROLE_ADMIN') 
                ? 
                    (
                        entity && Math.round(entity.total_sell_month*0.01)
                    )
                : 0
            }
            </h3>
        </div>
    )
}