/* Dependencies */
import React from 'react'
import { Tabs } from 'antd'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'
import BilanAccount from './BilanAccount'
import ExpenceAccount from './ExpenceAccount'
import ExpenceAccountCategory from './ExpenceAccountCategory'

export const Manage = (props) => {
  const { TabPane } = Tabs

  return (
    <div style={{padding:'8px'}}>
      <div className="card-container">
        <Tabs type="card">
          <TabPane tab="Comptes P&L" key={1}>
            <ReadEntities entityName="expence_compte" params={{}}>
              {
                rest => <ExpenceAccount { ...rest } />
              }
            </ReadEntities>
          </TabPane>
          <TabPane tab="Categorie de Compte" key="2">
            <ReadEntities entityName="expence_compte_category" params={{}}>
            {
                eccProps => <ExpenceAccountCategory { ...eccProps } />
            }
            </ReadEntities>
          </TabPane>
          <TabPane tab="Compte de revenue" key="3">
            <ReadEntities entityName="bilan_account" params={{}}>
              {
                eccProps => <BilanAccount {...eccProps} />
              }
            </ReadEntities>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}
