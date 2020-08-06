import React from 'react'
import { Form,Input,Button,message,Modal,Select } from 'antd'

const CreateForm = (props) => {
  const { status, create, categorie } = props

  React.useEffect(categorie.read,[])

  const [form,setForm] = React.useState({
    code:"", name:"", expenceCompteCategorie:null,
  })
  const [visible,setVisible] = React.useState(false)
  const categories = categorie.entities ? categorie.entities.map(d => ({ value: d.id, label: d.name })) : []

  const onReset = () => {
    setForm({ code: "", name: 0, expenceCompteCategorie: null,})
    setVisible(false)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(form.code.length < 3){
      message.error("Le code doit contenir plus de 3 chiffres")
    } else if (form.name.length < 3) {
      message.error("Le nom doit contenir plus de 3 lettres")
    } else if (form.expenceCompteCategorie === null) {
      message.error("Catégorie Obligatoire")
    } else {
      create(form,{
        onSuccess: (d) => {
          message.success("Compte crée avec succés")
          onReset()
        },
        onFail: () => {
          message.error("Erreur lors de la création du Compte")
        }
      })
    }
  }

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Creer un Compte
      </Button>
      <Modal visible={visible} title="Créer un Compte" footer={false}>
        <Form>
          <Form.Item label="Code du Compte">
            <Input
              placeholder='Code' name='code' value={form.code} autoComplete="off"
              onChange={e => setForm({ ...form, code: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Nom du Compte">
            <Input
              placeholder='Nom' name='name' value={form.name} autoComplete="off"
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Montant">
            <Select showSearch placeholder="Categorie" onChange={
              val => setForm({ 
                ...form, expenceCompteCategorie: val,
                })
              }
            >
              {
                categories.map(d => (
                  <Select.Option key={d.value} value={d.value}>{d.label}</Select.Option>
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

export default CreateForm
