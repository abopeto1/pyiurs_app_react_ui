/* Dependencies */
import React from 'react';

/* Containers */
import { WarehouseTable as TableComponent } from './WarehouseTable'
import ReadEntitiesContainer from '../../../../../react-redux/Entity/Read/Entities'

const WarehouseTable = () => (
  <ReadEntitiesContainer entityName='warehouse' params={{}}>
    { props => <TableComponent {...props} /> }
  </ReadEntitiesContainer>
);

export default WarehouseTable
