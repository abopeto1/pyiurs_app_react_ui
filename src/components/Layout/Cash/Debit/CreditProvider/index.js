/* Dependencies */
import React from 'react'
import { Row, Col, Button, Modal } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import CreateEntity from '../../../../../react-redux/Entity/Create'
import ReadEntities from '../../../../../react-redux/Entity/Read/Entities'
import TableComponent from './Table'
import CreateForm from './CreateForm'

const CreditProvider = (props) => {
  const [visible,setVisible] = React.useState(false)

  return (
    <Row>
      <Col span={24} style={{display:"flex", justifyContent:"flex-end",alignItems:"center"}}>
        <Button type="primary" shape="round" onClick={() => setVisible(true)} icon={<PlusCircleFilled />}>Entrer Crédit</Button>
      </Col>
      <Col span={24}>
        <ReadEntities entityName="provider" params={{credit:"bank"}}>
          {
            rest => (
              <TableComponent { ...rest } />
            )
          }
        </ReadEntities>
      </Col>
      <Modal title="Crédit Bancaire" visible={visible} centered
        footer={null} onCancel={() => setVisible(false)} closable={false}
      >
        <CreateEntity entityName='credit'>
        {
          createCreaditProps => (
            <ReadEntities entityName="provider" params={{}} createCredit={createCreaditProps.create}
              creditCreated={createCreaditProps.createdEntity} createCreditStatus={createCreaditProps.status}
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

export default CreditProvider
