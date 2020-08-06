import React from 'react'
import { Form,Input,Button,Select,InputNumber,Popconfirm,message, DatePicker } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
// import moment from 'moment'
import { transformDateFormat } from '../../../../../../utils'

const CreateForm = (props) => {
  const { providers, getProviders, createCreditStatus, createCredit  } = props

  React.useEffect(getProviders,[])

  const [form,setForm] = React.useState({
    type:'bank',taux:sessionStorage.taux,currency:null,tauxEuro:null,nbr_echeance:null,
    amount: 0, provider: null, agent: null, motif: "", creditEcheances: [],
  })

  const onReset = () => {
    setForm({
      typeCredit: 'bank', taux: null, currency: null, tauxEuro: null, nbr_echeance: null, amount: 0, 
      provider: null, agent: null, motif:"",creditEcheances:[],
    })
    props.setVisible(false)
  }

  const info = (text,type) => {
    if(type === "error"){
      message.error(text)
    } else {
      message.info(text)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(form.currency === null){
      info("La dévise est obligatoire","error")
    } else if(form.currency === "EUR" && (form.tauxEuro === null || form.tauxEuro <= 0)) {
      info("Veuillez définir le taux euro - dollar actuel","error")
    } else if (form.provider === null) {
      info("Veuillez Choisir un Fournisseur pour la dépense","error")
    } else {
      createCredit(form, {
        onSuccess: () => {
          onReset()
          info("Crédit ajouté avec succés")
        },
        onFail: () => info("Erreur lors de l'ajout du crédit")
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
          <Select showSearch placeholder="Dévise" onChange={val => setForm({...form,currency:val,tauxEuro:null})}>
          {
            ["USD","CDF","EUR"].map((d,i) => (
              <Select.Option key={i} value={d}>{d}</Select.Option>
            ))
          }
          </Select>
          <InputNumber
            value={form.tauxEuro} min={0} placeholder="Taux Euro"
            disabled={form.currency !== "EUR"}
            onChange={val => setForm({...form,tauxEuro:parseFloat(val)})}
          />
          <Button type="primary" size="small" onClick={() => setForm({...form, creditEcheances:[
            ...form.creditEcheances, {paied:null, amount:null}
          ]})} style={{marginLeft: "1em"}}>Ajouter Echeance</Button>
        </Input.Group>
      </Form.Item>
      <Form.Item>
        {
          form.creditEcheances.map((d, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "1em" }}>
              <DatePicker placeholder="Date de remboursement"
                onChange={
                  val => {
                    setForm({
                      ...form,
                      creditEcheances: form.creditEcheances.map(
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
                    creditEcheances: form.creditEcheances.map(
                      (e, ii) => ii === i ? { ...e, amount:val } : e)
                  })
                }
              />
              <Button type="danger" onClick={() => setForm({
                ...form,
                creditEcheances: form.creditEcheances.filter((e,ii) => i !== ii)})} icon={<DeleteOutlined />}
                />
            </div>
          ))
        }
      </Form.Item>
      <Form.Item>
        <Popconfirm
          title={`Confirmez-vous l'entrée du crédit de ${form.amount} ${form.currency}`}
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
