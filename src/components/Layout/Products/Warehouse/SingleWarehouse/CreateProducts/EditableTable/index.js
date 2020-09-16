import React from 'react'
import { Table,Button,Popconfirm,Typography, message, Col, Row } from 'antd'
import { DeliveryForm } from './DeliveryForm'
import './index.css'

const EditableTable = (props) => {
  const {data,setData,create, info, status } = props
  const { Title } = Typography
  const [ delivery, setDelivery ] = React.useState({
    name: null, description: null, weight: null, agency: null,
  })
  const columns = [
    {
      title:"Type",
      dataIndex:"postType",
      editable:true,
    },
    {
      title:"Catégorie",
      dataIndex:"cat",
      editable:true,
    },
    {title:"Codebarre",dataIndex:"codebarre",editable:true,},
    {title:"Taille",dataIndex:"taille",editable:true,},{title:"PU",dataIndex:"pu",editable:true,},
    {title:"Couleur",dataIndex:"couleur",editable:true,},{title:"Marque",dataIndex:"marque",editable:true,},
    {title:"Description",dataIndex:"description",editable:true,},
    {title:"Code Livraison",dataIndex:"codeLivraison",editable:true,},
    {title:"CAA",dataIndex:"caa",editable:true,},{title:"PV",dataIndex:"pv",editable:true,},
    {title:"Source",dataIndex:"source",editable:true,},{title:"Segment",dataIndex:"segment",editable:true,},
    {
      title:"Action",dataIndex:"action",
    },
  ]

  const datas = data.map((d,i) => ({ ...d, key:i}))

  const onSubmitProduct = () => {
    if(data.length < 1){
      info("Pas de Fichier Produits ajouté", "error")
    } else {
      create({
        ...delivery, products: data,
      },{
        api:true,
        onSuccess: d => {
          message.success(`${d.totalProducts} Produits Ajoutés`)
          setData([])
          setDelivery({name: null, description: null, weight: null, agency: null,})
        },
        onFail: e => {
          console.log(e)
          message.error("Erreur lors de l'ajout des produits")
        }
      })
    }
  }

  return (
    <Row gutter={8}>
      <Col span={24}>
        <DeliveryForm delivery={delivery} setDelivery={setDelivery} />
      </Col>
      <Col span={24}>
        <Title level={4}>
          {
            data.length === 0 ?
              "0 produits à Ajouter. Veuillez selectionner un fichier de chargement." :
              `${data.length} produits`
          }
        </Title>

        <Table
          bordered
          dataSource={datas}
          columns={columns}
          loading={status && status.isFetching}
          style={{
            overflowX: "scroll"
          }}
        />
        <Popconfirm
          title={`Confirmez-vous le chargement de ${data.length} produits`}
          onConfirm={() => onSubmitProduct()} disabled={data.length < 1}>
          <Button type="primary" disabled={data.length < 1} loading={status && status.isFetching}>Confirmer</Button>
        </Popconfirm>
      </Col>
    </Row>
  )
}

export default EditableTable
