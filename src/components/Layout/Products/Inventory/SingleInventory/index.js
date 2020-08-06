import React from 'react'
import './index.css'
import {useParams} from 'react-router-dom'
import Process from './Process'
import ReadEntity from '../../../../../react-redux/Entity/Read/Entity'

export const SingleInventory = (props) => {
  const {id} = useParams()

  return (
    <ReadEntity entityName="inventory" id={id}>
      {
        rsProps => <Process { ...rsProps } />
      }
    </ReadEntity>
  )
}
