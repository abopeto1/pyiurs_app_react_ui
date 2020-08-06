import React, { useEffect } from 'react'
import { Select } from 'antd'

const SelectProvider = (props) => {
  const { form, setForm, status, entities, read } = props
  useEffect(read,[])

  return (
    <Select showSearch placeholder="Fournisseur" onChange={val => setForm({...form,provider:val,})} loading={status && status.isFetching}>
    {
      entities && entities.map(d => (
        <Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>
      ))
    }
    </Select>
  )
}

export default SelectProvider
