import React from 'react'
import { Form,Input,Button,message } from 'antd'

const CreateForm = (props) => {
  const { status } = props
  const [form,setForm] = React.useState({
    name:'',description:'',
  })

  const onReset = () => {
    setForm({name:'',description:''})
    props.setVisible(false)
  }

  const info = (text) => {
    message.info(text)
  }

  React.useEffect(() => {
    if(status && !status.isFetching && status.error !== null){
      info("L'entrepot n'a pas été crée")
    }
  },[status])

  const onSubmit = (e) => {
    e.preventDefault()
    if(form.name.length < 3){
      info("Le nom doit contenir plus de 3 lettres")
    } else {
      async function fetchData(){
        await props.create(form)
        if(status && !status.isFetching && status.error !== null){
          info("Erreur lors de la création de l'entrepot")
        } else {
          props.refreshUuid()
          onReset()
          info("Entrepot créer avec succés")
        }
      }
      fetchData()
    }
  }

  return (
    <Form>
      <Form.Item>
        <Input
          placeholder='Nom' name='name' value={form.name}
          onChange={e => setForm({...form,name:e.target.value})}
        />
      </Form.Item>
      <Form.Item>
        <Input placeholder='Description' name='description' value={form.description} onChange={e => setForm({...form,description:e.target.value})} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={onSubmit} loading={status && status.isFetching} >Créer</Button>
        <Button type="danger" htmlType="button" onClick={onReset} disabled={status && status.isFetching} style={{marginLeft:'8px'}}>Annuler</Button>
      </Form.Item>
    </Form>
  )
}

export default CreateForm
