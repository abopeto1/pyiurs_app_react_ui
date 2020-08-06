import React, { useEffect } from 'react'
import { Form, Input, InputNumber, Button, message, Modal, Select, Row, Col } from 'antd'

export const CreateProduct = ({ create, status, brands, types, ...props }) => {
    useEffect(brands.read, [])
    useEffect(types.read, [])

    const [form, setForm] = React.useState({
        codebarre: null,
        description: null,
        taille: null,
        couleur: null,
        brand: null,
        pu: 0, caa: 0, pv: 0,
        type: null,
        cat: null,
    })
    const [visible, setVisible] = React.useState(false)

    const onReset = () => {
        setForm({
            codebarre: null,
            description: null,
            taille: null,
            couleur: null,
            brand: null,
            pu: 0, caa: 0, pv: 0,
            type: null,
            cat: null,
        })
        setVisible(false)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (form.codebarre === null) {
            message.error("La Codebarre est obligatoire")
        } else if (form.description === null) {
            message.error("La Desceiption est obligatoire")
        } else {
            create(form, {
                api: true,
                onSuccess: (d) => {
                    message.success("Produit crée avec succés")
                    onReset()
                },
                onFail: (e) => {
                    console.log(e)
                    message.error("Erreur lors de la création du Produit")
                }
            })
        }
    }

    return (
        <div style={{ alignItems: "center", display: "flex", justifyContent: "flex-end"}}>
            <Button type="primary" onClick={() => setVisible(true)}>
                Créer un Produit
            </Button>
            <Modal visible={visible} title="Créer un nouveau Produit" footer={false}>
                <Form>
                    <Form.Item label="Codebarre" required>
                        <Input
                            value={form.codebarre} placeholder="Codebarre"
                            onChange={e => setForm({ ...form, codebarre: e.target.value})}
                        />
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input
                            value={form.description} placeholder="Description"
                            onChange={e => setForm({ ...form, description: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Details">
                        <Row gutter={8}>
                            <Col span={8}>
                                <Input
                                    value={form.taille} placeholder="Taille"
                                    onChange={val => setForm({ ...form, taille: val.target.value })}
                                />
                            </Col>
                            <Col span={8}>
                                <Input
                                    value={form.couleur} placeholder="Couleur"
                                    onChange={val => setForm({ ...form, couleur: val.target.value })}
                                />
                            </Col>
                            <Col span={8}>
                                <Select
                                    showSearch placeholder="Marque"
                                    loading={brands.status && brands.status.isFetching}
                                    onChange={val => setForm({ ...form, brand: `/api/brands/${val}` })}
                                >
                                    {
                                        brands.entities && brands.entities.map(brand => (
                                            <Select.Option key={brand.id} value={brand.id}>
                                                {brand.name}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item label="Prix">
                        <Row gutter={8}>
                            <Col span={8}>
                                <InputNumber
                                    value={form.pu} min={0} placeholder="P.U"
                                    onChange={val => setForm({ ...form, pu: parseFloat(val) })}
                                />
                            </Col>
                            <Col span={8}>
                                <InputNumber
                                    value={form.caa} min={0} placeholder="CAA"
                                    onChange={val => setForm({ ...form, caa: parseFloat(val) })}
                                />
                            </Col>
                            <Col span={8}>
                                <InputNumber
                                    value={form.pv} min={0} placeholder="P.V"
                                    onChange={val => setForm({ ...form, pv: parseFloat(val) })}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item label="Caractéristique">
                        <Row gutter={8}>
                            <Col xs={24} sm={12}>
                                <Select
                                    showSearch placeholder="Type"
                                    onChange={val => setForm({ ...form, type: `/api/types/${val}` })}
                                    loading={types.status && types.status.isFetching}
                                >
                                    {
                                        types.entities && types.entities.map(type => (
                                            <Select.Option key={type.id} value={type.id}>
                                                {type.name}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item label="Catégorie">
                                    <Input
                                        value={form.cat} placeholder="Catégorie"
                                        onChange={e => setForm({ ...form, cat: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={onSubmit} loading={status && status.isFetching} >Créer</Button>
                        <Button type="danger" htmlType="button" onClick={onReset} disabled={status && status.isFetching} style={{ marginLeft: '8px' }}>Annuler</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
