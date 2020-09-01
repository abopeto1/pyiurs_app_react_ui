import React from 'react'
import { Form,Input,Button,Select,DatePicker,InputNumber,message } from 'antd'
import ReadEntities from '../../../../../react-redux/Entity/Read/Entities'
import CreateEntity from '../../../../../react-redux/Entity/Create'
import SelectProvider from './SelectProvider'
import SelectExpenceCompte from './SelectExpenceCompte'

const CreateForm = (props) => {
  const [form,setForm] = React.useState({
    motif:'',taux:1750,currency:null,periode:null,montant:0,expenceCompte:null,provider:null,operator:sessionStorage.id,
  })

  const onReset = () => {
    setForm({motif:'',taux:1750,currency:"",periode:null,montant:0,expenceCompte:null,provider:null,operator:sessionStorage.id,})
    props.setVisible(false)
  }

  const info = (text,type) => {
    if(type === "error"){
      message.error(text)
    } else {
      message.info(text)
    }
  }

  const onSubmit = (create, p) => {
    if(form.motif.length < 3){
      info("Le Motif doit contenir plus de 3 lettres")
    } else if(form.currency === null){
      info("La dévise est obligatoire","error")
    } else if(form.montant < 1) {
      info("Le montant ne doit pas etre nul","error")
    } else if(form.expenceCompte === null) {
      info("Veuillez Choisir un compte pour la dépense","error")
    } else if(form.provider === null) {
      info("Veuillez Choisir un Fournisseur pour la dépense","error")
    } else {
      create(form, {
        onSuccess: (o) => {
          onReset()
          info("Dépense créee avec succés")
        }
      })
    }
  }
  const formItemLayout={ labelCol:{span:4}, wrapperCol: { span: 14 }}

  return (
    <Form { ...formItemLayout } layout="vertical">
      <Form.Item label="Nom du compte">
        <ReadEntities entityName="expence_compte" params={{}}>
          { expenceCompteProps => <SelectExpenceCompte { ... expenceCompteProps } form={form} setForm={setForm} />}
        </ReadEntities>
      </Form.Item>
      <Form.Item label="Motif">
        <Input
          placeholder='Motif' name='motif' value={form.motif} autoComplete="off"
          onChange={e => setForm({...form,motif:e.target.value})}
        />
      </Form.Item>
      <Form.Item label="Période">
        <DatePicker onChange={(date,datestring) => setForm({...form, periode:datestring})} picker="month" />
      </Form.Item>
      <Form.Item label="Fournisseur">
        <ReadEntities entityName="provider" params={{}}>
          { providerProps => <SelectProvider { ... providerProps } form={form} setForm={setForm} />}
        </ReadEntities>
      </Form.Item>
      <Form.Item label="Montant">
        <Input.Group compact>
          <InputNumber
            value={form.montant} min={0}
            // defaultValue={1}
            // formatter={ val => `$ ${val}`.replace(/\B(?=(\d{3})+(?!\d))/g,',')}
            // parser={val => val.replace(/\$\s?|(,*)/g,',')}
            onChange={val => setForm({...form,montant:parseFloat(val)})}
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
      <Form.Item>
        <CreateEntity entityName="expence">
        {
          expenceProps => (
            <div>
              <Button type="primary" htmlType="submit"
                onClick={() => onSubmit(expenceProps.create,expenceProps)} loading={expenceProps.status && expenceProps.status.isFetching}
              >
                Créer
              </Button>
              <Button type="danger" htmlType="button"
                onClick={onReset} disabled={expenceProps.status && expenceProps.status.isFetching} style={{marginLeft:'8px'}}
              >
                Annuler
              </Button>
            </div>
          )
        }
        </CreateEntity>
      </Form.Item>
    </Form>
  )
}

export default CreateForm
