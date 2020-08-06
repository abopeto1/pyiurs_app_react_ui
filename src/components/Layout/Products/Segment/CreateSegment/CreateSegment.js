import React from 'react'
import { Form, Input, Button, message, Modal, Select } from 'antd'
import { trim } from 'lodash'
import { PlusCircleFilled } from '@ant-design/icons'

export const CreateSegment = ({ create, status, productDepartment, ...props }) => {
    const { read } = productDepartment

    React.useEffect(() => read({ api: true }), [read])

    const [form, setForm] = React.useState({
        name: null, department: null
    })
    const [visible, setVisible] = React.useState(false)

    const onReset = () => {
        setForm({ name: null, department: null, })
        setVisible(false)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (form.name === null) {
            message.error("Nom obligatoire pour le segment")
        } else if (form.name === null) {
            message.error("Deaprtement obligatoire pour le segment")
        } else {
            create(form, {
                api: true,
                onSuccess: (d) => {
                    message.success(`nouveau segment "${d.name}" crée avec succés`)
                    onReset()
                },
                onFail: (e) => {
                    console.log(e)
                    message.error("Erreur lors de la création du Segment")
                }
            })
        }
    }

    return (
        <div style={{ alignItems: "center", display: "flex", justifyContent: "flex-end"}}>
            <Button type="primary" onClick={() => setVisible(true)} icon={<PlusCircleFilled />}>
                Créer un Segment
            </Button>
            <Modal
                visible={visible} title="Créer un nouveau Segment" footer={false}
                onCancel={() => setVisible(false)}
            >
                <Form>
                    <Form.Item label="Nom du Segment" required>
                        <Input
                            value={form.name} placeholder="Nom du Segment"
                            onChange={e => setForm({ ...form, name: trim(e.target.value)})}
                        />
                    </Form.Item>
                    <Form.Item label="Departement">
                        <Select
                            showSearch placeholder="Departement"
                            onChange={val => setForm({ ...form, department: `/api/product_departments/${val}` })}
                            loading={productDepartment.status && productDepartment.status.isFetching}
                        >
                            {
                                productDepartment.entities && productDepartment.entities.map(department => (
                                    <Select.Option key={department.id} value={department.id}>
                                        {department.name}
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
