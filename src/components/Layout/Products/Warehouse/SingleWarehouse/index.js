/* Dependencies */
import React from 'react'
// import { useParams } from 'react-router-dom'

/* Containers */
import TableComponent from './TableComponent'
import ReadSingleEntityContainer from '../../../../../react-redux/Entity/Read/Entity'

const SingleWarehouse = (props) => {
  const { id } = props
  return (
    <ReadSingleEntityContainer entityName='warehouse' id={id}>
      { props => <TableComponent {...props} /> }
    </ReadSingleEntityContainer>
  )
}

export default SingleWarehouse
