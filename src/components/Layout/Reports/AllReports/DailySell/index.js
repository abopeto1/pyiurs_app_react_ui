import React from 'react'
import { Row, Col, DatePicker, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import TableComponent from './TableComponent'
import ReadEntities from '../../../../../react-redux/Entity/Read/Entities'

const Resume = (props) => {
  const { RangePicker } = DatePicker
  const [moment,setMoment] = React.useState({value:{date1:null,date2:null},form:{date1:null,date2:null,}})

  return (
    <ReadEntities entityName="cloture" params={{reports:true,start:moment.form.date1,end:moment.form.date2}}>
      {
        closeProps => (
          <Row>
            <Col span={24} style={{display:"flex", justifyContent:"space-between",alignItems:"center",marginBottom:"8px",}}>
              <RangePicker format="YYYY-MM-DD" style={{flexGrow:1,}} value={[moment.value.date1,moment.value.date2]} onCalendarChange={(d,s) => {
                setMoment({value:{date1:d[0], date2:d[1]},form:{date1:s[0], date2:s[1]}})
              }} />
              <Button type="primary" onClick={() => closeProps.read()} style={{marginLeft:"16px",}}
                loading={closeProps.status && closeProps.status.isFetching} icon={<SearchOutlined />}
              >
                Chercher
              </Button>
            </Col>
            <Col span={24} style={{marginTop:"16px"}}>
              <TableComponent { ...closeProps } />
            </Col>
          </Row>
        )
      }
    </ReadEntities>
  )
}

export default Resume
