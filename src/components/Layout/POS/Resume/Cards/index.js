import React, {useEffect} from 'react'
import './index.css'
import { Col, Row, Card, Typography, Button, Spin, message, Input, Form, Grid } from 'antd'
import { transformDateFormat, print } from '../../../../../utils'
import CardComponent from '../Card'
import TableComponent from './TableComponent'
import CreateEntity from '../../../../../react-redux/Entity/Create'
import DeleteEntity from '../../../../../react-redux/Entity/Delete'
import ReadEntities from '../../../../../react-redux/Entity/Read/Entities'

const Cards = ({service, ...props}) => {
  const { read, entities, status, closeHistory, cashProps } = props
  const { Title } = Typography
  const bk = Grid.useBreakpoint()
  
  const style = { textAlign: "center", width: bk['xs'] ? "100%" : "33.3%", }
  
  const [form, setForm] = React.useState({ 
    operator: sessionStorage.id, theoric_cash: 0, theoric_cash_cdf: 0, comment: "", 
  })
  
  useEffect(cashProps.read,[])
  useEffect(read,[])

  const totalCash = cashProps.entities ? cashProps.entities.reduce(
    (a, i) => i.currency === "CDF" ?
      (i.amount / i.taux) + a : i.currency === "EUR" ? (i.amount / i.tauxEuro) + a
        : i.amount + a, 0
  ) : 0

  const totalService = service.entities ?
    service.entities.reduce(
      (a, i) => i.currency === "CDF" ? a + i.amount / sessionStorage.taux : a + i.amount, 0
    ) : 0

  const totalSell = entities ? entities.reduce((a,i) => i.type_paiement.id === 2 ? a + parseFloat(i.accompte) : a + parseFloat(i.net),0) : 0
  const total = totalService + totalSell

  const clotureEntity = closeHistory && closeHistory.find(ch => transformDateFormat(ch.created) === transformDateFormat(new Date()))

  const submit = (cProps) => {
    if(form.comment === ""){
      message.error("Le commentaire est obligatoire")
      return 0
    }
    cProps.create(form,{
      onSuccess: (o) => {
        message.success("Cloture effectué avec succés")
        setForm({ operator: sessionStorage.id, theoric_cash: 0, comment: "", theoric_cash_cdf: 0, })
        print(o.id, 'cloture')
      },
      onFail: () => message.success("Erreur lors de la Cloture")
    })
  }

  const reset = del => {
    del({},{
      onSuccess: (o) => {
        message.success("Journée réouverte")
      },
      onFail: () => message.success("Erreur lors du Reset")
    })
  }

  return (
    <Row gutter={[8,8]}>
      <Col lg={8} md={8} xs={24}>
        <ReadEntities entityName="user" params={{ today: transformDateFormat(new Date()), getBills: true }}>
        {
          userProps => (
            <CardComponent { ...userProps } title="Vente par Vendeur (se)" style={{height:"100%"}} />
          )
        }
        </ReadEntities>
      </Col>
      <Col lg={8} md={8} xs={24}>
      <ReadEntities entityName="type_paiement" params={{ today: transformDateFormat(new Date()), }}>
      {
        tpProps => (
          <CardComponent { ...tpProps } title="Vente Par Paiement" style={{height:"100%"}}  />
        )
      }
      </ReadEntities>
      </Col>
      <Col lg={8} md={8} xs={24}>
        <Card title="Autres Revenus du Jour" style={{justifyContent:"center",height:"100%",}}>
          <TableComponent
            totalCash={totalCash} loading={cashProps.status && cashProps.status.isFetching}
            service={service} totalService={totalService}
          />
        </Card>
      </Col>
      <Col lg={24} xs={24}>
        <Card
          title="Vente Total du Jour" style={{justifyContent:"center",height:"100%",}}
          className={!(bk['xs'] || bk['sm']) ? "grid-card" : ""}
        >
          <Card.Grid style={style}>
            <Title span={4}>{(status && status.isFetching) ? <Spin /> : `${total} $`}</Title>
            <CreateEntity entityName="cloture">
              {
                createProps =>
                  <Button type="primary" onClick={() => submit(createProps)}
                    loading={createProps.status && createProps.status.isFetching}
                    disabled={clotureEntity}
                  >
                    Cloturer
                  </Button>
              }
            </CreateEntity>
            <DeleteEntity entityName="cloture"
              id={clotureEntity && clotureEntity.id}
            >
              {
                deleteClotureProps => (
                  <Button
                    type="danger" style={{ marginLeft: "8px" }} onClick={() => reset(deleteClotureProps.delete)}
                    loading={deleteClotureProps.status && deleteClotureProps.status.isFetching}
                    disabled={!clotureEntity}
                  >
                    Unlock
                  </Button>
                )
              }
            </DeleteEntity>
          </Card.Grid>
          <Card.Grid style={style}>
            <Title level={4}>
              Cash Physique : {(status && status.isFetching) ? <Spin /> : `${total + totalCash} $`}
            </Title>
            <Form.Item label="Cash Théorique" >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Input
                  type="number" placeholder="Cash Théorique $" style={{ textAlign: "left" }}
                  onChange={e => setForm({ ...form, theoric_cash: e.target.value })} value={form.theoric_cash}
                  suffix="$"
                />
                <Input
                  type="number" placeholder="Cash Théorique (CDF)" style={{ textAlign: "left" }}
                  onChange={e => setForm({ ...form, theoric_cash_cdf: e.target.value })} value={form.theoric_cash_cdf}
                  suffix="FC"
                />
              </div>
            </Form.Item>
            <Title level={4}>
              Difference : {`
              ${total + totalCash - form.theoric_cash - parseInt(form.theoric_cash_cdf === 0 ? 0 : form.theoric_cash_cdf/sessionStorage.taux)} 
              $`}
            </Title>
          </Card.Grid>
          <Card.Grid style={style}>
            <Form.Item label="Commentaire">
              <Input.TextArea
                rows={4} onChange={e => setForm({ ...form, comment: e.target.value })} value={form.comment}
              />
            </Form.Item>
          </Card.Grid>
        </Card>
      </Col>
    </Row>
  )
}

export default Cards
