import React from 'react'
import { Card,Button } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import ProductSearch from './ProductSearch'
import { ProductDetails } from './ProductDetails'
import ProductCustomerPrice from './ProductCustomerPrice'
import { ProductDepartment } from './ProductDepartment'
import { setMarge } from '../../../../../utils'

const Product = ({productDepartment, ...props}) => {
  const { search, status, productsCodebarre,setCodebarre, codebarre, billDetail, cart } = props
  const [product,setProduct] =  React.useState({})
  const min = setMarge(product)
  
  const addToCart = () => {
    props.setCart({
      ...cart, 
      total: cart.total+ parseFloat(billDetail.pu* billDetail.qte),
      taxe: cart.taxe + parseFloat(billDetail.tax * billDetail.qte),
      net: cart.net + parseFloat(billDetail.net * billDetail.qte),
      billDetails:[...cart.billDetails, billDetail],
    })
    props.setCartProduct([...props.cartProduct,product])
    props.setBillDetail({
      qte:1,pu:0,tax:0,net:0,rs:false,product:null,
    })
    setProduct({})
  }

  return (
    <Card title="Recherche Produit">
      <ProductDepartment
        entityName="product_department"
        value={productDepartment.value} setValue={productDepartment.setValue}
      />
      <ProductSearch
        search={search} codebarre={codebarre} setCodebarre={setCodebarre} status={status}
        productsCodebarre={productsCodebarre}
        setProduct={setProduct} billDetail={billDetail} setBillDetail={props.setBillDetail} cart={cart}
      />
      <ProductDetails product={product} billDetail={billDetail} setBillDetail={props.setBillDetail} />
      <ProductCustomerPrice
        billDetail={billDetail} setBillDetail={props.setBillDetail}
        product={product} min={min}
      />
      <div style={{marginTop:"16px"}}>
        <Button
          type="primary" style={{marginRight:"8px"}} 
          disabled={
            product.id === undefined ? true : parseInt(sessionStorage.id) === 4 ? false : (billDetail.net < min)
          }
          onClick={() => addToCart()}
          icon={<ShoppingCartOutlined />}
        >
          Ajouter au Panier
        </Button>
        <Button type="danger" onClick={
          () => {
            setProduct({})
            props.setBillDetail({qte:1,pu:0,tax:0,net:0,rs:false,product:null,})
          }}
        >Annuler</Button>
      </div>
    </Card>
  )
}

export default Product
