import React from 'react'
import { Form,InputNumber,Card,Row,Col } from 'antd'

const Product = (props) => {
  const { billDetail, setBillDetail, product, min } = props
  const taux = sessionStorage.taux || 1750

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Prix ($)">
          <InputNumber
            value={billDetail.net} min={parseInt(sessionStorage.id) === 4 ? 0 : min} type="number"
            step={0.1}
            onChange={val => setBillDetail({...billDetail, pu:val*.84, tax:val*.16, net: val})}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Prix (FC)">
          <InputNumber
            value={billDetail.net * taux} min={parseInt(sessionStorage.id) === 4 ? 0 : (min*taux)}
            suffix={() => <span>FC</span>} type="number" step={0.1}
            onChange={val => setBillDetail({...billDetail, pu:(val/taux)*.84, tax:(val/taux)*.16, net: val/taux})}
          />
        </Form.Item>
      </Col>
      <Col span={24}>
      {
        min !== 0 && product.id && <Card>{`Dernier prix ${min}$`}</Card>
      }
      </Col>
    </Row>
  )
}

export default Product
