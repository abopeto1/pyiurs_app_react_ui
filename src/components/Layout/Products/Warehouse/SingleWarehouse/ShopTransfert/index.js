import React from 'react'
import { Form,Col,Input,Button,message,Table } from 'antd'
import UpdateEntity from '../../../../../../react-redux/Entity/Update'
import ReadEntities from '../../../../../../react-redux/Entity/Read/Entities'

const ShopTransfert = (props) => {
  const [form, setForm] = React.useState([])
  const [codebarre, setCodebarre] = React.useState("")

  const [products,setProducts] = React.useState([])

  const search = e => {
    e.read({
      onFail: () => {
        message.error(`Aucun produit trouvé pour le codebarre ${codebarre}`)
      },
      onSuccess: (d) => {
        const p = d.filter(pp => !form.includes(pp.id))
        const product = p[0]
        if(product){
          setProducts([product,...products])
          setForm([...form,product.id])
          setCodebarre("")
        } else {
          message.error(`Aucun produit disponible pour le codebarre ${codebarre}`)
        }
      }
    })
  }

  const columns = [
    {title: "Codebarre",dataIndex:"codebarre", key:"0",},{title: "Type",dataIndex:"type", key:"1",},
    {title: "Catégorie",dataIndex:"cat", key:"2",},{title: "Description",dataIndex:"description", key:"3",},
    {title: "Code Livraison",dataIndex:"code_livraison", key:"4",},{title: "PAT",dataIndex:"pat", key:"5",},
    {title: "PV",dataIndex:"pv", key:"6",},{title: "Source",dataIndex:"source", key:"7",},
    {title: "Action",dataIndex:"key",render:
      (v,r) => (
        <Button type="danger" onClick={v => {
          setForm(form.filter(f => f !== v))
          setProducts(products.filter(p => p.id !== v))
        }}>Supprimer</Button>
      )
    },
  ]

  const data =  products.map((c,i) => console.log(i===0 &&c)||
   ({
      ...c,type:"", pat: parseInt(parseFloat(c.pu)+parseFloat(c.caa)),key: c.id,
  }))

  const addProducts = (f) => {
    f.update({productTransfers:form},{
      onFail: () => {
        message.error(`Erreur lors du transfert`)
      },
      onSuccess: (d) => {
        setProducts([])
        setForm([])
        message.success("Produits transférés avec succés")
      }
    })
  }

  return (
    <Col>
      <div style={{display:"flex", justifyContent:"space-between",marginBottom:"16px",}}>
        <ReadEntities entityName="product" params={{in_stock_transfert:true,codebarre:codebarre,warehouse:props.warehouseId}}>
        {
          prodProps => (
            <Form onFinish={() => search(prodProps)} style={{display:"flex",justifyContent:"space-between"}}>
              <Form.Item title="Code Barre">
                <Input value={codebarre} onChange={e => setCodebarre(e.target.value)} placeholder="Scannez le produit à solder" />
              </Form.Item>
            </Form>
          )
        }
        </ReadEntities>
        <UpdateEntity entityName="warehouse" id={props.warehouseId}>
        {
          updateProps => (
            <Button onClick={() => addProducts(updateProps)} type="primary" loading={updateProps.status && updateProps.status.isFetching}>
              Confirmer
            </Button>
          )
        }
        </UpdateEntity>
      </div>
      <Table dataSource={data} columns={columns} size="small" style={{overflowX: 'scroll'}} />
    </Col>
  )
}

export default ShopTransfert
