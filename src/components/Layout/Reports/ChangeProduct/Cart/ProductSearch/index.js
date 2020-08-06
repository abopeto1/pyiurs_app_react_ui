import React from 'react'
import { Form,Input,message } from 'antd'
import { BarcodeOutlined } from '@ant-design/icons'

const ProductSearch = (props) => {
  const { read: search,status,cart,setProduct,setCodebarre,codebarre } = props
  const { Item } = Form

  const onSubmit = e => {
    search({
      onFail: () => {
        message.error(`Aucun produit trouvé pour le codebarre ${codebarre}`)
      },
      onSuccess: (d) => {
        const arr = cart.billDetails.map(c => c.product)
        const p = d.filter(pp => !arr.includes(pp.id))
        const product = p.find((e,i) => i === 0)
        if(product){
          setProduct(product)
          props.setBillDetail({...props.billDetail,pu:product.pv*.84,tax:product.pv*.16,net:product.pv,product:product.id,})
          setCodebarre("")
        } else {
          message.error(`Aucun produit disponible pour le codebarre ${codebarre}`)
        }
      }
    })
  }
  return (
    <Form onFinish={onSubmit}>
      <Item>
        <Input placeholder="Entrez le codebarre" value={codebarre} onChange={e => setCodebarre(e.target.value)}
         suffix={<BarcodeOutlined spin={status && status.isFetching} />} />
      </Item>
    </Form>
  )
}

export default ProductSearch
