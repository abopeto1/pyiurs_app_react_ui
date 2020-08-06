import React from 'react'
import { Table, Card } from 'antd'

const ChartBill = rest => {
    columns = [
        {title:"label",dataIndex:"label",key:0},{title:"value",dataIndex:"label",key:0},
    ]
    return (
        <React.Fragment>
            <Card title="Factures">
                <Table dataSource={[]} columns={[]} pagination={false}/>
            </Card>
            <Card title="Vente par Vendeur(se)">
                Factures Vendeuse
            </Card>
        </React.Fragment>
    )
}

export default ChartBill