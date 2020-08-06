import React from 'react'
import ProductDepartmentSelect from './ProductDepartment'
import Entities from '../../../../../../react-redux/Entity/Read/Entities'

export const ProductDepartment = (props) => {
  return (
    <Entities { ...props} entityName={props.entityName} params={{ api: true, page: 1, }}>
      {
        rest => <ProductDepartmentSelect { ...rest } />
      }
    </Entities>
  )
}
