import React from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { routes } from './routes'

function Route(name = '', path = '', component, roles = [], routes = [], exact, sidebar = null){
    this.name = name
    this.path = path
    this.component = component
    this.roles = roles
    this.routes = routes
    this.exact = exact
    this.sidebar = sidebar
}

const Sidebar = ({ widgets, ...props}) => {
    const [current, setCurrent] = React.useState(props.path)
    const { Sider } = Layout
    

    return (
        (
            <Sider width={200} breakpoint="lg" collapsedWidth={0} style={{ paddingTop: '64px',}}>
                <Menu mode="inline" selectedKeys={[current]} style={{ height: '100%', borderRight: 0 }} onClick={e => setCurrent(e.key)}>
                    {
                        widgets.map((w, i) => (
                            <Menu.Item key={`${props.mainRoute}${w.path}`}>
                                <Link to={`${props.mainRoute}${w.path}`}>{w.name}</Link>
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </Sider>
        )
    )
}

const compile = (parentRoute, subRoutes = []) => {
    return subRoutes.flatMap(
        subRoute => {
            const newRoute = new Route(
                subRoute.name,
                parentRoute.path + subRoute.path,
                subRoute.component,
                (parentRoute.roles || []).concat(subRoute.roles || []),
                subRoute.routes,
                subRoute.exact,
                null
            )
            const side = parentRoute.routes && parentRoute.routes.length > 0 ? (
                <Sidebar widgets={parentRoute.routes.filter(r => !r.nested)} mainRoute={parentRoute.path} path={subRoute.path} />
            ) : null

            newRoute.sidebar = side
            
            return (subRoute.routes) ? [...compile(newRoute, subRoute.routes)] : newRoute
        }
    )
}
export const getRoutes = () => {
    const parentRoute = {
        name: '', path: '', exact: false
    }
    const flatRoutes = compile(parentRoute, routes)
    
    return flatRoutes
} 