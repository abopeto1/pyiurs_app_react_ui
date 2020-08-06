/* Dependencies */
import React from 'react'
import { Tabs } from 'antd'
import Sell from './Sell'
import Service from './Service'
import { MonthSellUser } from './MonthSellUser/MonthSellUser'
import ReadEntity from '../../../../react-redux/Entity/Read/Entity'

const SellComponent = () => {
    const { TabPane } = Tabs

    return (
        <div style={{ padding: '8px' }}>
            <ReadEntity entityName="user" id={sessionStorage.id}>
                {
                    (rest) => <MonthSellUser {...rest} />
                }
            </ReadEntity>
            <div className="card-container">
                <Tabs type="card">
                    <TabPane tab="Vente" key={0}>
                        <Sell />
                    </TabPane>
                    <TabPane tab="Service Divers" key="1">
                        <Service />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default SellComponent
