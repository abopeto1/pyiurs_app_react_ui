import React, {useEffect} from 'react'
import { Col,Row,Card,Table,Typography } from 'antd'
import { transformDate } from './transformData'
import moment from 'moment'

const Cards = (props) => {
  const {
    readBill, entitiesBill, statusBill, getExpences, expences, expencesStatus,
    getCashin, cashins, cashinsStatus, getCredits, credits, creditsStatus, debitProps, service } = props

  const loading = statusBill && statusBill.isFetching
  const { Text } = Typography

  useEffect(readBill,[])
  useEffect(getExpences,[])
  useEffect(getCashin,[])
  useEffect(getCredits,[])
  useEffect(debitProps.read,[])
  useEffect(service.read, [])

  const debits = debitProps.entities ?? []

  const columns = [
    {
      title:"Label", dataIndex:"label", render: text => <Text strong>{text}</Text>,
    },
    {
      title:"value", dataIndex:"value",
    },
  ]

  const sellData = [
    {
      key:'1',label:'Vente du jour',
      value: `${(entitiesBill ? entitiesBill.filter(d => transformDate(d.created) === transformDate(new Date())).reduce(
        (acc,item) => item.type_paiement.id === 2 ? acc+parseFloat(item.accompte) : acc+parseFloat(item.net),0
      ) : 0)} $`
    },
    {
      key:'2',label:'PAT',
      value: `${entitiesBill ? entitiesBill.filter(d => transformDate(d.created) === transformDate(new Date())).reduce(
        (acc,item) => {
          return item.bill_details.reduce((a,i) => i.product ? parseInt(i.product.pu)+parseInt(i.product.caa) + a : a,0) + acc
        } ,0) : 0} $`
    },
    {
      key: '4', label: 'Entrée Cash du Jour',
      value: `${
        cashins ? cashins.filter(d => transformDate(d.created) === transformDate(new Date())).reduce(
          (acc, item) => item.currency === "CDF" ? acc + (parseInt(item.amount) / parseInt(item.taux)) : acc + parseInt(item.amount), 0) : 0} $`
    },
    {
      key:'3',label:'Total Vente Mois(J-1)',
      value: `${entitiesBill ? ((entitiesBill.filter(d => parseInt(transformDate(d.created)) < parseInt(transformDate(new Date())))).reduce(
        (acc,item) => item.type_paiement.id === 2 ? acc+parseFloat(item.accompte) : acc+parseFloat(item.net),0
      )).toFixed(0) : 0} $`
    },
    {
      key: 5, label: 'Total Service (Mois)',
      value: `${(service.entities ? service.entities.reduce(
        (acc, item) => item.currency === "CDF" ? acc + (parseFloat(item.amount) / parseInt(sessionStorage.taux)) :
           acc + parseFloat(item.amount), 0
      ) : 0).toFixed(0)} $`
    },
  ]

  const expenceData = [
    {
      key:'1',label:'Dépense du jour',
      value: `${(expences ? expences.filter(
          d => transformDate(d.created) === transformDate(new Date()) && d.statut
        ).reduce(
        (acc,item) => item.currency === "CDF" ? acc + (parseFloat(item.montant)/parseFloat(item.taux)) : acc + parseFloat(item.montant),0
      ) : 0).toFixed(1)} $`
    },
    {
      key:'2',label:'Dépense Total du Mois (J-1)',
      value: `${(expences ? expences.filter(
          d => parseInt(transformDate(d.created)) < parseInt(transformDate(new Date())) && d.statut
        ).reduce(
        (acc,item) => item.currency === "CDF" ? acc + (parseFloat(item.montant)/parseFloat(item.taux)) : acc + parseFloat(item.montant),0
      ) : 0).toFixed(0)} $`
    },
    {
      key: 3, label: 'Débit Divers (Mois)',
      value: `${(debits ? debits.reduce(
        (acc, item) => item.currency === "CDF" ? acc + (parseFloat(item.amount) / parseInt(item.taux ?? sessionStorage.taux)) :
          item.currency === "EUR" ? acc + (parseFloat(item.amount) * parseFloat(item.taux)) : acc + parseFloat(item.amount), 0
      ) : 0).toFixed(0)} $`
    },
  ]

  const cashData = [
    {
      key:'1',label:'Entrée Cash (Mois)',
      value: `${(cashins ? cashins.reduce(
        (acc, item) => item.currency === "CDF" ? acc + (parseInt(item.amount) / parseInt(item.taux)) : acc + parseInt(item.amount),0
      ) : 0).toFixed(1)} $`
    },
    {
      key:'2',label:'Cash Divers',
      value: `${(credits ? credits.filter(d => d.type === "divers" && transformDate(d.created) === transformDate(new Date())).reduce(
        (acc,item) => item.currency === "CDF" ? acc + (parseFloat(item.amount)/parseFloat(item.taux)) :
        item.currency === "EUR" ? acc + (parseFloat(item.amount)*parseFloat(item.tauxEuro)) : acc + parseFloat(item.amount),0
      ) : 0).toFixed(0)} $`
    },
    {
      key:'3',label:'Cash Bancaire',
      value: `${(credits ? credits.filter(
        d => d.type === "bank" && moment(d.created).format('YYYYMM') === moment(new Date()).format('YYYYMM')).reduce(
        (acc,item) => item.currency === "CDF" ? acc + (parseFloat(item.amount)/parseFloat(item.taux)) :
        item.currency === "EUR" ? acc + (parseFloat(item.amount)*parseFloat(item.tauxEuro)) : acc + parseFloat(item.amount),0
      ) : 0).toFixed(0)} $`
    },
    {
      key: '4', label: 'Débit Divers',
      value: `${(debits ? debits.filter(d => transformDate(d.created) === transformDate(new Date())).reduce(
        (acc, item) => item.currency === "CDF" ? acc + (parseFloat(item.amount) / parseInt(item.taux ?? sessionStorage.taux)) :
          item.currency === "EUR" ? acc + (parseFloat(item.amount) * parseFloat(item.taux)) : acc + parseFloat(item.amount), 0
      ) : 0).toFixed(0)} $`
    },
  ]

  return (
    <Row gutter={[8,8]}>
      <Col lg={8} sm={24}>
        <Card title="Vente">
          <Table
            columns = {columns}
            dataSource={sellData}
            loading={loading}
            showHeader={false}
            size="small"
            pagination={false}
          />
        </Card>
      </Col>
      <Col lg={8} sm={24}>
        <Card title="Dépenses">
          <Table
            columns = {columns}
            dataSource={expenceData}
            loading={expencesStatus && expencesStatus.isFetching}
            showHeader={false}
            size="small"
            pagination={false}
          />
        </Card>
      </Col>
      <Col lg={8} sm={24}>
        <Card title="Prévisions">
          <Table
            columns = {columns}
            dataSource={cashData}
            loading={cashinsStatus && cashinsStatus.isFetching && creditsStatus && creditsStatus.isFetching}
            showHeader={false}
            size="small"
            pagination={false}
          />
        </Card>
      </Col>
    </Row>
  )
}

export default Cards
