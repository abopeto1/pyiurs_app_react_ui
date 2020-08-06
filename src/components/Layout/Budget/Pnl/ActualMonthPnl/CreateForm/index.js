import React from 'react'
import { Form,InputNumber,Button,Modal,message } from 'antd'
import CreateEntity from '../../../../../../react-redux/Entity/Create'
import UpdateEntity from '../../../../../../react-redux/Entity/Update'

const CreateForm = (props) => {
  const { status, setVisible, visible,form, setForm, select } = props

  const onReset = () => {
    setForm({month:(new Date()).getMonth()+1, year:(new Date()).getFullYear(), expence_account:null,value:null})
    setVisible(false)
  }

  const onSubmit = (updateEntity,createEntity) => {
    if(form.value === select.budget ){
      message.info("Aucune Modification")
    } else if(select.budgets !== undefined) {
      updateEntity(form, {
        onSuccess: (o) => {
          onReset()
          message.success("Budget ajouté avec succés")
        },
        onFail: () => message.error("Erreur lors de la création du crédit")
      })
    } else {
      createEntity(form, {
        onSuccess: (o) => {
          onReset()
          message.success("Budget ajouté avec succés")
        },
        onFail: () => message.error("Erreur lors de la création du crédit")
      })
    }
  }

  return (
    <UpdateEntity entityName="budget" id={select.budgets && select.budgets.id}>
      {
        uProps => (
          <CreateEntity entityName="budget" parentName="expence_compte" parentId={form.expence_account}>
          {
            cProps => (
              <Modal title={`Budget: ${select.name}`} visible={visible} centered
                footer={null} onCancel={() => setVisible(false)} closable={false}
              >
                <Form onFinish={() => onSubmit(uProps.update,cProps.create)}>
                  <Form.Item label="Montant ($)">
                    <InputNumber
                      value={form.value} min={0} style={{width: "-webkit-fill-available",}} type="number"
                      onChange={val => setForm({...form,value:parseFloat(val)})}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={cProps.status && cProps.status.isFetching}>Confirmer</Button>
                    <Button type="danger" htmlType="button" onClick={onReset} disabled={status && status.isFetching} style={{marginLeft:'8px'}}>Annuler</Button>
                  </Form.Item>
                </Form>
              </Modal>
            )
          }
          </CreateEntity>
        )
      }
    </UpdateEntity>
  )
}

export default CreateForm
