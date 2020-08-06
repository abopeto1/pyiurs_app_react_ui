import React from 'react'
import { Switch,Link } from 'react-router-dom'
import { Layout,Menu } from 'antd'
import RouteWrapper from '../../react-router'

const Main = ({children,menus,...props}) => {
  const { Header } = Layout
  const [page,setPage] = React.useState("/")

  return (
    <React.Fragment>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["/"]} selectedKeys={[page]} style={{ lineHeight: '64px'}} onClick={e => setPage(e.key)}>
        {
          menus.map((m,i) => <Menu.Item key={m.path}><Link to={m.path}>{m.name}</Link></Menu.Item>)
        }
        </Menu>
      </Header>
      <Switch>
        {
          menus.map((m,i) => <RouteWrapper key={i} path={m.path} exact={m.exact} component={m.component} setPage={setPage} />)
        }
      </Switch>
    </React.Fragment>
  )
}

export default Main
