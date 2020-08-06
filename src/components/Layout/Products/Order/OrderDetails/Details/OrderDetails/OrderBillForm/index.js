import React from 'react'
import { Form, Input, InputNumber, Button, message, Modal, Select } from 'antd'

const CreateForm = (props) => {
    const { status } = props
    const [form, setForm] = React.useState({
        amount: 0, taux: null, currency: "USD", orders: props.id, pdf_url: null, numero: null,
        store:null, total_products: 0,
    })
    const [visible, setVisible] = React.useState(false)

    const onReset = () => {
        setForm({
            amount: 0, taux: sessionStorage.taux, currency: "USD", order: null, pdf_url: null, numero: null,
            store: null,
        })
        setVisible(false)
    }

    const info = (text, type) => {
        if (type === "error") {
            message.error(text)
        }
        message.info(text)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (form.numero === null) {
            info("Le numero de la facture est obligatoire")
        } else if (form.amount <= 0) {
            info("Le Montant ne peut être nul")
        } else if (form.total_products <= 0) {
            info("Une facture doit contenir au moins un produit")
        } else {
            props.create(form, {
                onSuccess: (d) => {
                    info("Facture ajoutée avec succés")
                    onReset()
                },
                onFail: () => {
                    info("Erreur lors de la l'ajout de la Facture")
                }
            })
        }
    }

    return (
        <div>
            <Button type="primary" onClick={() => setVisible(true)}>Ajouter une Facture</Button>
            <Modal visible={visible} title="Ajouter une Facture" footer={false}>
                <Form>
                    <Form.Item label="Numero de la Facture">
                        <Input
                            placeholder='Numero de la Facture' value={form.numero} autoComplete="off"
                            onChange={e => setForm({ ...form, numero: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Magasin">
                        <Input
                            placeholder='Magasin' value={form.store} autoComplete="off"
                            onChange={e => setForm({ ...form, store: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Nombre total Articles">
                        <InputNumber
                            value={form.total_products} min={0}
                            onChange={val => setForm({ ...form, total_products: parseFloat(val) })}
                        />
                    </Form.Item>
                    <Form.Item label="Montant">
                        <Input.Group compact>
                            <InputNumber
                                value={form.amount} min={0}
                                onChange={val => setForm({ ...form, amount: parseFloat(val) })}
                            />
                            <Select showSearch placeholder="Dévise" onChange={
                                val => setForm({
                                    ...form, currency: val, taux: val === "CDF" && sessionStorage.taux,
                                })
                            }
                            >
                                {
                                    ["USD", "CDF", "EUR"].map((d, i) => (
                                        <Select.Option key={i} value={d}>{d}</Select.Option>
                                    ))
                                }
                            </Select>
                            <InputNumber
                                value={form.tauxEuro} min={0} placeholder="Taux Euro"
                                disabled={form.currency !== "EUR"}
                                onChange={val => setForm({ ...form, taux: parseFloat(val) })}
                            />
                        </Input.Group>
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

export default CreateForm
