import React, { useEffect } from 'react'
import { Form, Select } from 'antd'

const ProductDepartment = ({read, status, value, setValue, entities, ...props}) => {
    useEffect(read, [])

    const data = entities ? entities : []

    return (
        <Form.Item>
            <Select
                loading={status && status.isFetching}
                onChange={val => setValue(val)}
                // value={value}
                defaultValue={value}
                defaultActiveFirstOption
            >
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

export default ProductDepartment
