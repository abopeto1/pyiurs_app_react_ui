/* Dependencies */
import React from 'react'
import { Typography,Row,Tabs,Table,message } from 'antd'
import './index.css'
import CreateProducts from '../CreateProducts'
import ShopTransfert from '../ShopTransfert'

const TableComponent = (props) => {
  const { Title } = Typography
  const { TabPane } = Tabs
  const { read, entity, status, id } = props
  React.useEffect(read,[])

  // const filter = ["En Boutique","Vendus","En Depôt"]

  const columns = [
    {title:"Codebarre",dataIndex:"codebarre",key:0},{title:"Type",dataIndex:"type",key:"1"},
    {title:"Segment",dataIndex:"segment",key:"10"},
    {title:"Catégorie",dataIndex:"cat",key:"2",},{title:"Code Livraison",dataIndex:"code_livraison",key:"3",},
    {title:"Taille",dataIndex:"taille",key:"4",},{title:"Couleur",dataIndex:"couleur",key:"5",},
    {title:"Marque",dataIndex:"marque",key:"6",},{title:"PU",dataIndex:"pu",key:"7",},
    {title:"CAA",dataIndex:"caa",key:"8",},{title:"PV",dataIndex:"pv",key:"9",},
  ]

  const data = entity && entity.products ? entity.products.map(p => ({
    ...p, type: p.type && p.type.name, segment: p.segment && p.segment, key: p.id
  })) : []

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
            <Title level={4}>{entity && `${data.length} produits`}</Title>
            <Table dataSource={data} columns={columns} size="small" style={{overflowX:'scroll'}}
              loading={status && status.isFetching} />
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
