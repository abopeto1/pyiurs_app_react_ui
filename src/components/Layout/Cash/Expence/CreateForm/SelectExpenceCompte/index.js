import React, { useEffect } from 'react'
import { Select } from 'antd'

const SelectExpenceCompte = (props) => {
  const { form, setForm, status, entities, read } = props
  useEffect(read,[])

  return (
    <Select showSearch placeholder="Compte" onChange={val => setForm({...form,expenceCompte:val,})} loading={status && status.isFetching}>
    {
      entities && entities.filter(d => d.id !== 2 && d.id !== 1).map(d => (
        <Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>
      ))
    }
    </Select>
  )
}

export default SelectExpenceCompte
