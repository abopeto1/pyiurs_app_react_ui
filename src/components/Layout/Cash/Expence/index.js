/* Dependencies */
import React from 'react'
import { Row, Col, Typography, Button, Modal } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import TableComponent from './Table'
import CreateForm from './CreateForm'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'
import { transformDateFormat } from '../../../../utils'

export const Expence = (props) => {
  const { Title } = Typography
  const [visible,setVisible] = React.useState(false)

  return (
    <Row>
      <Col span={24} style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
        <Title level={2}>Dépenses</Title>
        <Button type="primary" shape="round" onClick={() => setVisible(true)} icon={<PlusCircleFilled />}>
          Sortie Caisse
        </Button>
      </Col>
      <Col span={24}>
        <ReadEntities entityName="expence" params={{ month: transformDateFormat(new Date()) }}>
          {
            rest => <TableComponent { ...rest } />
          }
        </ReadEntities>
      </Col>
      <Modal title="Sortie Caisse" visible={visible} centered footer={null}
        onCancel={() => setVisible(false)} closable={false}
      >
        <CreateForm setVisible={setVisible} user={props.user} />
      </Modal>
    </Row>
  )
}
