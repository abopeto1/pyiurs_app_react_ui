/* Dependencies */
import React from 'react';

/* Containers */
import TableComponent from './TableComponent'
import ReadEntitiesContainer from '../../../../../react-redux/Entity/Read/Entities';

const PromotionTable = () => (
  <ReadEntitiesContainer entityName='promotion' params={{}}>
    { props => <TableComponent {...props} /> }
  </ReadEntitiesContainer>
);

export default PromotionTable
