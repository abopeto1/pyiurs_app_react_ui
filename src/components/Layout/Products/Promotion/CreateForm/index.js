import React from 'react'
import { Form,Input,Button,message,DatePicker } from 'antd'
import SelectPromotionType from '../PromotionType/Select'

const CreateForm = ({id, promo, ...props}) => {
  const { status } = props
  const [form,setForm] = React.useState({
    name:promo ? promo.name : '' , type:id ? parseInt(promo.type.id) : null,
    price: id ? promo.price : 0, percent: id ? promo.percent : 0,endDate:id ? promo.endDate : null,
  })

  const onReset = () => {
    setForm({name:'',type:null,price:0,percent:0,endDate:null,})
    props.setVisible && props.setVisible(false)
    props.setOpen && props.setOpen(false)
  }

  const info = (text,type) => {
    if(type === "error"){
      message.error(text)
    }
    message.info(text)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if(form.name.length < 3){
      info("Le nom doit contenir plus de 3 lettres")
    } else if(form.type === null){
      info("Le type est obligatoire","error")
    } else if(form.type === 1 && (form.percent > 100 || form.percent < 0)) {
      info("Le % doit être un nombre entre 0 et 100","error")
    } else if(form.type === 2 && form.price < 0) {
      info("Vous ne pouvez pas solder un produit à 0$","error")
    } else {
      if(id){
        props.update(form,{
          onSuccess: (d) => {
            info("Promotion modifié avec succés")
            onReset()
          },
          onFail: () => {
            info("Erreur lors de la modification de la promotion")
          }
        })
      } else {
        props.create(form,{
          onSuccess: (d) => {
            info("Promotion créee avec succés")
            onReset()
          },
          onFail: () => {
            info("Erreur lors de la création de la promotion")
          }
        })
      }
    }
  }

  return (
    <Form>
      <Form.Item>
        <Input
          placeholder='Nom' name='name' value={form.name} autoComplete="off"
          onChange={e => setForm({...form,name:e.target.value})}
        />
      </Form.Item>
      <Form.Item>
        <SelectPromotionType value={form} setValue={setForm} />
      </Form.Item>
      <Form.Item>
        <DatePicker onChange={(date, dateString) => setForm({...form, endDate: dateString})}
          placeholder="Selectionner la date de la promotion" style={{width:"100%"}}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={onSubmit} loading={status && status.isFetching} >{id ? "Modifier" : "Créer"}</Button>
        <Button type="danger" htmlType="button" onClick={onReset} disabled={status && status.isFetching} style={{marginLeft:'8px'}}>Annuler</Button> 
      </Form.Item>
    </Form>
  )
}

export default CreateForm
