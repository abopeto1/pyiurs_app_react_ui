import React from 'react'
import { Form, Input, Button, message, Modal, Select } from 'antd'
import { trim } from 'lodash'
import { PlusCircleFilled } from '@ant-design/icons'

export const CreateType = ({ create, status, segments, ...props }) => {
    React.useEffect(segments.read, [])

    const [form, setForm] = React.useState({
        name: null, segment: null,
    })
    const [visible, setVisible] = React.useState(false)

    const onReset = () => {
        setForm({ name: null, segment: null, })
        setVisible(false)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (form.name === null) {
            message.error("Nom obligatoire pour le type")
        } else if (form.segment === null) {
            message.error("Segment obligatoire pour le type")
        } else {
            create(form, {
                api: true,
                onSuccess: (d) => {
                    message.success(`Nouveau type "${d.name}" crée avec succés`)
                    onReset()
                },
                onFail: (e) => {
                    console.log(e)
                    message.error("Erreur lors de la création du Type")
                }
            })
        }
    }

    return (
        <div style={{ alignItems: "center", display: "flex", justifyContent: "flex-end"}}>
            <Button type="primary" onClick={() => setVisible(true)} icon={<PlusCircleFilled />}>
                Créer un Type
            </Button>
            <Modal
                visible={visible} title="Créer un nouveau Type" footer={false}
                onCancel={() => setVisible(false)}
            >
                <Form>
                    <Form.Item label="Nom du Type" required>
                        <Input
                            value={form.name} placeholder="Nom du Type"
                            onChange={e => setForm({ ...form, name: trim(e.target.value)})}
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
                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={onSubmit} loading={status && status.isFetching} >Créer</Button>
                        <Button type="danger" htmlType="button" onClick={onReset} disabled={status && status.isFetching} style={{ marginLeft: '8px' }}>Annuler</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
