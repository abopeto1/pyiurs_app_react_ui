import React, { useState } from 'react'
import { Row, Col } from 'antd'
import Product from './Product'
import Cart from './Cart'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'
import CreateEntity from '../../../../react-redux/Entity/Create'

const Sell = (props) => {
  const [cart,setCart] = useState({
    total:0,taxe:0,net:0,accompte:0,reste:0,
    customer:null,
    typePaiement :'/api/type_paiements/1',
    billDetails:[],
    operator: `/api/users/${sessionStorage.id}`,
  })

  const [billDetail,setBillDetail] = useState({
    qte:1,pu:0,tax:0,net:0,rs:false,product:null,
  })

  const [codebarre,setCodebarre] = useState('')
  const [productDepartment, setProductDepartment] = useState(1)
  const [cartProduct,setCartProduct] = useState([])
  
  return (
    <Row gutter={[16,16]}>
      <Col lg={12} md={24} xs={24}>
        <ReadEntities
          entityName="product"
          params={{
            api: true, codebarre:codebarre, "stock.available":true, "type.segment.department": productDepartment,  
          }}
        >
          { 
            productCodebarreProps => (
              <Product
                search={productCodebarreProps.read} status={productCodebarreProps.status}
                cart={cart} setCart={setCart} billDetail={billDetail}
                setBillDetail={setBillDetail}
                setCodebarre={setCodebarre} codebarre={codebarre}
                productsCodebarre={productCodebarreProps.entities}
                setCartProduct={setCartProduct} cartProduct={cartProduct}
                productDepartment={{ value: productDepartment, setValue: setProductDepartment, }}
              />
            )
          }
        </ReadEntities>
      </Col>
      <Col lg={12} md={24} xs={24}>
        <CreateEntity entityName="bill">
        {
          billProps => <Cart { ...billProps } cart={cart} setCart={setCart} cartProduct={cartProduct} setCartProduct={setCartProduct} />
        }
        </CreateEntity>
      </Col>
    </Row>
  )
}

export default Sell
