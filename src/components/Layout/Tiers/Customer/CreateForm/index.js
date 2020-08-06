import React from 'react'
import { Form,Input,Button,Popconfirm,Modal,message } from 'antd'

const CreateForm = (props) => {
  const { create, status, setVisible, visible } = props

  const [form,setForm] = React.useState({
    telephone:"", name:"", comment:"",
  })

  const onReset = () => {
    setForm({telephone:"", name:"", comment:"",})
    props.setVisible(false)
  }

  const onSubmit = () => {
    if(form.name === "" || form.telephone === "" ){
      message.error("Champs non rempli")
    } else if(form.name.length < 3){
      message.error("Le nom doit contenir au moins 3 lettres")
    } else if(form.telephone.length !== 9) {
      message.error("Ecrivez le numero sans le zéro du début")
    } else {
      create(form, {
        onSuccess: (o) => {
          if(props.setCart && props.cart){
            props.setCart({ ...props.cart, customer: `/api/customers/${o.id}`})
          }
          onReset()
          message.success("Client creé avec succés")
        },
        onFail: () => message.error("Erreur lors de la création du crédit")
      })
    }
  }

  return (

    <Modal title="Création Client" visible={visible} centered
      footer={null} onCancel={() => setVisible(false)} closable={false}
    >
      <Form layout="vertical">
        <Form.Item label="Nom">
          <Input value={form.name} placeholder="Nom" onChange={e => setForm({...form,name:e.target.value})} />
        </Form.Item>
        <Form.Item label="Téléphone">
          <Input value={form.telephone} type="phone" placeholder="Téléphone" onChange={e => setForm({...form,telephone:e.target.value})} />
        </Form.Item>
        <Form.Item label="Commentaire">
          <Input.TextArea rows={4} value={form.comment} placeholder="Commentaire" onChange={e => setForm({...form,comment:e.target.value})} />
        </Form.Item>
        <Form.Item>
          <Popconfirm
            title={
              form.name === "" || form.telephone === "" ? "Certains Champs non rempli" :
              `Confirmez-vous la création du client ${form.name} avec le numéro ${form.telephone}`
            }
            onConfirm={onSubmit}
          >
            <Button type="primary" htmlType="submit" loading={status && status.isFetching}>
              Créer
            </Button>
          </Popconfirm>
          <Button type="danger" htmlType="button" onClick={onReset} disabled={status && status.isFetching} style={{marginLeft:'8px'}}>Annuler</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateForm
