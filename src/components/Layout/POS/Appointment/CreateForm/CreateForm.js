import React, { useEffect } from 'react'
import moment from 'moment'
import { Card, Form, Select, Button, Popconfirm, message, DatePicker } from 'antd'
import { isNull } from 'lodash'

export const CreateForm = ({ status, create, customers, agents, services }) => {
    useEffect(customers.read,[])
    useEffect(agents.read, [])
    useEffect(services.read, [])

    const [form, setForm] = React.useState({
        customer: null, agent: null, service: null, planned: null, 
    })

    const onReset = () => setForm({
        customer: null, agent: null, service: null, planned: null, 
    })

    const onSubmit = () => {
        if(isNull(form.service)){
            message.error("Choisissez le Service")
            return 0
        }
        if(form.customer === null){
            message.error("Choisissez le (la) Client(e)")
            return 0
        }
        if (form.agent === null) {
            message.error("Choisissez l'Agent en charge du (de la) Client(e)")
            return false
        }
        create(form,{
            api: true,
            onSuccess: d => {
                message.success("Rendez-vous crée avec succées")
                onReset()
            },
            onFail: e => {
                console.log(e)
                message.error("Something Wrong")
            }
        })
    } 

    return (
        <Card title="Créer un rendez-vous">
            <Form onFinish={() => onSubmit()}>
                <Form.Item label="Service">
                    <Select
                        showSearch placeholder="Service" loading={services.status && services.status.isFetching}
                        onChange={val => setForm({ ...form, service: `/api/products/${val}`, })}
                    >
                        {
                            services.entities && services.entities.map(service => (
                                <Select.Option value={service.id} key={service.id}>
                                    {service.description}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="Client(e)">
                    <Select
                        showSearch placeholder="Client(e)" loading={customers.status && customers.status.isFetching}
                        onChange={val => setForm({ ...form, customer: `/api/customers/${val}`, })}
                    >
                        {
                            customers.entities && customers.entities.map(customer => (
                                <Select.Option value={customer.id} key={customer.id}>
                                    { customer.name } ({customer.telephone})
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="Agent">
                    <Select
                        showSearch placeholder="Agent" loading={agents.status && agents.status.isFetching}
                        onChange={val => setForm({ ...form, agent: `/api/agents/${val}`, })}
                    >
                        {
                            agents.entities && agents.entities.map(agent => (
                                <Select.Option value={agent.id} key={agent.id}>
                                    {agent.name}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="Heure du Rendez-vous">
                    <DatePicker
                        placeholder="Heure du Rendez-vous"
                        showTime="true"
                        onChange={ val => setForm({ ...form, planned: moment(val._d).format(), }) }
                    />
                </Form.Item>
                <Form.Item>
                    <Popconfirm
                        title="Confirmez-vous le rendez-vous"
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
