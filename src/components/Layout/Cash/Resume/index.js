import React from 'react'
import { Row, Col,Card,Typography } from 'antd'
import Cards from './Cards'
import moment from 'moment'

const Resume = (props) => {
  const { Title } = Typography
  const { cashins, credits, entitiesBill, expences, debitProps, service } = props

  const cashinTotal = cashins ? cashins.reduce((acc,item) => {
    return item.currency === "CDF" ? acc + (parseFloat(item.amount)/parseFloat(item.taux)) : acc + parseFloat(item.amount)
  },0) : 0

  const creditTotal = credits ? credits.filter(
      d => (d.type === "bank" || d.type === "divers")&& moment(d.created).format('YYYYMM') === moment(new Date()).format('YYYYMM')
    ).reduce((acc,item) => {
    return item.currency === "CDF" ? acc + (parseFloat(item.amount)/parseFloat(item.taux)) :
      item.currency === "EUR" ? acc + (parseFloat(item.amount)*parseFloat(item.tauxEuro)) : acc + parseFloat(item.amount)
  },0) : 0

  const sellsTotal = entitiesBill ? entitiesBill.reduce((acc,item) => {
    return item.type_paiement.id === 2 ? acc+parseFloat(item.accompte) : acc+parseFloat(item.net)
  },0) : 0

  const expencesTotal = expences ? expences.filter(e => e.statut).reduce((acc,item) => {
    return item.currency === "CDF" ? acc + (parseFloat(item.montant)/parseFloat(item.taux)) : acc + parseFloat(item.montant)
  },0) : 0
  
  const debitTotal = debitProps.entities ? debitProps.entities.reduce((a,i) => {
    return i.currency === "CDF" ? a + (parseInt(i.amount)/parseInt(i.taux ?? sessionStorage.taux)) : a + parseInt(i.amount)
  },0) : 0

  const totalService = service.entities ? service.entities.reduce((a, i) => {
    return i.currency === "CDF" ? a + (parseInt(i.amount) / parseInt(sessionStorage.taux)) : a + parseInt(i.amount)
  }, 0) : 0

  return (
    <Row>
      <Col span={24}>
        <Cards { ...props } />
      </Col>
      <Col span={24} style={{marginTop:"16px"}}>
        <Card title="Cash Théorique">
          <Title span={4} style={{justifyContent:"center"}}>{ (sellsTotal + creditTotal + cashinTotal + totalService - expencesTotal - debitTotal).toFixed(1) } $</Title>
        </Card>
      </Col>
    </Row>
  )
}

export default Resume
