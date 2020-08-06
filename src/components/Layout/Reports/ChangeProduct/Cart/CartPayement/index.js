import React from 'react'
import { Row,Col } from 'antd'

const style = {display: "flex" ,justifyContent:'space-between', alignItems:'center', margin: '5px 0',}

const CartPayement = (props) => {
  const { cart, changeTotal } = props

  return (
    <Row>
      <Col span={24} style={style}>
        <div><strong>Nombre d'Articles</strong></div>
        <div>{cart.billDetails.length < 2 ? `${cart.billDetails.length} Article` : `${cart.billDetails.length} Articles`}</div>
      </Col>
      <Col span={24} style={style}>
        <div><strong>Total Facture</strong></div>
        <div><strong>{`${cart.net} $`}</strong></div>
      </Col>
      <Col span={24} style={{...style,background:"#40a9ff",color:"white",padding:"10px",}}>
        <div><strong>Total A Payer</strong></div>
        <div><strong>{changeTotal !== null ? `${cart.net - changeTotal} $` : "Veuillez ajouter la facture à échanger"}</strong></div>
      </Col>
    </Row>
  )
}

export default CartPayement
