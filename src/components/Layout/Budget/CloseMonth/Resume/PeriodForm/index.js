/* Dependencies */
import React from 'react'
import PropTypes from 'prop-types'
import { Form,DatePicker } from 'antd'

const SelectMonth = (props) => {
  const { setPeriod, reload, setReload } = props

  return (
    <Form.Item label="Mois">
      <DatePicker onChange={(date,datestring) => {
        setPeriod(`${datestring}-01`);
        setReload(reload+1)
      }} picker="month" />
    </Form.Item>
  )
}

SelectMonth.propTypes = {
  period: PropTypes.string.isRequired,
  setPeriod: PropTypes.func.isRequired,
}

export default SelectMonth
