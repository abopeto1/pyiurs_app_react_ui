import React from 'react'
import { Form,InputNumber,Button,Modal,message } from 'antd'
import CreateEntity from '../../../../../../react-redux/Entity/Create'
import UpdateEntity from '../../../../../../react-redux/Entity/Update'

const CreateForm = (props) => {
  const { status, setVisible, visible,form, setForm, select } = props
  
  const onReset = () => {
    setForm({
      month:(new Date()).getMonth()+1,
      year:(new Date()).getFullYear(),
      bilan_account:null,
      value:null
    })
    setVisible(false)
  }

  const onSubmit = (updateEntity,createEntity) => {
    if(form.value === select.budget ){
      message.info("Aucune Modification")
    } else if (select.bilan_budgets !== undefined) {
      updateEntity(form, {
        onSuccess: (o) => {
          onReset()
          message.success("Budget ajouté avec succés")
        },
        onFail: () => message.error("Erreur lors de la création du Budget")
      })
    } else {
      createEntity(form, {
        onSuccess: (o) => {
          onReset()
          message.success("Budget ajouté avec succés")
        },
        onFail: () => message.error("Erreur lors de la création du Budget")
      })
    }
  }

  return (
    <UpdateEntity entityName="bilan_budget" id={select.bilan_budgets && select.bilan_budgets.id}>
      {
        uProps => (
          <CreateEntity entityName="bilan_budget" parentName="bilan_account" parentId={form.bilan_account}>
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
                    <Button type="primary" htmlType="submit" 
                      loading={(cProps.status && cProps.status.isFetching) || (uProps.status && uProps.status.isFetching)}
                    >Confirmer</Button>
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
