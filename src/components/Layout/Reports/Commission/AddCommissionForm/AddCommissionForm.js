import React from 'react'
import { Form,Button,DatePicker,InputNumber,message, Modal } from 'antd'
import CreateEntity from '../../../../../react-redux/Entity/Create'
import { SelectForm } from '../../../../../utils/SelectForm'

export const AddCommissionForm = (props) => {
  const [visible, setVisible] = React.useState(false)
  const [form,setForm] = React.useState({
    month: null, seller: null, amount: 0,
  })

  const onReset = () => {
    setForm({
        month: null, seller: null, amount: 0,
    })

    setVisible(false)
  }

  const onSubmit = (create, p) => {
    if(form.amount <= 0){
      message.error("L'Objectif de la Commission ne peut pas être nul")
      return
    }
    if(!form.seller){
        message.error("Veuillez choisir un agent")
        return
    }
    if(!form.month) {
        message.error("Veuillez choisir le mois")
        return
    }

    create(form, {
    onSuccess: () => {
        onReset()
        message.success("Dépense créee avec succés")
    }
    })
  }

  const formItemLayout={ labelCol:{span:4}, wrapperCol: { span: 14 }}

  return (
    <>
      <Button type="primary" onClick={() => setVisible(!visible)}>Fixer une Commission</Button>
      <Modal visible={visible} onCancel={() => setVisible(!visible)}>
        <Form { ...formItemLayout } layout="vertical">
          <Form.Item label="Agent">
            <SelectForm
              entityName="agent"
              onChange={agentId => setForm({ ...form, seller: `/api/agents/${agentId}`})}
            />
          </Form.Item>
          <Form.Item label="Mois">
            <DatePicker
              onChange={(date,datestring) => setForm({...form, periode:datestring})}
              picker="month"
            />
          </Form.Item>
          <Form.Item label="Montant (Objectif)">
              <InputNumber
                value={form.montant} min={0}
                // defaultValue={1}
                // formatter={ val => `$ ${val}`.replace(/\B(?=(\d{3})+(?!\d))/g,',')}
                // parser={val => val.replace(/\$\s?|(,*)/g,',')}
                onChange={val => setForm({...form,montant:parseFloat(val)})}
              />
          </Form.Item>
          <Form.Item>
            <CreateEntity entityName="commission">
            {
              createProps => (
                <div>
                  <Button type="primary" htmlType="submit"
                    onClick={() => onSubmit(createProps.create,createProps)}
                    loading={createProps.status && createProps.status.isFetching}
                  >
                    Créer
                  </Button>
                  <Button type="danger" htmlType="button"
                    onClick={onReset}
                    disabled={createProps.status && createProps.status.isFetching}
                    style={{marginLeft:'8px'}}
                  >
                    Annuler
                  </Button>
                </div>
              )
            }
            </CreateEntity>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

