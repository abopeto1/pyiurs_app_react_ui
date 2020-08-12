import React, { useState } from 'react'
import { Row, Col } from 'antd'
import {BillToChange} from './BillToChange/BillToChange'
import Cart from './Cart'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'
import CreateEntity from '../../../../react-redux/Entity/Create'

export const ChangeProduct = (props) => {
  const [cart,setCart] = useState({
    total:0,taxe:0,net:0,accompte:0,reste:0,
    customer:null,typePaiement:4,billReference:null,billDetails:[],
    operator:sessionStorage.id,
  })
  const [billNumber,setBillNumber] = useState('')
  const [cartProduct,setCartProduct] = useState([])
  const changeTotal = cart.billReference !== null ?
  cart.billReference.bill_details.reduce((b,c) => c.rs ? parseFloat(c.net) + b : b,0) : null

  return (
    <Row gutter={[16,16]}>
      <Col  lg={12} md={24} xs={24}>
        <ReadEntities entityName="bill" params={{billNumber:billNumber}}>
        { billToChangeProps =>
          <BillToChange
            search={billToChangeProps.read} status={billToChangeProps.status}
            cart={cart} setCart={setCart}
            setBillNumber={setBillNumber} billNumber={billNumber}
            changeTotal={changeTotal}
          />
        }
        </ReadEntities>
      </Col>
      <Col lg={12} md={24} xs={24}>
        <CreateEntity entityName="bill">
        {
          billProps => <Cart { ...billProps } cart={cart} setCart={setCart} cartProduct={cartProduct} setCartProduct={setCartProduct}
            changeTotal={changeTotal} />
        }
        </CreateEntity>
      </Col>
    </Row>
  )
}
