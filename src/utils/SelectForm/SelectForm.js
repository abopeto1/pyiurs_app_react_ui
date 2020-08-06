import React, { useEffect } from 'react'
import { Select, Form } from 'antd'

export const SelectForm = ({ read, status, entities, onChange, ...props }) => {
    useEffect(read,[])

    const data = entities ? entities : []

    return (
        <Form.Item>
            <Select value={props.value} onChange={val => props.setValue(val)}>
                {
                    data.map(d => (
                        <Select.Option key={d.id} value={d.id}>
                            {d.name}
                        </Select.Option>
                    ))
                }
            </Select>
        </Form.Item>
    )
}