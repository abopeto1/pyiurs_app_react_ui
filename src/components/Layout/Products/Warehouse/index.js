import React from 'react'
import WarehouseTable from './Table'
import SingleWarehouse from './SingleWarehouse'
import { useParams } from 'react-router-dom'

export const WarehouseDetails = (props) => {
  const {id} = useParams()

  return (
    <SingleWarehouse { ...props } id={id} />
  )
}

export const Warehouse = (props) => {
  return (
    <div>
      <WarehouseTable { ...props} />
    </div>
  )
}
