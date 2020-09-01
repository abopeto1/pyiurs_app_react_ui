/* Dependencies */
import React from 'react'
import { Row, Col, Typography, Button,DatePicker } from 'antd'
// import { UserAddOutlined } from '@ant-design/icons'
import TableComponent from '../../../Cash/Expence/Table'
import ReadEntities from '../../../../../react-redux/Entity/Read/Entities'

const SellReport = (props) => {
  const { Title } = Typography
  const { RangePicker } = DatePicker
  const [moment,setMoment] = React.useState({value:{date1:null,date2:null},form:{date1:null,date2:null,}})

  return (
    <ReadEntities entityName="expence" params={{reports:true,start:moment.form.date1,end:moment.form.date2}}>
      { expenceProps => (
          <Row>
            <Col span={24} style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
              <Title level={4}>Rapport Dépense</Title>
            </Col>
            <Col span={24} style={{display:"flex", justifyContent:"space-between",alignItems:"center",marginBottom:"8px",}}>
              <RangePicker format="YYYY-MM-DD" style={{flexGrow:1,}} value={[moment.value.date1,moment.value.date2]} onCalendarChange={(d,s) => {
                setMoment({value:{date1:d[0], date2:d[1]},form:{date1:s[0], date2:s[1]}})
              }} />
              <Button type="primary" onClick={() => expenceProps.read()} style={{marginLeft:"16px",}}
                loading={expenceProps.status && expenceProps.status.isFetching}
              >
                Chercher
              </Button>
            </Col>
            <Col span={24}>
              <TableComponent { ...expenceProps } />
            </Col>
          </Row>
        )
      }
    </ReadEntities>
  )
}

export default SellReport
