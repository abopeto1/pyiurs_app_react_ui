import React from 'react'
import { SelectForm as Select } from './SelectForm'
import Entities from '../../react-redux/Entity/Read/Entities'

export const SelectForm = ({entityName, onChange, ...props}) => {
    return (
        <Entities entityName={entityName} params={{api: true, pager: 1,}}>
            {
                rest => <Select { ...rest } onChange={onChange} value={props.value} setValue={props.setValue} />
            }
        </Entities>
    )
}