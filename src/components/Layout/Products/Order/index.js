import React from 'react'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'
import Table from './Table'

export const Order = () => {
  return (
    <div style={{padding:"8px"}}>
      <ReadEntities entityName="order" params={{}}>
        { props => <Table { ...props } /> }
      </ReadEntities>
    </div>
  )
}
