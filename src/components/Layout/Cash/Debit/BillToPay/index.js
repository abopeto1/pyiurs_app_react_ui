/* Dependencies */
import React from 'react'
import { Row, Col, Typography, Button, DatePicker } from 'antd'
import TableComponent from './Table'
import PaidLoanModal from './PaidLoanModal'
import ReadEntities from '../../../../../react-redux/Entity/Read/Entities'
import ReadSingleEntity from '../../../../../react-redux/Entity/Read/Entity'

const BillToPay = (props) => {
  const { Title } = Typography
  const [bill,setBill] = React.useState(null)
  const [visible, setVisible] = React.useState(false)
  const { RangePicker } = DatePicker
  const [moment, setMoment] = React.useState({ value: { date1: null, date2: null }, form: { date1: null, date2: null, } })
  
  return (

    <ReadEntities
      entityName="customer" params={{ loan: true, reports: true, start: moment.form.date1, end: moment.form.date2 }}
    >
      {
        rest => (
          <Row>
            <Col span={24} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Title level={2}>Débit Client</Title>
            </Col>
            <Col span={24}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", }}
            >
              <RangePicker format="YYYY-MM-DD" style={{ flexGrow: 1, }} value={[moment.value.date1, moment.value.date2]} onCalendarChange={(d, s) => {
                setMoment({ value: { date1: d[0], date2: d[1] }, form: { date1: s[0], date2: s[1] } })
              }} />
              <Button type="primary" onClick={() => rest.read()} style={{ marginLeft: "16px", }}
                loading={rest.status && rest.status.isFetching}
              >
                Chercher
              </Button>
            </Col>
            <Col span={24}>
              <TableComponent {...rest} setBill={setBill} setVisible={setVisible} />
            </Col>
            <ReadSingleEntity entityName="bill" id={bill}>
              {
                paidBillProps => <PaidLoanModal {...paidBillProps} setBill={setBill} setVisible={setVisible} visible={visible} bill={bill} user={props.user} />
              }
            </ReadSingleEntity>
          </Row>
        )
      }
    </ReadEntities>
  )
}

export default BillToPay
