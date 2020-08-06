import React from 'react'
import './index.css'
import {useParams} from 'react-router-dom'
import {Row,Col,Typography,Tabs,Button,Modal} from 'antd'
import ProductSearch from './ProductSearch'
import PromotionDetailsTable from './PromotionDetailsTable'
import CreateForm from '../CreateForm'
import ReadSingleEntityContainer from '../../../../../react-redux/Entity/Read/Entity'
import ReadEntities from '../../../../../react-redux/Entity/Read/Entities'
import UpdateEntity from '../../../../../react-redux/Entity/Update'

export const PromotionDetails = () => {
  const {id} = useParams()
  const { Title } = Typography
  const { TabPane } = Tabs
  const [codebarre,setCodebarre] = React.useState("")
  const [type,setType] = React.useState(null)
  const [open,setOpen] = React.useState(false)

  return (
      <ReadSingleEntityContainer entityName='promotion' id={id}>
        { props => (
          <div>
            <Row>
              <Col xs={24} sm={12}>
                <Title level={3}>{props.entity && props.entity.name}</Title>
                <Title level={4}>{props.type && props.type.name}</Title>
              </Col>
              <Col xs={24} sm={12}>
              <Button type="primary" size="small" onClick={() => setOpen(true)
                }>Modifier</Button>
              </Col>
            </Row>
            <div className="card-container">
              <Tabs type="card">
                <TabPane tab="Produits" key={1}>
                  <Title level={4}>{props.entity && props.entity.products && `${props.entity.products.length} produits`}</Title>
                  <PromotionDetailsTable {...props} />
                </TabPane>
                <TabPane tab="Ajouter Produits en masse" key="2">
                <ReadEntities entityName="type" params={{}}>
                  {
                    typeProps => (
                      <ReadEntities types={typeProps} entityName="product" params={{type:type, available:true}}>
                        {
                          ptProps => (
                            <ReadEntities productsByType={ptProps} entityName="product" params={{codebarre:codebarre}}>
                            {
                              pProps => <ProductSearch
                                {...pProps} codebarre={codebarre} setCodebarre={setCodebarre}
                                setType={setType} promo={props.entity} type={type} />
                            }
                            </ReadEntities>
                          )
                        }
                      </ReadEntities>
                    )
                  }
                </ReadEntities>
                </TabPane>
              </Tabs>
            </div>
            <Modal title="Modifier Promotion" visible={open} centered footer={null} closable={false}>
              <UpdateEntity entityName='promotion' id={id}>
                {
                  updateProps => (
                    <CreateForm
                      setOpen={setOpen}
                      {...updateProps} promo={props.entity}
                    />
                  )
                }
              </UpdateEntity>
            </Modal>
          </div>
          )
        }
      </ReadSingleEntityContainer>
  )
}
