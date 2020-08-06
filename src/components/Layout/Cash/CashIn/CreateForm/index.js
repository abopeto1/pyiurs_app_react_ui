import React from 'react'
import { Form,Input,Button,Select,InputNumber,Popconfirm,message } from 'antd'

const CreateForm = (props) => {
  const { providers, getProviders, createCashin,createCashinStatus  } = props

  React.useEffect(getProviders,[])

  const [form,setForm] = React.useState({
    amount:0, currency:null,operator:"Admin",motif:"",comment:"",provider:null,taux:1750,
  })

  const onReset = () => {
    setForm({amount:0, currency:null,operator:props.user,motif:"",comment:"",provider:null,})
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
    if(form.amount < 1){
      info("Le montant ne peut être nul","error")
    } if(form.currency === null){
      info("La dévise est obligatoire","error")
    } else if(form.motif.length < 3) {
      info("Veuillez définir motif","error")
    } else if (form.provider === null) {
      info("Veuillez Choisir un Fournisseur pour la dépense","error")
    } else {
      createCashin(form, {
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
      <Form.Item label="Motif">
        <Input value={form.motif} placeholder="Motif" onChange={e => setForm({...form,motif:e.target.value})} />
      </Form.Item>
      <Form.Item label="Montant">
        <Input.Group compact>
          <InputNumber
            value={form.amount} min={0}
            // defaultValue={1}
            // formatter={ val => `$ ${val}`.replace(/\B(?=(\d{3})+(?!\d))/g,',')}
            // parser={val => val.replace(/\$\s?|(,*)/g,',')}
            onChange={val => setForm({...form,amount:parseFloat(val)})}
          />
          <Select showSearch placeholder="Dévise" onChange={val => setForm({...form,currency:val,})}>
          {
            ["USD","CDF"].map((d,i) => (
              <Select.Option key={i} value={d}>{d}</Select.Option>
            ))
          }
          </Select>
        </Input.Group>
      </Form.Item>
      <Form.Item label="Commentaire">
        <Input.TextArea rows={4} value={form.comment} placeholder="Commentaire" onChange={e => setForm({...form,comment:e.target.value})} />
      </Form.Item>
      <Form.Item>
        <Popconfirm
          title={`Confirmez-vous l'entrée du cash de ${form.amount} ${form.currency}`}
          onConfirm={onSubmit}
        >
          <Button type="primary" htmlType="submit" loading={createCashinStatus && createCashinStatus.isFetching}>
            Créer
          </Button>
        </Popconfirm>
        <Button type="danger" htmlType="button" onClick={onReset} disabled={createCashinStatus && createCashinStatus.isFetching} style={{marginLeft:'8px'}}>Annuler</Button>
      </Form.Item>
    </Form>
  )
}

export default CreateForm
