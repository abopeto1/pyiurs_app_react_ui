/* Dependencies */
import React from 'react'
import { Row, Col, Typography, Button, Tabs } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import TableComponent from './Table'
import CreditTable from './CreditTable'
import PaidLoanModal from '../../POS/BillToPay/PaidLoanModal'
import CreateForm from './CreateForm'
import ReadSingleEntity from '../../../../react-redux/Entity/Read/Entity'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'
import CreateEntity from '../../../../react-redux/Entity/Create'

export const Agent = (props) => {
  const { Title } = Typography
  const { TabPane } = Tabs
  const [visible, setVisible] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [bill, setBill] = React.useState(null)

  return (
    <Row>
      <Col span={24} style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
        <Title level={2}>Agents</Title>
        <Button type="primary" shape="round" onClick={() => setVisible(true)} icon={<UserAddOutlined />}>
          Créer Agent
        </Button>
      </Col>
      <Col span={24}>
        <div className="card-container">
          <ReadEntities entityName="agent" params={{}}>
            {
              readProps => (
                <Tabs type="card">
                  <TabPane tab="Liste" key={0}>
                    <TableComponent {...readProps} setBill={setBill} setOpen={setOpen} />
                  </TabPane>
                  <TabPane tab="Crédit" key={1}>
                    <CreditTable {...readProps} setBill={setBill} setOpen={setOpen} />
                  </TabPane>
                </Tabs>
              )
            }
          </ReadEntities>
        </div>

      </Col>
      <CreateEntity entityName='agent'>
      {
        agentProps => <CreateForm {...agentProps } setVisible={setVisible} visible={visible}/>
      }
      </CreateEntity>
      <ReadSingleEntity entityName="bill" id={bill}>
        {
          paidBillProps => <PaidLoanModal {...paidBillProps} setBill={setBill} setVisible={setOpen} visible={open} bill={bill} user={props.user} />
        }
      </ReadSingleEntity>
    </Row>
  )
}
