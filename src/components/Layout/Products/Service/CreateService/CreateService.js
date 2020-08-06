import React, { useEffect } from 'react'
import { Form, Input, InputNumber, Button, message, Modal, Select } from 'antd'

export const CreateService = ({ create, status, types, segments, ...props }) => {
    useEffect(types.read, [])
    useEffect(segments.read, [])

    const [form, setForm] = React.useState({
        codebarre: null,
        description: null,
        pu: 0, caa: 0, pv: 0,
        type: null,
        segment: null,
        department: "/api/product_departments/3"
    })
    const [visible, setVisible] = React.useState(false)

    const onReset = () => {
        setForm({
            codebarre: null,
            description: null,
            pu: 0, caa: 0, pv: 0,
            type: null,
            segment: 'null',
            department: "/api/product_departments/3"
        })
        setVisible(false)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (form.codebarre === null) {
            message.error("La Codebarre est obligatoire")
        } else if (form.description === null) {
            message.error("La Description est obligatoire")
        } else if (form.type === null) {
            message.error("Le Type est obligatoire")
        } else {
            create(form, {
                api: true,
                onSuccess: (d) => {
                    message.success("Service crée avec succés")
                    onReset()
                },
                onFail: (e) => {
                    console.log(e)
                    message.error("Erreur lors de la création du Service")
                }
            })
        }
    }

    return (
        <div style={{ alignItems: "center", display: "flex", justifyContent: "flex-end"}}>
            <Button type="primary" onClick={() => setVisible(true)}>
                Créer un Sevice
            </Button>
            <Modal visible={visible} title="Créer un nouveau Service" footer={false}>
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
                    <Form.Item label="Prix">
                        <InputNumber
                            value={form.pv} min={0} placeholder="P.V"
                            onChange={val => setForm({ ...form, pv: parseFloat(val) })}
                        />
                    </Form.Item>
                    <Form.Item label="Segment">
                        <Select
                            showSearch placeholder="Segment"
                            onChange={val => setForm({ ...form, segment: `/api/segments/${val}` })}
                            loading={segments.status && segments.status.isFetching}
                        >
                            {
                                segments.entities && segments.entities.map(segment => (
                                    <Select.Option key={segment.id} value={segment.id}>
                                        {segment.name}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Type">
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
