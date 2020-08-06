import React from 'react'
import { Form, Input, Row, Col } from 'antd'

export const DeliveryForm = ({ delivery, setDelivery, ...props }) => {
    return (
        <Form >
            <Row gutter={8}>
                <Col xs={24} sm={12}>
                    <Form.Item label="Nom Ou Code de la Livraison (Unique)">
                        <Input
                            placeholder="Code Livraison" value={delivery.name}
                            onChange={e => setDelivery({ ...delivery, name: e.target.value, })}
                        />
                    </Form.Item>
                    <Form.Item label="Agence de Livraison">
                        <Input
                            placeholder="Agence" value={delivery.agency}
                            onChange={e => setDelivery({ ...delivery, agency: e.target.value, })}
                        />
                    </Form.Item>
                    <Form.Item label="Poids">
                        <Input
                            placeholder="Poids" value={delivery.weight} type="number"
                            onChange={e => setDelivery({ ...delivery, weight: Math.round(e.target.value), })}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item label="Description">
                        <Input.TextArea
                            rows={6}
                            placeholder="Description" value={delivery.description}
                            onChange={e => setDelivery({ ...delivery, description: e.target.value, })}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item label="Frais D'Agence">
                        <Input
                            placeholder="Frais D'Agence" value={delivery.costsAgency}
                            onChange={e => setDelivery({ ...delivery, costsAgency: e.target.value, })}
                        />
                    </Form.Item>
                    <Form.Item label="Frais D'Accéssoires D'Achats">
                        <Input
                            placeholder="Frais D'Accéssoires D'Achats" value={delivery.costsOther}
                            onChange={e => setDelivery({ ...delivery, costsOther: e.target.value, })}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item label="Détails">
                        <Input.TextArea
                            rows={4}
                            placeholder="Détails" value={delivery.details}
                            onChange={e => setDelivery({ ...delivery, details: e.target.value, })}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}