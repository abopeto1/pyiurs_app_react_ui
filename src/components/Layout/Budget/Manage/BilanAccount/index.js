import React from 'react'
import { Row, Col, Typography } from 'antd'
import { Table } from '../../../../../utils'

const ExpenceAccount = (props) => {
    const { read, status, entities } = props
    const { Title } = Typography

    React.useEffect(read, [])

    const loading = (status && status.isFetching) ?? false
    
    const data = entities ? entities.map(d => ({
        key: d.id, code: d.code, Nom: d.name, 
    })) : [{ key: null, code: null, Nom: null,  }]

    return (
        <Row gutter={[8,8]}>
            <Col xs={24} style={{display:"flex", justifyContent: "space-between"}}>
                <Title level={4}>Compte de Revenue</Title>
            </Col>
            <Col xs={24}>
                <Table data={data} loading={loading} entityName={props.entityName} />
            </Col>
        </Row>
    )
}

export default ExpenceAccount