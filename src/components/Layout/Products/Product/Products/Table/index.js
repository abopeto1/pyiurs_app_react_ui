/* Dependencies */
import React from 'react';

/* Containers */
import TableComponent from './TableComponent'
import ReadEntitiesContainer from '../../../../../../react-redux/Entity/Read/Entities';

const ProductTable = () => (
  <ReadEntitiesContainer entityName='product' params={{stock:true}}>
    { props => <TableComponent {...props} /> }
  </ReadEntitiesContainer>
);

export default ProductTable
