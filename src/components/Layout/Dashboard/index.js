import React from 'react'
import { Layout, Typography, Row, Col } from 'antd'
import Cards from './Cards'
import YearComparisonChart from './YearComparisonChart'
import BilanDetails from '../Budget/Pnl/BilanDetails'
import {AverageSell} from './AverageSell/AverageSell'
import { CustomerCategory } from './CustomerCategory/CustomerCategory'
import ReadEntities from '../../../react-redux/Entity/Read/Entities'
import ReadEntity from '../../../react-redux/Entity/Read/Entity'
import { transformDateFormat } from '../../../utils'

const Dashboard = (props) => {
  const today = new Date()
  const prevMonth = new Date(today.getFullYear(),today.getMonth()-1,1)
  const yoyDate = new Date(today.getFullYear()-1, today.getMonth(),today.getDate())
  const { Title } = Typography
  
  return (
    <Layout style={{padding:"16px"}}>
      <Layout.Content>
        <Title level={2}>Dashboard</Title>
        <Row gutter={[8,8]}>
          <Col xs={24}>
            <ReadEntity entityName="dashboard" id={3}>
              {
                rest => <AverageSell { ...rest } />
              }
            </ReadEntity>
          </Col>
        </Row>
        <ReadEntities entityName="bill" params={{month:transformDateFormat(yoyDate)}}>
          {
            yoyBills => (
              <ReadEntities entityName="cashin"
                params={{ reports: true, start: transformDateFormat(prevMonth), end: transformDateFormat(today) }}
              >
                {
                  cashProps => (
                    <ReadEntities getCash={cashProps.read} cashs={cashProps.entities}
                      entityName="expence" params={{ month: transformDateFormat(prevMonth) }}
                    >
                      {
                        exProps => (
                          <ReadEntities {...exProps}
                            prevExpences={exProps.entities} getPrevExpences={exProps.read}
                            entityName="expence_compte_category" params={{ month: transformDateFormat(new Date()) }}
                          >
                            {
                              eccProps => (
                                <ReadEntities
                                  {...eccProps} entityName="bill" expenceCompteCategories={eccProps.entities} getEcc={eccProps.read}
                                  params={{ reports: true, start: transformDateFormat(prevMonth), end: transformDateFormat(today) }}
                                >
                                  {
                                    billProps => (
                                      <Cards {...billProps} readBill={billProps.read} bills={billProps.entities} 
                                        billStatus={billProps.status} today={today} prevMonth={prevMonth}
                                        yoyBills={yoyBills} yoyDate={yoyDate}
                                      />
                                    )
                                  }
                                </ReadEntities>
                              )
                            }
                          </ReadEntities>
                        )
                      }
                    </ReadEntities>
                  )
                }
              </ReadEntities>
            )
          }
        </ReadEntities>
        <YearComparisonChart today={today} />
        <Row gutter={[8,8]}>
          <Col xs={24} sm={24} md={12}>
            <ReadEntities entityName="bilan_category" params={{ date: transformDateFormat(new Date()) }}>
              {
                eccProps => <BilanDetails {...eccProps} toUpdate={true} />
              }
            </ReadEntities>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <ReadEntities entityName="customer_category" params={{}}>
              {
                cc => <CustomerCategory { ...cc} />
              }
            </ReadEntities>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  )
}

export default Dashboard
