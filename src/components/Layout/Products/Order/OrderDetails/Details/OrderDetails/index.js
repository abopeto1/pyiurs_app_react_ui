import React, { useState } from 'react'
import { Form, DatePicker, Button, message, InputNumber, Typography } from 'antd'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import UpdateEntity from '../../../../../../../react-redux/Entity/Update'
import { Description, transformDateFormat, Table } from '../../../../../../../utils'
import OrderEcheanceUpdate from './OrderEcheanceUpdate'

const OrderDetails = ({ update, status, entity, ...props }) => {
    const [form, setForm] = useState({
        ...entity,
    })
    const [edit,setEdit] = useState(null)
    const { Title } = Typography

    const cancel = () => setEdit(null)

    const onSubmit = () => {
        update(form,{
            onSuccess: d => {
                message.success("Comande Modifié avec succées")
                setEdit(null)
            }
        })
    }

    const data = entity ? entity.order_echeances.map(o => {
        const action = o.expence ? "Payé" : (
            <UpdateEntity id={o.id} entityName="order_echeance">
                {
                    rest => <OrderEcheanceUpdate {...rest} />
                }
            </UpdateEntity>
        )

        return {
            key: o.id, "date de paiement": transformDateFormat(o.paied), montant: `${o.amount} ${entity.currency}`, "action": action,
        }
    }) : [{ key:null,"date de paiement": null, montant: null, action:null}]

    return (
        <div>
        {
            entity && (
                <Description title={entity && entity.code}>
                    <div>Crée le {transformDateFormat(entity.created)}</div>
                    <div>Description : {entity.description}</div>
                    <div>Montant : {`${entity.amount} ${entity.currency}`}</div>
                    <div>
                        {
                            edit === "delivery_date" ? (
                                <Form onFinish={() => onSubmit()}>
                                        <Form.Item label="Date de livraison" style={{
                                            display: "flex",justifyContent: "space-between",alignItems: "baseline"
                                        }}>
                                        <DatePicker placeholder="Date de Livraison"
                                            loading={status && status.isFetching}
                                            onChange={val => {
                                                setForm({ ...form, delivery_date: val._d })
                                            }}
                                            disabled={status && status.isFetching}
                                        />
                                    </Form.Item>
                                    <Button icon={<CloseOutlined />} onClick={cancel} size="small" type="danger"  />
                                    <Button icon={<CheckOutlined />} onClick={onSubmit} size="small" type="primary" />
                                </Form>
                                ) : (
                                    <span onClick={() => setEdit("delivery_date")}>
                                        Date de livraison : {
                                        entity.delivery_date ? transformDateFormat(entity.delivery_date) : "Non Définie"
                                        }
                                    </span>
                                )
                        }
                    </div>
                    <div>
                        {
                            edit === "weight" ? (
                                <Form onFinish={() => onSubmit()}>
                                    <Form.Item label="Date de livraison">
                                        <InputNumber placeholder="Poids (En Kg)" value={form.weight} min={0}
                                            onChange={e => {
                                                setForm({ ...form, weight: e})
                                            }}
                                        />
                                    </Form.Item>
                                    <Button icon={<CloseOutlined />} onClick={cancel} size="small" type="danger" />
                                </Form>
                            ) : (
                                    <span onClick={() => setEdit("weight")}>
                                        Poids : {
                                            entity.weight ? entity.weight+" Kg" : "Non Défini"
                                        }
                                    </span>
                                )
                        }
                    </div>
                    <div>
                        {
                            edit === "transfert_costs" ? (
                                <Form onFinish={() => onSubmit()}>
                                    <Form.Item label="Frais D'envoi">
                                            <InputNumber placeholder="Frais D'envoi" value={form.transfert_costs} min={0}
                                            onChange={e => {
                                                setForm({ ...form, transfert_costs: e })
                                            }}
                                            disabled={status && status.isFetching}
                                        />
                                    </Form.Item>
                                    <Button icon={<CloseOutlined />} onClick={cancel} size="small" type="danger" />
                                </Form>
                            ) : (
                                    <span onClick={() => setEdit("transfert_costs")}>
                                        Frais D'envoi : {
                                            entity.transfert_costs ? entity.transfert_costs + " "+ entity.currency : "Non Défini"
                                        }
                                    </span>
                                )
                        }
                    </div>
                    <div>
                        {
                            edit === "fret_costs" ? (
                                <Form onFinish={() => onSubmit()}>
                                    <Form.Item label="Frais De Fret">
                                            <InputNumber placeholder="Frais De Fret" value={form.fret_costs} min={0}
                                            onChange={e => {
                                                setForm({ ...form, fret_costs: e })
                                            }}
                                            disabled={status && status.isFetching}
                                        />
                                    </Form.Item>
                                    <Button icon={<CloseOutlined />} onClick={cancel} size="small" type="danger" />
                                </Form>
                            ) : (
                                    <span onClick={() => setEdit("fret_costs")}>
                                        Frais De Fret : {
                                            entity.fret_costs ? entity.fret_costs + " "+ entity.currency : "Non Défini"
                                        }
                                    </span>
                                )
                        }
                    </div>
                </Description>
            )
        }
            <div style={{display:"flex", justifyContent: "space-between"}}>
                <Title level={4}>Echeances de la Commande</Title>
            </div>
            <Table data={data} loading={(status && status.isFetching) ?? false} pagination={false} />
        </div>
    )
}

export default OrderDetails