import React from 'react'
import { Form, Input, Row, Col, InputNumber, message } from 'antd'
import styled from 'styled-components'

const Text = styled(Input)`
  border: none;
  border-bottom: 1px solid gray;
  font-style: italic;
  font-weight: bold;
`

export const ProductDetails = ({ billDetail, setBillDetail, ...props }) => {
    const { product } = props

    return (
        <div>
            <Form.Item>
                <Row gutter={8}>
                    <Col xs={24} sm={8}>
                        <Form.Item vertical="true" label="Segment">
                            <Text value={product && product.segment ? product.segment.name : ""} readOnly />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item vertical="true" label="Type">
                            <Text value={product && product.type ? product.type.name : ""} readOnly />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item vertical="true" label="Catégorie">
                            <Text value={product && product.category ? product.category.name : product ? product.cat : ""} readOnly />
                        </Form.Item>
                    </Col>
                </Row>
            </Form.Item>
            <Form.Item>
                <Row gutter={8}>
                    <Col xs={24} sm={8}>
                        <Form.Item vertical="true" label="Description">
                            <Text value={product ? product.description : ""} readOnly />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item vertical="true" label="Marque">
                            <Text value={product && product.brand ? product.brand.name : product ? product.marque : ""} readOnly />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item vertical="true" label="Couleur">
                            <Text value={product ? product.couleur : ""} readOnly />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Quantité">
                            <InputNumber
                                value={billDetail.qte} defaultValue={billDetail.qte} min={0}
                                max={product && product.stock ? product.stock.availableQte : 1}
                                onChange={
                                    val => {
                                        if(!product){
                                            message.error("Aucun produit")
                                        } else if(!product.stock) {
                                            message.error("Erreur Stockage Produit")
                                        } else if(val > product.stock.availableQte){
                                            message.error(`Quantité disponible ${product.stock.availableQte}`)
                                        } else if(val < 1 ){
                                            message.error("Quantité ne peut être vide")
                                        } else {
                                            setBillDetail({ ...billDetail, qte: val })
                                        }
                                    }
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form.Item>
        </div>
    )
}
