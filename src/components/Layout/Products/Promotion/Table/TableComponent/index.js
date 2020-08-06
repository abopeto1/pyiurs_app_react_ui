/* Dependencies */
import React from 'react'
import { Link } from 'react-router-dom'
import { Typography,Table,Row,Button,Modal } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import { transformData } from './transformData'
import CreateForm from '../../CreateForm'
import CreateEntity from '../../../../../../react-redux/Entity/Create'
import DeleteEntity from '../../../../../../react-redux/Entity/Delete'

const PromoComponent = (props) => {
  const { Title } = Typography
  const { read, entities, status } = props
  const [visible,setVisible] = React.useState(false)

  React.useEffect(read,[])

  const columns = [
    {
      title:"Nom",
      dataIndex:"name",
      key:"name",
      render:(name,record) => <Link to={`/stock/promotions/${record.id}`}>{name}</Link>
    },
    {title:"Type",dataIndex:"promotype",key:"type"},
    {title:"Variable",dataIndex:"variable",key:"variable"},
    {title:"Fin",dataIndex:"date_end",key:"0"},
    {
      title:"Action",
      dataIndex:"id",
      key:"id",
      render: (name,r) => (
          <DeleteEntity entityName="promotion" id={r.key}>
            {
              delProps => (
                <Button 
                  type="danger" size="small" onClick={() => delProps.delete()}
                  status={delProps.status && delProps.status.isFetching}
                >
                  Supprimer
                </Button>
              )
            }
          </DeleteEntity>
      )
    },
  ]

  const data = entities !== undefined ? transformData(entities) : []

  return (
    <div style={{padding:'8px'}}>
      <Row style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
        <Title level={2}>Promotion</Title>
        <Button type="primary" shape="round" onClick={() => setVisible(true)} icon={<PlusCircleFilled />}>Créer Promotion</Button>
      </Row>
      <Table columns={columns} dataSource={data} loading={status && status.isFetching} />
      <Modal title="Création Promotion" visible={visible} centered
        footer={null} onCancel={() => setVisible(true)} closable={false}
      >
        <CreateEntity entityName='promotion'>
          { props => <CreateForm setVisible={setVisible} {...props} /> }
        </CreateEntity>
      </Modal>
    </div>
  )
}

export default PromoComponent
