import React from 'react'
import { Form, Input, Button, message, Modal, } from 'antd'
import { trim } from 'lodash'
import { PlusCircleFilled } from '@ant-design/icons'

export const CreateBrand = ({ create, status, ...props }) => {
    const [form, setForm] = React.useState({
        name: null, slogan: null,
    })
    const [visible, setVisible] = React.useState(false)

    const onReset = () => {
        setForm({ name: null, slogan: null, })
        setVisible(false)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (form.name === null) {
            message.error("Nom obligatoire pour la marque")
        } else {
            create(form, {
                api: true,
                onSuccess: (d) => {
                    message.success(`Marque ${d.name} ajoutée avec succés`)
                    onReset()
                },
                onFail: () => {
                    message.error("Erreur lors de l'Avance'")
                }
            })
        }
    }

    return (
        <div style={{ alignItems: "center", display: "flex", justifyContent: "flex-end"}}>
            <Button type="primary" onClick={() => setVisible(true)} icon={<PlusCircleFilled />}>
                Ajouter une marque 
            </Button>
            <Modal visible={visible} title="Ajouter une nouvelle Marque" footer={false}>
                <Form>
                    <Form.Item label="Nom de la marque" required>
                        <Input
                            value={form.name} placeholder="Nom de la marque"
                            onChange={e => setForm({ ...form, name: trim(e.target.value)})}
                        />
                    </Form.Item>
                    <Form.Item label="Slogan de la marque">
                        <Input
                            value={form.slogan} placeholder="Slogan de la marque"
                            onChange={e => setForm({ ...form, slogan: trim(e.target.value) })}
                        />
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
