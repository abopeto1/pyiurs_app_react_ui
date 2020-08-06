/* Dependencies */
import React, { useEffect } from 'react'
import { Form,Select,InputNumber } from 'antd'

const SelectComponent = (props) => {
  const { entities,value,setValue,read } = props
  useEffect(read,[])

  const data = entities !== undefined ? entities : []

  return (
    <React.Fragment>
      <Form.Item>
        <Select showSearch placeholder="Choisir le type de la promotion" defaultValue={value.type}
          onChange={val => setValue({...value,type:val,price:null,percent:null})}
        >
        {
          data.map(d => (
            <Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>
          ))
        }
        </Select>
      </Form.Item>
      {
        value.type === 2 ?
        <Form.Item>
          <InputNumber
            defaultValue={value.price}
            formatter={ val => `$ ${val}`.replace(/\B(?=(\d{3})+(?!\d))/g,',')}
            parser={val => val.replace(/\$\s?|(,*)/g,',')}
            onChange={val => setValue({...value,price:parseFloat(val)})}
          />
        </Form.Item> : value.type === 1 ?
        <Form.Item>
          <InputNumber
            defaultValue={value.percent} min={0} max={100}
            formatter={ val => `${val}%`}
            parser={val => val.replace('%','')}
            onChange={val => setValue({...value,percent:parseFloat(val)})}
          />
        </Form.Item> : null
      }
    </React.Fragment>
  )
}

export default SelectComponent
