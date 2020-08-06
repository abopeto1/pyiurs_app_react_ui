import React from 'react'
import { Row, Col, Typography } from 'antd'
import { CreateForm } from './CreateForm'
import { TableComponent } from './TableComponent'
import Entities from '../../../../react-redux/Entity/Read/Entities'
import CreateEntity from '../../../../react-redux/Entity/Create'

export const Appointment = (props) => {
    const { Title } = Typography

    return (
        <Row gutter={[8, 8]}>
            <Col span={24}>
                <Title level={2}>Rendez-vous</Title>
            </Col>
            <Col xs={24} md={12}>
                <Entities entityName="product" params={{api: true, "type.segment.department": 3,}}>
                    {
                        services => (
                            <Entities entityName="agent" params={{ api: true, }}>
                                {
                                    agents => (
                                        <Entities entityName="customer" params={{}}>
                                            {
                                                customers => (
                                                    <CreateEntity entityName="appointment">
                                                        {
                                                            rest => <CreateForm
                                                                customers={customers} agents={agents} {...rest}
                                                                services={services}
                                                            />
                                                        }
                                                    </CreateEntity>
                                                )
                                            }
                                        </Entities>
                                    )
                                }
                            </Entities>
                        )
                    }
                </Entities>
            </Col>
            <Col xs={24} md={12}>
                <Entities entityName="appointment" params={{page:1, api: true, }}>
                    {
                        rest => <TableComponent { ...rest } />
                    }
                </Entities>
            </Col>
        </Row>
    )
}