/* Dependencies */
import React from 'react';

/* Containers */
import SelectComponent from './SelectComponent'
import ReadEntitiesContainer from '../../../../../../react-redux/Entity/Read/Entities';

const SelectPromotionType = (props) => {
  const { value, setValue } =  props
  return (
    <ReadEntitiesContainer entityName='promotion_type' params={{}}>
      { props => <SelectComponent {...props} setValue={setValue} value={value} /> }
    </ReadEntitiesContainer>
  )
}

export default SelectPromotionType
