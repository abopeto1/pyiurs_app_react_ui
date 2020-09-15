/* Dependencies */
import React, { useEffect } from 'react'
import { Typography,Row,Tabs,message } from 'antd'
import './index.css'
import CreateProducts from '../CreateProducts'
import ShopTransfert from '../ShopTransfert'
import { WarehouseProducts } from './WarehouseProducts/WarehouseProducts'
import Entities from '../../../../../../react-redux/Entity/Read/Entities'

const TableComponent = (props) => {
  const { Title } = Typography
  const { TabPane } = Tabs
  const { read, entity, id } = props
  const [page, setPage] = React.useState(1)

  useEffect(() => {
    function fetch(){
      read({
        api: true
      })
    }

    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id])

  // const filter = ["En Boutique","Vendus","En Depôt"]

  const info = (text,type = "success") => {
    if(type === "error"){
      message.error(text)
    }
    message.success(text)
  }

  return (
    <div style={{padding:'8px'}}>
      <Row style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <Title level={4}>{entity && entity.name}</Title>
        </div>
      </Row>
      <div className="card-container">
        <Tabs type="card">
          <TabPane tab="Produits" key={1}>
            <Entities entityName="product" params={{ page: page, warehouse: id, }}>
              {
                rest => <WarehouseProducts { ...rest } page={page} setPage={setPage} />
              }
            </Entities>
          </TabPane>
          <TabPane tab="Ajouter Produits en masse" key="2">
            <CreateProducts warehouseId={id} info={info} />
          </TabPane>
          <TabPane tab="Transfert des produits" key="3">
            <ShopTransfert warehouseId={id} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default TableComponent
