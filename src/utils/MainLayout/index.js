import React from 'react'
import { Route, Link, useRouteMatch } from 'react-router-dom'
import { Layout, Menu } from 'antd'

export const MainLayout = ({ location, widgets, ...props }) => {
    const { pathname } = location
    const { url } = useRouteMatch()

    const { Sider } = Layout

    const [current, setCurrent] = React.useState(pathname)

    return (
        <Layout style={{ minHeight: "100vh", }}>
            <Sider width={200} breakpoint="lg" collapsedWidth={0}>
                <Menu mode="inline" selectedKeys={[current]} style={{ height: '100%', borderRight: 0 }} onClick={e => setCurrent(e.key)}>
                    {
                        widgets.map((w, i) => (
                            <Menu.Item key={`${url}${w.path}`}><Link to={`${url}${w.path}`}>{w.name}</Link></Menu.Item>
                        ))
                    }
                </Menu>
            </Sider>
            <Layout.Content>
                <div style={{ padding: "8px" }}>
                    {
                        widgets.map((t, i) => <Route path={`${url}${t.path}`} exact={t.exact} render={props => <t.content {...props} />} key={i} />)
                    }
                </div>
            </Layout.Content>
        </Layout>
    )
}
