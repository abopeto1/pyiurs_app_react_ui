import React from 'react'
import { Form,Input,InputNumber,Button,message,Modal,Select, DatePicker } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { transformDateFormat } from '../../../../../utils'

const CreateForm = (props) => {
  const { status } = props
  const [form,setForm] = React.useState({
    description: "", amount: 0, taux: parseInt(sessionStorage.taux), currency: "USD", orderEcheances: [], nbr_articles: 0,
  })
  const [visible,setVisible] = React.useState(false)

  const onReset = () => {
    setForm({ description: "", amount: 0, taux: parseInt(sessionStorage).taux, currency: "USD", 
    orderEcheances: [], nbr_articles: 0,})
    setVisible(false)
  }

  const info = (text,type) => {
    if(type === "error"){
      message.error(text)
    }
    message.info(text)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(form.description.length < 3){
      info("La description doit contenir plus de 3 lettres")
    } else {
      props.create(form,{
        onSuccess: (d) => {
          info("Commande créee avec succés")
          onReset()
        },
        onFail: () => {
          info("Erreur lors de la création de la commande")
        }
      })
    }
  }

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Faire une Commande
      </Button>
      <Modal visible={visible} title="Faire une Commande" footer={false}>
        <Form>
          <Form.Item label="Description">
            <Input
              placeholder='Description de la coomande' name='description' value={form.description} autoComplete="off"
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Total Articles">
            <InputNumber
              value={form.nbr_articles} min={0}
              onChange={val => setForm({ ...form, nbr_articles: parseInt(val) })}
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
              <Button type="primary" size="small" onClick={() => setForm({
                ...form, orderEcheances: [
                  ...form.orderEcheances, { paied: null, amount: null }
                ]
              })} style={{ marginLeft: "1em" }}>Ajouter Echeance</Button>
            </Input.Group>
          </Form.Item>
          <Form.Item>
            {
              form.orderEcheances.map((d, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "1em" }}>
                  <DatePicker placeholder="Date de remboursement"
                    onChange={
                      val => {
                        setForm({
                          ...form,
                          orderEcheances: form.orderEcheances.map(
                            (e, ii) => ii === i ? { ...e, paied: transformDateFormat(val._d) } : e)
                        })
                      }
                    }
                  />
                  <InputNumber
                    value={d.amount} min={0} placeholder="Montant"
                    onChange={(val) =>
                      setForm({
                        ...form,
                        orderEcheances: form.orderEcheances.map(
                          (e, ii) => ii === i ? { ...e, amount: val } : e)
                      })
                    }
                  />
                  <Button type="danger" onClick={() => setForm({
                    ...form,
                    orderEcheances: form.orderEcheances.filter((e, ii) => i !== ii)
                  })} icon={<DeleteOutlined />}
                  />
                </div>
              ))
            }
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
