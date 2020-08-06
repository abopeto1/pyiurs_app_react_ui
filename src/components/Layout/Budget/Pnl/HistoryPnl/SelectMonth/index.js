/* Dependencies */
import React from 'react'
import PropTypes from 'prop-types'
import { Space,Button,Form,DatePicker } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const SelectMonth = (props) => {
  const { setPeriod, status, eccRead, bcRead } = props

  return (
    <Form.Item label="Mois">
      <Space>
        <DatePicker onChange={(date,datestring) => setPeriod(datestring)} picker="month" />
        <Button type="primary" icon={<SearchOutlined />} onClick={() => {
            eccRead()
            bcRead()
          }} loading={status && status.isFetching}
        >
          Recherche
        </Button>
      </Space>
    </Form.Item>
  )
}

SelectMonth.propTypes = {
  period: PropTypes.string.isRequired,
  setPeriod: PropTypes.func.isRequired,
  status: PropTypes.object,
}

export default SelectMonth
