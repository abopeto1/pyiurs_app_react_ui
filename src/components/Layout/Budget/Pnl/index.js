/* Dependencies */
import React from 'react'
import { Tabs, Row, Col } from 'antd'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'
import {ActualMonthPnl} from './ActualMonthPnl'
import BilanDetails from './BilanDetails'
import {HistoryPnl} from './HistoryPnl'
import SelectMonth from './HistoryPnl/SelectMonth'
import { transformDateFormat } from '../../../../utils'

export const Pnl = (props) => {
  const { TabPane } = Tabs
  const [period,setPeriod] = React.useState(`${(new Date()).getFullYear()}-${(new Date()).getMonth()+1}`)

  return (
    <div style={{padding:'8px'}}>
      <div className="card-container">
        <Tabs type="card">
          <TabPane tab="P&L Mois Actuel" key={1}>
            <Row gutter={[8,8]}>
              <Col xs={24} md={12}>
                <ReadEntities entityName="bilan_category" params={{ date: transformDateFormat(new Date()) }}>
                  {
                    eccProps => <BilanDetails {...eccProps} toUpdate={true} />
                  }
                </ReadEntities>
              </Col>
              <Col xs={24} md={12}>
                <ReadEntities entityName="expence_compte_category" params={{ month: transformDateFormat(new Date()) }}>
                  {
                    eccProps => <ActualMonthPnl {...eccProps} />
                  }
                </ReadEntities>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Historique" key="2">
            <ReadEntities entityName="bilan_category" params={{ date: `${period}-01` }}>
              {
                bc => (
                  <ReadEntities entityName="expence_compte_category" params={{ month: `${period}-01` }}>
                    {
                      ecc => (
                        <Row gutter={[8, 8]}>
                          <Col xs={24}>
                            <SelectMonth
                              period={period} setPeriod={setPeriod} eccRead={ecc.read} bcRead={bc.read}
                            />
                          </Col>
                          <Col xs={24}>
                            <Row gutter={[8,8]}>
                              <Col xs={24} md={12}>
                                <BilanDetails { ...bc } />
                              </Col>
                              <Col xs={24} md={12}>
                                <HistoryPnl {...ecc} period={period} />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      )
                    }
                  </ReadEntities>
                )
              }
            </ReadEntities>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}
