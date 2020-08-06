/* Dependencies */
import React from 'react'
import { Row, Col, Typography, Button, Modal } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import CreateEntity from '../../../../react-redux/Entity/Create'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'
import TableComponent from './Table'
import CreateForm from './CreateForm'

export const CashIn = (props) => {
  const { Title } = Typography
  const [visible,setVisible] = React.useState(false)

  return (
    <Row>
      <Col span={24} style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
        <Title level={2}>Entrée Cash</Title>
        <Button type="primary" shape="round" onClick={() => setVisible(true)} icon={<PlusCircleFilled />}>Entrer Cash</Button>
      </Col>
      <Col span={24}>
        <TableComponent cashins={props.cashins} getCashin={props.getCashin} status={props.cashinsStatus} />
      </Col>
      <Modal title="Entrée Cash" visible={visible} centered
        footer={null} onCancel={() => setVisible(false)} closable={false}
      >
        <CreateEntity entityName='cashin'>
        {
          createCashinProps => (
            <ReadEntities entityName="provider" params={{}} createCashin={createCashinProps.create}
              cashinCreated={createCashinProps.createdEntity} createCashinStatus={createCashinProps.status}
            >
              {
                providerProps => <CreateForm { ...providerProps } providers={providerProps.entities}
                  providersStatus={providerProps.status} getProviders={providerProps.read} setVisible={setVisible}
                />
              }
            </ReadEntities>
          )
        }
        </CreateEntity>
      </Modal>
    </Row>
  )
}
