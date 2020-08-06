import React from 'react'
import { Card, Form, Input, InputNumber, Select, Button, Popconfirm, message } from 'antd'

const Service = ({ status, create }) => {
    const [form, setForm] = React.useState({
        description:"", amount: 0, currency: null, operator: sessionStorage.id,
    })

    const onReset = () => setForm({
        description: "", amount: 0, currency: null, operator: sessionStorage.id,
    })

    const onSubmit = () => {
        if(form.description.length < 4){
            message.error("Vous devez spécifiez l'object du service")
            return 0
        }
        if(form.currency === null){
            message.error("Choisissez la dévise")
            return 0
        }
        create(form,{
            onSuccess: d => {
                message.success("Service facturé avec succées")
                onReset()
            },
            onFail: e => {
                console.log(e)
                message.error("Something Wrong")
            }
        })
    }

    return (
        <Card title="Facturer un service ou autre">
            <Form onFinish={() => console.log("ok")}>
                <Form.Item label="Description">
                    <Input 
                        placeholder="Description" value={form.description}
                        onChange={e => setForm({...form, description: e.target.value})}
                    />
                </Form.Item>
                <Form.Item label="Montant">
                    <Input.Group compact>
                        <InputNumber
                            value={form.amount} min={0}
                            onChange={val => setForm({ ...form, amount: parseFloat(val) })}
                        />
                        <Select showSearch placeholder="Dévise" onChange={val => setForm({ ...form, currency: val, })}>
                            {
                                ["USD", "CDF"].map((d, i) => (
                                    <Select.Option key={i} value={d}>{d}</Select.Option>
                                ))
                            }
                        </Select>
                    </Input.Group>
                </Form.Item>
                <Form.Item>
                    <Popconfirm
                        title="Confirmez-vous la facturation de ce service"
                        onConfirm={onSubmit}
                    >
                        <Button type="primary" htmlType="submit" loading={status && status.isFetching}>
                            Créer
                        </Button>
                    </Popconfirm>
                    <Button type="danger" htmlType="button" onClick={onReset} disabled={status && status.isFetching} style={{ marginLeft: '8px' }}>Annuler</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Service