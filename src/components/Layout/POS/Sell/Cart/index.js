import React from 'react'
import { Card,Row,Col,Button,message } from 'antd'
// import { ShoppingCartOutlined } from '@ant-design/icons'
import CustomerSelect from './CustomerSelect'
import CartDetails from './CartDetails'
import CartPayement from './CartPayement'
import ReadEntities from '../../../../../react-redux/Entity/Read/Entities'
import { print } from '../../../../../utils'

const Cart = (props) => {
  const { cart, setCart, cartProduct, setCartProduct, create, status,entityName } = props

  const confirmSell = () => {
    if(cart.billDetails.length <= 0){
      message.error("Aucun Produit Ajouté au panier")
    } else if (cart.customer === null) {
      message.error("Veuillez Séléctionner un client")
    } else if (cart.typePaiement === null) {
      message.error("Veuillez Séléctionner le type de paiement (Cash Ou Crédit)")
    } else {
      create(cart, {
        api: true,
        onSuccess: (created) => {
          setCart({
            total:0,taxe:0,net:0,accompte:0,reste:0,customer:null,
            typePaiement: `/api/type_paiments/1`,bill_reference:null,billDetails:[],
          })
          message.success("Vente efectuée avec succés")
          print(created.id, entityName)
        },
        onFail: () => message.error("Erreur lors de la vente")
      })
    }
  }

  return (
    <Card title="Panier">
      <Row>
        <Col span={24}>
          <ReadEntities entityName="customer" params={{}}>
          {
            customerProps => <CustomerSelect {...customerProps} setCart={setCart} cart={cart} />
          }
          </ReadEntities>
        </Col>
        <Col span={24} style={{marginTop:"8px",height:"200px",overflowY:"scroll",}}>
          <CartDetails cart={cart} setCart={setCart} cartProduct={cartProduct} setCartProduct={setCartProduct} />
        </Col>
        <Col span={24}>
          <CartPayement cart={cart} setCart={setCart} />
        </Col>
        <Col span={24} style={{marginTop:"16px"}}>
          <Button type="primary" onClick={() => confirmSell()} loading={status && status.isFetching}>Confirmer Vente</Button>
          <Button type="danger" onClick={() => console.log('cancel')} disabled={status && status.isFetching} style={{marginLeft:'8px'}}>Annuler</Button>
        </Col>
      </Row>
    </Card>
  )
}

export default Cart
