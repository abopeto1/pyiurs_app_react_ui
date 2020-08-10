import React, { useEffect } from 'react'
import { Row,Col,Typography } from 'antd'
import { Table, transformDateFormat } from '../../../../../utils'
import CreateForm from '../CreateForm'
import CreateEntity from '../../../../../react-redux/Entity/Create'

const TableComponent = ({read,status,entities, ...props}) => {
    useEffect(read,[])
    const { Title } = Typography
    
    const data = entities && entities.length > 0 ? entities.map(d => ({
        key: d.id, date: transformDateFormat(d.created), code: d.code, montant: `${d.amount} ${d.currency}`,
        "livré": d.deliveried ? "Oui" : "Non",
        linkedPage:{
            code: {
                pathname: `/stock/orders`,
            }
        }
    })): [{
        date:null,code:null,description:null,montant:null,"livré":null,
    }]
    const loading = (status && status.isFetching) ? true : false

    return (
        <Row gutter={[8,8]}>
            <Col span={24}>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <Title level={4}>Commandes</Title>
                    <CreateEntity entityName="order">
                        {
                            createProps => <CreateForm {...createProps} />
                        }
                    </CreateEntity>
                </div>
                <Table data={data} loading={loading} />
            </Col>
        </Row>
    )
}

export default TableComponent