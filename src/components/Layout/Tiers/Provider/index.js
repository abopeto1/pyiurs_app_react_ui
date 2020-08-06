/* Dependencies */
import React from 'react'
import { Row, Col, Typography, Button } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import TableComponent from './Table'
import CreateForm from './CreateForm'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'
import CreateEntity from '../../../../react-redux/Entity/Create'

export const Provider = (props) => {
  const { Title } = Typography
  const [visible,setVisible] = React.useState(false)

  return (
    <Row>
      <Col span={24} style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
        <Title level={2}>Fournisseurs</Title>
        <Button type="primary" shape="round" onClick={() => setVisible(true)} icon={<UserAddOutlined />}>Ajouter Fournisseur</Button>
      </Col>
      <Col span={24}>
        <ReadEntities entityName="provider" params={{}}>
          {
            providerProps => <TableComponent { ...providerProps } />
          }
        </ReadEntities>
      </Col>
        <CreateEntity entityName='provider'>
        {
          createProps => <CreateForm { ...createProps } setVisible={setVisible} visible={visible}/>
        }
        </CreateEntity>
    </Row>
  )
}
