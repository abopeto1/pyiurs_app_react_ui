/* Dependencies */
import React from 'react'
import { Row, Col, Typography, Button, Tabs } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import TableComponent from './Table'
import Reports from './Reports'
import CreateForm from './CreateForm'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'
import CreateEntity from '../../../../react-redux/Entity/Create'
import { transformDateFormat } from '../../../../utils'

export const Customer = (props) => {
  const { Title } = Typography
  const { TabPane } = Tabs
  const [visible, setVisible] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const [filter,setFilter] = React.useState("created")
  const [dateFilter, setDateFilter] = React.useState({
    start: transformDateFormat(new Date()), end: transformDateFormat(new Date())
  })

  return (
    <Row>
      <Col span={24} style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
        <Title level={2}>Clients</Title>
        <Button type="primary" shape="round" onClick={() => setVisible(true)} icon={<UserAddOutlined />}>Ajouter Client</Button>
      </Col>
      <Col span={24}>
        <div className="card-container">
          <Tabs type="card">
            <TabPane tab="Liste" key={0}>
              <ReadEntities entityName="customer" params={{ api:true, page: page, }}>
                {
                  readProps => <TableComponent {...readProps} page={page} setPage={setPage} />
                }
              </ReadEntities>
            </TabPane>
            <TabPane tab="Statistiques" key={1}>
              <ReadEntities entityName="customer" params={{
                  start:dateFilter.start, end: dateFilter.end, filter:filter, reports:true,
                }}
              >
                {
                  reportsProps => (
                    <Reports
                      {...reportsProps} setDateFilter={setDateFilter} dateFilter={dateFilter} filter={filter}
                      setFilter={setFilter}
                    />
                  )
                }
              </ReadEntities>
            </TabPane>
          </Tabs>
        </div>

      </Col>
      <CreateEntity entityName='customer'>
      {
        customerProps => <CreateForm { ...customerProps } setVisible={setVisible} visible={visible}/>
      }
      </CreateEntity>
    </Row>
  )
}
