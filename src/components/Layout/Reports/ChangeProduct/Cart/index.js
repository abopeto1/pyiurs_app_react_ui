import React, { useState } from 'react'
import { Card,Row,Col,Button,message } from 'antd'
import ProductSearch from './ProductSearch'
import ProductDetails from './ProductDetails'
import CartDetails from './CartDetails'
import CartPayement from './CartPayement'
import ReadEntities from '../../../../../react-redux/Entity/Read/Entities'
import { setMarge } from '../../../../../utils'
import { baseUrl } from '../../../../../redux/services/api'

const Cart = (props) => {
  const { cart, setCart, cartProduct, setCartProduct, create, status } = props
  const [billDetail,setBillDetail] = useState({ qte:1,pu:0,tax:0,net:0,rs:false,product:null, })
  const [codebarre,setCodebarre] = useState('')
  const [product,setProduct] = useState(null)

  const confirmSell = () => {
    if(cart.bill_reference === null){
      message.error("Aucune facture à échanger")
    } else if (props.changeTotal === null || props.changeTotal === 0) {
      message.error("Le total à échanger ne peut pas être nul")
    } else if (cart.billDetails.length < 1) {
      message.error("Aucun produit ajouté pour l'échange")
    } else if (cart.net - props.changeTotal < -2) {
      message.error("L'écart est d'au moins -2$")
    } else {
      create(cart, {
        onSuccess: (created) => {
          console.log(created)
          setCart({
            total:0,taxe:0,net:0,accompte:0,reste:0,
            customer:null,typePaiement:4,billReference:null,billDetails:[],
          })
          message.success("Echange efectuée avec succés")
          window.open(`${baseUrl}/bill/pdf/${created.id}`)
        },
        onFail: () => message.error("Erreur lors de la vente")
      })
    }
  }

  return (
    <Card title="Panier">
      <Row>
        <Col span={24}>
          <ReadEntities entityName="product" params={{codebarre:codebarre}}>
          {
            productProps => <ProductSearch { ...productProps } setCart={setCart} cart={cart} setProduct={setProduct}
              setCodebarre={setCodebarre} billDetail={billDetail} setBillDetail={setBillDetail} />
          }
          </ReadEntities>
        </Col>
        <Col span={24}>
          <ProductDetails cart={cart} setCart={setCart} cartProduct={cartProduct} setCartProduct={setCartProduct} product={product}
            setProduct={setProduct} billDetail={billDetail} setBillDetail={setBillDetail} setMarge={setMarge} />
        </Col>
        <Col span={24} style={{marginTop:"8px",height:"200px",overflowY:"scroll",}}>
          <CartDetails cart={cart} setCart={setCart} cartProduct={cartProduct} setCartProduct={setCartProduct} />
        </Col>
        <Col span={24}>
          <CartPayement cart={cart} setCart={setCart} changeTotal={props.changeTotal} />
        </Col>
        <Col span={24} style={{marginTop:"16px"}}>
          <Button type="primary" onClick={() => confirmSell()} loading={status && status.isFetching}>Confirmer Echange</Button>
          <Button type="danger" onClick={() => console.log('cancel')} disabled={status && status.isFetching} style={{marginLeft:'8px'}}>Annuler</Button>
        </Col>
      </Row>
    </Card>
  )
}

export default Cart
