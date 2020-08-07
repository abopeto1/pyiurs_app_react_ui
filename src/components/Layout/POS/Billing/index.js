/* Dependencies */
import React from 'react'
import { Row, Col, Typography } from 'antd'
import moment from 'moment'
import TableComponent from './Table'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'

const Billing = (props) => {
  const { Title } = Typography
  const [page, setPage] = React.useState(1)

  return (
    <Row>
      <Col span={24} style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
        <Title level={2}>Facturation</Title>
      </Col>
      <Col span={24}>
        <ReadEntities entityName="bill"
          params={{ page: page, created: moment(new Date()).format("YYYY-MM-DD"), }}
        >
          {
            rest => <TableComponent { ...rest } page={page} setPage={setPage} />
          }
        </ReadEntities>
      </Col>
    </Row>
  )
}

export default Billing
