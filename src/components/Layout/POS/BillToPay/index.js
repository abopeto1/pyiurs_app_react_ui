/* Dependencies */
import React from 'react'
import { Row, Col, Typography } from 'antd'
import TableComponent from './Table'
import PaidLoanModal from './PaidLoanModal'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'
import ReadSingleEntity from '../../../../react-redux/Entity/Read/Entity'

const BillToPay = (props) => {
  const { Title } = Typography
  const [bill,setBill] = React.useState(null)
  const [visible,setVisible] = React.useState(false)
  
  return (
    <Row>
      <Col span={24} style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
        <Title level={2}>Traqueur Crédit</Title>
      </Col>
      <Col span={24}>
        <ReadEntities entityName="customer" params={{loan:true}}>
          {
            rest => <TableComponent { ...rest } setBill={setBill} setVisible={setVisible} />
          }
        </ReadEntities>
      </Col>
      <ReadSingleEntity entityName="bill" id={bill}>
        {
          paidBillProps => <PaidLoanModal {...paidBillProps} setBill={setBill} setVisible={setVisible} visible={visible} bill={bill} user={props.user} />
        }
      </ReadSingleEntity>
    </Row>
  )
}

export default BillToPay
