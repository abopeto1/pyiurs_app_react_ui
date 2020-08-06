import React from 'react'
// import { Redirect } from 'react-router-dom'
import { Button,Typography,Row,Col,message } from 'antd'
import CreateEntity from '../../../../react-redux/Entity/Create'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'
import { InventoryTable } from './InventoryTable'

export const Inventory = props => {
  const [page, setPage] = React.useState(1)

  const { Title } = Typography
  const create = p => {
    p.create({},{
      onSuccess: (c) => {
        message.success("Inventaire crée avec succées")
      },
      onFail: () => {
        message.error("Erreur lors de la création")
      }
    })
  }
  
  return (
    <div>
      <Row gutter={[8,8]} style={{alignItems: 'center',justifyContent:"space-between",}}>
        <Col span={18}>
          <Title level={2}>Inventaire</Title>
        </Col>
        <Col>
          <CreateEntity entityName="inventory">
            {
              cProps => <Button type="primary" onClick={() => create(cProps)} 
                loading={cProps.status && cProps.status.isFetching}>Créer</Button>
            }
          </CreateEntity>
          
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ReadEntities entityName="inventory" params={{page: page, }}>
          {
              rProps => <InventoryTable { ...rProps } page={page} setPage={setPage} />
          }
          </ReadEntities>
        </Col>
      </Row>
    </div>
  )
}
