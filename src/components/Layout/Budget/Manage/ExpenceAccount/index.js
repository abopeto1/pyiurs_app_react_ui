import React from 'react'
import { Row, Col, Typography } from 'antd'
import ReadEntities from '../../../../../react-redux/Entity/Read/Entities'
import CreateEntity from '../../../../../react-redux/Entity/Create'
import { Table } from '../../../../../utils'
import CreateForm from './CreateForm'

const ExpenceAccount = (props) => {
    const { read, status, entities } = props
    const { Title } = Typography

    React.useEffect(read, [])

    const loading = (status && status.isFetching) ?? false
    const data = entities ? entities.map(d => ({
        key: d.id, code: d.code, Nom: d.name, Categorie: d.expence_compte_categorie.name,
    })) : [{ key: null, code: null, Nom: null, Categorie: null, }]

    return (
        <Row gutter={[8,8]}>
            <Col xs={24} style={{display:"flex", justifyContent: "space-between"}}>
                <Title level={4}>Comptes P&L</Title>
                <ReadEntities entityName="expence_compte_category" params={{}}>
                    {
                        eccProps => (
                            <CreateEntity entityName="expence_compte">
                                {
                                    cProps => <CreateForm { ...cProps } categorie={eccProps} />
                                }
                            </CreateEntity>
                        )
                    }
                </ReadEntities>
            </Col>
            <Col xs={24}>
                <Table data={data} loading={loading} entityName={props.entityName} />
            </Col>
        </Row>
    )
}

export default ExpenceAccount