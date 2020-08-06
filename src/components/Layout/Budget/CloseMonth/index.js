/* Dependencies */
import React from 'react'
import { Tabs } from 'antd'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'
import Resume from './Resume'
import History from './History'

export const CloseMonth = () => {
  const { TabPane } = Tabs

  return (
    <ReadEntities entityName="cloture_month" params={{}}>
    {
      props => (
        <div style={{padding:'8px'}}>
          <div className="card-container">
            <Tabs type="card">
              <TabPane tab="Cloture Mois" key={1}>
                <Resume closeMonthHistory={props.entities} getHistory={props.read} {...props} />
              </TabPane>
              <TabPane tab="Historique" key="2">
                <History {...props} />
              </TabPane>
            </Tabs>
          </div>
        </div>
      )
    }
    </ReadEntities>
  )
}
