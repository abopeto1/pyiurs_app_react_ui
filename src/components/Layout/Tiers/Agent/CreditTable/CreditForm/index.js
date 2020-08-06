import React from 'react'
import { Form, Input, Button, Select, InputNumber, Popconfirm, message, Modal } from 'antd'

const CreateForm = (props) => {
  const { addCredit, setAddCredit, status, create } = props

  const onReset = () => {
    setAddCredit({ ...addCredit, openModal: false })
  }

  const info = (text, type) => {
    if (type === "error") {
      message.error(text)
    } else {
      message.info(text)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (addCredit.form.currency === null) {
      info("La dévise est obligatoire", "error")
    } else if (addCredit.form.currency === "EUR" && (addCredit.form.tauxEuro === null || addCredit.form.tauxEuro <= 0)) {
      info("Veuillez définir le taux euro - dollar actuel", "error")
    } else if (addCredit.form.agent === null) {
      info("Veuillez Choisir un Agent pour la dépense", "error")
    } else {
      create(addCredit.form, {
        onSuccess: () => {
          onReset()
          info("Crédit ajouté avec succés")
        },
        onFail: () => info("Erreur lors de l'ajout du crédit")
      })
    }
  }

  return (
    <Modal title="Ajout Prêt" visible={addCredit.openModal} centered size="small"
      footer={null} onCancel={() => setAddCredit({...addCredit,openModal: false})} closable={false}
    >
      <Form layout="vertical">
        <Form.Item label="Motif">
          <Input
            value={addCredit.form.motif} placeholder="Motif" 
            onChange={e => setAddCredit({ ...addCredit, form:{...addCredit.form, motif: e.target.value} })}
          />
        </Form.Item>
        <Form.Item label="Montant">
          <Input.Group compact>
            <InputNumber
              value={addCredit.form.amount} min={0}
              onChange={val => setAddCredit({ ...addCredit, form: { ...addCredit.form, amount: parseFloat(val)} })}
            />
            <Select
              showSearch placeholder="Dévise"
              onChange={
                val => setAddCredit({
                  ...addCredit,
                  form: {
                    ...addCredit.form, currency: val, tauxEuro: null,
                  }
                })
              }
            >
              {
                ["USD", "CDF", "EUR"].map((d, i) => (
                  <Select.Option key={i} value={d}>{d}</Select.Option>
                ))
              }
            </Select>
            <InputNumber
              value={addCredit.form.tauxEuro}
              min={0} placeholder="Taux Euro"
              disabled={addCredit.form.currency !== "EUR"}
              onChange={
                val => setAddCredit({
                  ...addCredit,
                  form: {
                    ...addCredit.form, tauxEuro: parseFloat(val)
                  } 
                })
              }
            />
          </Input.Group>
        </Form.Item>
        <Form.Item>
          <Popconfirm
            title={`Confirmez-vous l'entrée du crédit de ${addCredit.form.amount} ${addCredit.form.currency}`}
            onConfirm={onSubmit}
          >
            <Button type="primary" htmlType="submit" loading={status && status.isFetching}>
              Créer
          </Button>
          </Popconfirm>
          <Button
            type="danger" htmlType="button" onClick={onReset} disabled={status && status.isFetching}
            style={{ marginLeft: '8px' }}
          >Annuler</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateForm
