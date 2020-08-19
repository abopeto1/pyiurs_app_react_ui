import React from 'react'
import { Form, InputNumber, Button, message, Modal, Input, } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import { isNull } from 'lodash'

export const AddStockForm = ({ update, status, ...props }) => {
    const [form, setForm] = React.useState({
        addStock: 0,
        delivery_code: null
    })
    const [visible, setVisible] = React.useState(false)

    const onReset = () => {
        setForm({ addStock: 0, delivery_code: null })
        setVisible(false)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (form.addQte <= 0) {
            message.error("Impossible d'ajouter une quantité nulle ou négative")
        } else if (isNull(form.deliveryCode)) {
            message.error("Code Livraison Obligatoire")
        } else {
            update(form, {
                api: true,
                onSuccess: (d) => {
                    message.success(`Stock ajouté avec succés`)
                    onReset()
                },
                onFail: () => {
                    message.error("Erreur lors de l'ajout du stock'")
                }
            })
        }
    }

    return (
        <div style={{ alignItems: "center", display: "flex", justifyContent: "flex-end"}}>
            <Button type="primary" onClick={() => setVisible(true)} icon={<PlusCircleFilled />}>
                Ajouter une Quantité 
            </Button>
            <Modal visible={visible} title="Ajouter Stock" footer={false}>
                <Form>
                    <Form.Item label="Quantité à ajouter">
                        <InputNumber
                            value={form.addStock} placeholder="Quantité" min={0}
                            onChange={e => setForm({ ...form, addStock: parseInt(e) })}
                        />
                    </Form.Item>
                    <Form.Item label="Quantité à ajouter">
                        <Input
                            value={form.deliveryCode} placeholder="Code Livraison"
                            onChange={e => setForm({ ...form, deliveryCode: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary" htmlType="submit" onClick={onSubmit} loading={status && status.isFetching}
                        >
                            Ajouter
                        </Button>
                        <Button type="danger" htmlType="button" onClick={onReset} disabled={status && status.isFetching} style={{ marginLeft: '8px' }}>Annuler</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
