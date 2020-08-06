import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { getRoutes } from '../../react-router/getRoutes'
import { Route as Routes } from '../../react-router/Route'

const AppLayout = (props) => {
  return (
    <Router>
      <Switch>
        {
          getRoutes().map((route, index) => {
            return (
             <Route
              path={route.path} key={index}
              exact={true}
              render={
                (rest) => <Routes {...rest} {...route} />
              } />
            )
          })
        }
        <Route render={(rProps) => <Routes component={() => <div>Not Found</div>} />} />
      </Switch>
    </Router>
  )
}

export default AppLayout
