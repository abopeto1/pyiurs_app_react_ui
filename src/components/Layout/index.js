import React, { Suspense } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { getRoutes } from '../../react-router/getRoutes'
import { Route as Routes } from '../../react-router/Route'
import { Spin } from 'antd'

const AppLayout = (props) => {
  return (
    <Router>
      <Suspense
        fallback={
          <div style={{
            height: '100%', width: '100%',
            display: 'flex', justifyContent:'center', alignItems: 'center'
          }}>
            <Spin />
          </div>
        }
      >
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
      </Suspense>
    </Router>
  )
}

export default AppLayout
