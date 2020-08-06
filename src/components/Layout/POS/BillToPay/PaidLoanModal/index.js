/* Dependencies */
import React, { useEffect, useState } from 'react'
import { Form,Button,Modal,Input,Col,message } from 'antd'
import CreateEntity from '../../../../../react-redux/Entity/Create'
import { print } from '../../../../../utils'

const PaidLoanModal = (props) => {
  const { entity, read, visible, setVisible, bill, status } = props
  const [cart,setCart] = useState({
    total: 0, taxe: 0, net: 0, accompte: 0, reste: 0, clerk: "Admin",
    customer: entity && entity.customer && entity.customer.id,typePaiement:3,
    bill_reference:entity && entity.id, billDetails:[], operator: parseInt(sessionStorage.getItem('id')),
  })
  console.log(props);
  
  useEffect(read,[bill])

  const onReset = () => {
    setVisible(false)
    setCart({
      total: 0, taxe: 0, net: 0, accompte: 0, reste: 0, clerk: "Admin", customer: entity && entity.customer && entity.customer.id,typePaiement:3,
      bill_reference: entity ? entity.id : null, billDetails: [], operator: parseInt(sessionStorage.id),
    })
  }

  const submit = (create) => {
    if(cart.customer === undefined){
      message.error("Erreur: Pas de Client dans la Facture")
    } else if(cart.bill_reference === undefined) {
      message.error("Erreur: Pas de Facture reference")
    } else if (!cart.net || cart.net === 0) {
      message.error("Erreur: Entrer le montant à payer")
    }  else {
      create(cart, {
        onSuccess: (o) => {
          message.success("Paiement effectué avec succés")
          print(o.id, 'bill')
          onReset()
        },
        onFail: (error) => {
          console.log(error)
          message.error("Erreur lors du Paiement")
        }
      })
    }
  }

  return (
    <Modal title="Entrée Cash" visible={visible} centered loading={status && status.isFetching}
      footer={null} onCancel={() => setVisible(false)} closable={false}>
      <Form>
        <Form.Item label="Total">
          <Input value={entity && entity.net} />
        </Form.Item>
        <Form.Item label="Accompte">
          <Input value={entity && entity.accompte} />
        </Form.Item>
        <Form.Item label="Reste">
          <Input value={entity && entity.reste} />
        </Form.Item>
        <Form.Item label="Montant à payer">
          <Input type="number" value={cart.net}
            onChange={
              (e) => setCart({
                ...cart, net: parseFloat(e.target.value),
                customer: entity && entity.customer && entity.customer.id,
                bill_reference: entity && entity.id,
              })
            }
            />
        </Form.Item>
        <Col span={24} style={{marginTop:"16px"}}>
          <CreateEntity entityName="bill">
            {
              createBillProps =>
              (
                <div>
                  <Button type="primary" onClick={() => submit(createBillProps.create)}
                    loading={createBillProps.status && createBillProps.status.isFetching}
                  >
                    Confirmer Vente
                  </Button>
                  <Button type="danger" onClick={() => onReset()}
                    disabled={createBillProps.status && createBillProps.status.isFetching} style={{marginLeft:'8px'}}
                  >
                    Annuler
                  </Button>
                </div>
              )
            }
          </CreateEntity>
        </Col>
      </Form>
    </Modal>
  )
}

export default PaidLoanModal
