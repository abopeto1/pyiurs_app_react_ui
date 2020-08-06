import React from 'react'
import { Form,Input,InputNumber,Button,message,Modal, Select, DatePicker } from 'antd'

const CreateForm = (props) => {
  const { status, agents } = props
  const [form,setForm] = React.useState({
    period:null, amount: 0, currency: "USD", taux: null, agent: null,
  })
  const [visible,setVisible] = React.useState(false)

  const onReset = () => {
    setForm({ period: null, amount: 0, currency: "USD", taux: null, agent: null,})
    setVisible(false)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(form.period === null){
      message.error("La période est obligatoire")
    } else if (form.agent === null) {
      message.error("Agent est obligatoire")
    } else {
      props.create(form,{
        onSuccess: (d) => {
          message.success("Avance effectuée avec succés")
          onReset()
        },
        onFail: () => {
          message.error("Erreur lors de l'Avance'")
        }
      })
    }
  }

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Faire une Avance
      </Button>
      <Modal visible={visible} title="Faire une Avance" footer={false}>
        <Form>
          <Form.Item label="Agent">
            <Select showSearch placeholder="Agent" onChange={
              val => setForm({
                ...form, agent: val
              })
            }
            >
              {
                agents.map(d => (
                  <Select.Option key={d.key} value={d.key}>{d.nom}</Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item label="Mois">
            <DatePicker onChange={(date, datestring) => setForm({...form, period: datestring})} picker="month" />
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
