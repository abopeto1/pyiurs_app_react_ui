import React from 'react'
import { InputNumber,Form,Button } from 'antd'

const ProductDetails = (props) => {
  const { cart, product, setProduct, billDetail, setBillDetail } = props
  const addToCart = () => {
    props.setCart({
      ...cart, total: cart.total+parseFloat(billDetail.pu), taxe: cart.taxe+parseFloat(billDetail.tax),
      net: cart.net+parseFloat(billDetail.net), billDetails:[...cart.billDetails, billDetail],
    })
    props.setCartProduct([...props.cartProduct,product])
    props.setBillDetail({qte:1,pu:0,tax:0,net:0,rs:false,product:null,})
    setProduct({})
  }
  const min = props.setMarge(product)

  return (
    <div style={{marginBottom:"8px", display:"flex",justifyContent:"space-between"}}>
      <div>{product && product.description}</div>
      {
        billDetail.product !== null &&
        <Form.Item label="Prix ($)">
          <InputNumber
            value={billDetail.net} min={min} type="number" step={0.1}
            onChange={val => setBillDetail({...billDetail, pu:val*.84, tax:val*.16, net: val})}
          />
        </Form.Item>
      }
      {billDetail.product && <Button type="primary" onClick={() => addToCart()}>Ajouter</Button>}
    </div>
  )
}

export default ProductDetails
