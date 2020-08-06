import React, { useEffect } from 'react'
import { Form,Row,Col,Input,Button,Table,message,Select,Space,Typography } from 'antd'
import { uniq } from 'lodash'
import UpdateEntity from '../../../../../../react-redux/Entity/Update'

const ProductSearch = ({setType, ...props}) => {
  const { promo, codebarre, setCodebarre,productsByType } = props
  const [form, setForm] = React.useState([])
  const [products,setProducts] = React.useState([])

  useEffect(productsByType.types.read,[])
  const types = productsByType.types.entities ?? []
  
  const searchByType = () => {
    props.type ?
    productsByType.read({
      onFail: () => {
        message.error(`Aucun produit trouvé pour le type ${codebarre}`)
      },
      onSuccess: (d) => {
        if(d){
          setProducts([...d,...products])
          const foundIds = d.map(product => product.id )
          setForm(uniq([...foundIds,...form]))
        } else {
          message.error(`Aucun produit disponible pour le type ${codebarre}`)
        }
      }
    }) : message.error("Type inconnue")
  }

  const search = () => {
    props.read({
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
    {title: "Codebarre",dataIndex:"codebarre",key:"0",},{title: "Type",dataIndex:"type",key:"1",},
    {title: "Catégorie",dataIndex:"cat",key:"2",},{title: "Description",dataIndex:"description",key:"3",},
    {title: "Code Livraison",dataIndex:"code_livraison",key:"4",},{title: "PAT",dataIndex:"pat",key:"5",},
    {title: "PV",dataIndex:"pv",key:"6",},{title: "P. Solde",dataIndex:"p_solde",key:"7",},
    {title: "Action",render: (v,r) => {
      return (
        <Button type="danger" onClick={() => {
          setForm(form.filter(f => f !== r.key))
          setProducts(products.filter(p => p.id !== r.key))
        }}>Supprimer</Button>
      )}
    },
  ]

  const data = promo ? products.map(c => ({
      ...c, pat: parseInt(parseFloat(c.pu)+parseFloat(c.caa)),
      p_solde: promo.type.id === 1 ? c.pv*(promo.percent/100) : promo.type.id === 2 ? promo.price : parseInt(c.pu+c.caa),
      key: c.id, type: c.type.name
  })) : []

  const addProducts = (f) => {
    f.update({products:form},{
      onFail: () => {
        message.error(`Erreur lors de la création de la promotion`)
      },
      onSuccess: (d) => {
        setProducts([])
        setForm([])
        message.success("Produits ajoutés avec succés")
      }
    })
  }

  return (
    <Row gutter={[8,8]}>
      <Col xs={24}>
        <div style={{flexGrow:1}}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <Form onFinish={() => search()}>
              <Form.Item label="Code Barre">
                <Input value={codebarre} onChange={e => setCodebarre(e.target.value)}
                  placeholder="Scannez le produit à solder"
                />
              </Form.Item>
            </Form>
            <Form onFinish={() => searchByType()}>
              <Space>
                <Select onChange={val => setType(val)} 
                  loading={productsByType.types.status && productsByType.types.status.isFetching}
                  style={{width:"200px"}}
                >
                  {
                    types.map(t => (
                      <Select.Option value={t.id} key={t.id}>{t.name}</Select.Option>
                    ))
                  }
                </Select>
                <Button type="primary" onClick={() => searchByType()}>Ajouter Les Produits</Button>
              </Space>
            </Form>
          </div>
        </div>
        <UpdateEntity entityName="promotion" id={promo && promo.id}>
        {
          updateProps => (
            <Button onClick={() => addProducts(updateProps)} type="primary" loading={updateProps.status && updateProps.status.isFetching}>
              Confirmer
            </Button>
          )
        }
        </UpdateEntity>
      </Col>
      <Col xs={24}>
        <Typography.Title level={4}>{form.length} produits à solder</Typography.Title>
        <Table
          dataSource={data} columns={columns} loading={
            (productsByType.status && productsByType.status.isFetching)
          }
          style={{
            overflowX:'scroll',
          }}
        />
    </Col>
    </Row>
  )
}

export default ProductSearch
