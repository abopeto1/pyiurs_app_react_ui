import React from 'react'
import './index.css'
import { Route,Redirect } from 'react-router-dom'
import ReadEntity from '../react-redux/Entity/Read/Entity'
import Main from './MainLayout'
import { isGranted } from '../utils/isGranted'

const MainLayout = ({component,user, ...rest}) => {
  
  return (
    <Route {...rest} render={matchProps => (
      isGranted(rest.roles) ?
      <ReadEntity entityName="taux" id={1} >
        {
          props => (
              <Main {...props} {...rest} component={component} matchProps={matchProps} />
            )
        }
      </ReadEntity>
       : <Redirect to="/login" />
    )} />
  )
}

export default MainLayout
