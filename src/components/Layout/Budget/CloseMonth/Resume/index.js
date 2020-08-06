import React,{ useEffect } from 'react'
import { Row, Col,Typography,Button,message,Tag,Space } from 'antd'
import { LockOutlined, CheckOutlined } from '@ant-design/icons'
import { baseUrl } from '../../../../../redux/services/api'
import { transformDateFormat } from '../../../../../utils'
import PeriodForm from './PeriodForm'
import { Resume as Dash } from './Resume/Resume'
import CreateEntity from '../../../../../react-redux/Entity/Create'

const Resume = ({closeMonthHistory,getHistory,...props}) => {
  const { Title } = Typography
  const [period,setPeriod] = React.useState(`${transformDateFormat(new Date(),'Y-m')}-01`)
  const [reload,setReload] = React.useState(0)
  const form = {month:(period.split('-'))[1], year:(period.split('-'))[0], operator: sessionStorage.id }

  useEffect(getHistory,[])

  const close = p => {
    if(parseInt(transformDateFormat(new Date(),'Ym')) <= parseInt(transformDateFormat(period,'Ym'))){
      message.success("Le mois n'est pas encore terminé pour être cloturé")
    } else {
      p.create(form,{
        onSuccess: o => {
          message.success("Mois cloturé avec succés")
          window.open(`${baseUrl}/${p.entityName}/pdf/${o.id}`)
        }
      })
    }
  }

  return (
    <React.Fragment>
      <Row gutter={[8,8]}>
        <Col span={12}>
          <Title level={3}>Cloture Mois</Title>
        </Col>
        <Col span={12}>
          <div style={{display:"flex",width:"100%",justifyContent:"flex-end"}}>
          {
            closeMonthHistory && closeMonthHistory.find(d => d.month === (period.split('-'))[1] && d.year === (period.split('-'))[0]) ? (
              <Tag type="primary" ><Space><CheckOutlined />Cloturé</Space></Tag>
            ) : (
              <CreateEntity entityName="cloture_month" parentName="user" parentId={sessionStorage.id}>
                {
                  ceProps => <Button type="primary" icon={<LockOutlined />} onClick={() => close(ceProps)}
                  loading={ceProps.status && ceProps.status.isFetching}>
                    Cloturer
                  </Button>
                }
              </CreateEntity>
            )
          }
          </div>
        </Col>
      </Row>
      
      <Row gutter={[8,8]}>
        <Col span={24}>
          <PeriodForm period={period} setPeriod={setPeriod} reload={reload} setReload={setReload} />
        </Col>
      </Row>
      
      <Row gutter={[8, 8]}>
        <Dash reload={reload} month={period} />
      </Row>
    </React.Fragment>
  )
}

export default Resume
