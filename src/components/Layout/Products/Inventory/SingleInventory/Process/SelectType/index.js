import React, {useEffect} from 'react'
import { Select } from 'antd'

const SelectType = props => {
    const { read, entities, setTypes } = props
    const data = entities ?? []

    useEffect(read,[])

    const handleChange = value => {
        setTypes(value)
    }

    return (
        <Select 
            mode="multiple" style={{width:"100%"}} placeholder="Selectionner le(s) type(s)"
            defaultValue={[]} onChange={handleChange}
        >
            {
                data.map(d => <Select.Option key={d.id}>{d.name}</Select.Option>)
            }
        </Select>
    )
}

export default SelectType