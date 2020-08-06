import React from 'react'
import { Form,Input,Button,Select,InputNumber,Popconfirm,message, DatePicker } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
// import moment from 'moment'
import { transformDateFormat } from '../../../../../../utils'

const CreateForm = (props) => {
  const { providers, getProviders, createCreditStatus, createCredit  } = props

  React.useEffect(getProviders,[])

  const [form,setForm] = React.useState({
    motif: "", amount: 0, currency: null, taux: null, provider: null, debitEcheances: [], 
  })

  const onReset = () => {
    setForm({
      motif: "", amount: 0, currency: "USD", taux: null, provider: null, debitEcheances: [],
    })
    props.setVisible(false)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(form.currency === null){
      message.error("La dévise est obligatoire")
    } else if (form.provider === null) {
      message.error("Veuillez Choisir un Fournisseur pour la dépense")
    } else {
      createCredit(form, {
        onSuccess: () => {
          onReset()
          message.success("Crédit ajouté avec succés")
        },
        onFail: () => message.error("Erreur lors de l'ajout du crédit")
      })
    }
  }

  return (
    <Form layout="vertical">
      <Form.Item label="Motif">
        <Input
          value={form.motif}
          onChange={e => setForm({ ...form, motif: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Fournisseur">
        <Select
          showSearch placeholder="Fournisseur" onChange={val => setForm({...form,provider:val,})}
          optionFilterProp="children"
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
        {
          providers && providers.map(d => (
            <Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>
          ))
        }
        </Select>
      </Form.Item>
      <Form.Item label="Montant">
        <Input.Group compact>
          <InputNumber
            value={form.amount} min={0}
            onChange={val => setForm({...form,amount:parseFloat(val)})}
          />
          <Select showSearch placeholder="Dévise" onChange={val => setForm({ ...form, currency: val, })}>
          {
            ["USD","CDF","EUR"].map((d,i) => (
              <Select.Option key={i} value={d}>{d}</Select.Option>
            ))
          }
          </Select>
          <InputNumber
            min={0} placeholder="Taux Euro"
            disabled={form.currency !== "EUR"}
            onChange={val => setForm({ ...form,taux:parseFloat(val) })}
          />
          <Button 
            type="primary" size="small" onClick={
              () => setForm({
                ...form, debitEcheances:[
                  ...form.debitEcheances, {paied:null, amount:null}
                ]})
            } style={{marginLeft: "1em"}}>Ajouter Echeance</Button>
        </Input.Group>
      </Form.Item>
      <Form.Item>
        {
          form.debitEcheances.map((d, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "1em" }}>
              <DatePicker placeholder="Date de remboursement"
                onChange={
                  val => {
                    setForm({
                      ...form,
                      debitEcheances: form.debitEcheances.map(
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
                    debitEcheances: form.debitEcheances.map(
                      (e, ii) => ii === i ? { ...e, amount:val } : e)
                  })
                }
              />
              <Button type="danger" onClick={() => setForm({
                ...form,
                debitEcheances: form.debitEcheances.filter((e,ii) => i !== ii)})} icon={<DeleteOutlined />}
                />
            </div>
          ))
        }
      </Form.Item>
      <Form.Item>
        <Popconfirm
          title={`Confirmez-vous l'entrée du débit de ${form.amount} ${form.currency}`}
          onConfirm={onSubmit}
        >
          <Button type="primary" htmlType="submit" loading={createCreditStatus && createCreditStatus.isFetching}>
            Créer
          </Button>
        </Popconfirm>
        <Button type="danger" htmlType="button" onClick={onReset} disabled={createCreditStatus && createCreditStatus.isFetching} style={{marginLeft:'8px'}}>Annuler</Button>
      </Form.Item>
    </Form>
  )
}

export default CreateForm
