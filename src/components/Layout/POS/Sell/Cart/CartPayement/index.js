import React from 'react'
import { Row,Col,Select,InputNumber,message } from 'antd'

const style = {display: "flex" ,justifyContent:'space-between', alignItems:'center', margin: '5px 0',}

const CartPayement = (props) => {
  const { cart, setCart } = props
  
  const setAccompte = (val) => {
    if(cart.net === 0){
      message.info("Le total de la facture ne peut être nul")
    } else if(val >= cart.net){
      message.info("L'Accompte être supérieur ou égal à la totalité de la facture")
    } else if(val <= 0){
      message.info("L'Accompte être inférieur ou égal à zéro")
    } else {
      setCart({...cart, accompte: parseFloat(val), reste: cart.net-parseFloat(val), })
    }
  }

  return (
    <Row>
      <Col span={24} style={style}>
        <div><strong>Nombre d'Articles</strong></div>
        <div>
          {
            cart.billDetails.length < 2 
              ? 
            `${cart.billDetails.length} Article` : `${cart.billDetails.length} Articles`
          }
        </div>
      </Col>
      <Col span={24} style={style}>
        <div><strong>Type de Paiement</strong></div>
        <Select
          onChange={
            val => setCart({
              ...cart,
              typePaiement:`/api/type_paiements/${val}`,
              accompte:0,reste: val === 2 ? cart.net - cart.accompte : 0,
            })
          }
          style={{width:'50%'}} defaultValue={1}
        >
          <Select.Option value={1}>Cash</Select.Option>
          <Select.Option value={2}>Crédit</Select.Option>
        </Select>
      </Col>
      <Col
        span={24}
        style={{
          ...style,
          display: cart.typePaiement === `/api/type_paiements/2` ? "flex" : "none",
        }}
      >
        <div><strong>Accompte (En $)</strong></div>
        <div>
          <InputNumber
            value={cart.accompte} min={0} type="number" step={0.1}
            onChange={val => setAccompte(val)}
          />
        </div>
      </Col>
      <Col span={24} style={style}>
        <div><strong>Total Facture</strong></div>
        <div><strong>{`${cart.net} $`}</strong></div>
      </Col>
      <Col span={24} style={{...style,background:"#40a9ff",color:"white",padding:"4px", fontSize:"1rem"}}>
        <div><strong>Total A Payer</strong></div>
        <div><strong>{cart.typePaiement === `/api/type_paiements/1` ? cart.net : cart.accompte} $</strong></div>
      </Col>
    </Row>
  )
}

export default CartPayement
