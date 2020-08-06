import React from 'react'
import logo from '../assets/images/logo.jpg'
import { Link } from 'react-router-dom'
import { Layout, Button, Grid, Popover, Menu, Space, Form, Input, message } from 'antd'
import { BarsOutlined, UserOutlined, PoweroffOutlined, DownOutlined } from '@ant-design/icons'
import UpdateEntity from '../react-redux/Entity/Update'
import { routes } from './routes'
import { isGranted } from '../utils/isGranted'

const MainLayout = ({ children: Component, ...props}) => {
    const { path } = props
    const { Header, Content } = Layout
    const { useBreakpoint } = Grid
    const breakPoints = useBreakpoint();

    const [form, setForm] = React.useState({ edit: false, value: sessionStorage.taux})

    const deconnect = () => {
        sessionStorage.clear()
        props.history.push('/login')
    }

    const overlay = (
        <Menu>
            <Menu.Item key="0" icon={<UserOutlined />}>
                Voir profil
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                {
                    !form.edit ?
                        <Space>
                            <div>
                                Taux: {`${form.value} Fc`}
                            </div>
                            <Button type="primary" onClick={() => setForm({...form,edit:true,})} size="small">
                                Modifier
                            </Button>
                        </Space>
                    :
                        <UpdateEntity entityName="taux" id={1}>
                            {
                                ({ update, status }) => (
                                    <Form onFinish={() => update({taux:form.value},{
                                        onSuccess: u => {
                                            sessionStorage.setItem('taux', u.taux);
                                            setForm({...form,edit:false});
                                            message.success("Taux modifié avec succés")
                                        }
                                    })}>
                                        <Form.Item label="Taux">
                                            <Input
                                                defaultValue={sessionStorage.taux}
                                                onChange={e => setForm({...form, value:parseFloat(e.target.value),})}
                                                disabled={status && status.isFetching}
                                            />
                                        </Form.Item>
                                    </Form>
                                )
                            }
                        </UpdateEntity>
                }
            </Menu.Item>
            <Menu.Item key="1" icon={<PoweroffOutlined />}>
                <Button type="danger" onClick={() => deconnect()} >Déconnexion</Button>
            </Menu.Item>
        </Menu>
    )

    const mainMenu = mode => (
        <Menu
            theme={mode === 'inline' ? "light" : "dark"} mode={mode} defaultSelectedKeys={[path]} selectedKeys={[path]}
            style={mode === "inline" ? {} : { lineHeight: '64px', backgroundColor: "black", flexGrow: 1, display: "flex", alignItems: "center", }}
        >
            {
                routes.filter(r => isGranted(r.roles) && Array.isArray(r.roles) && (r.roles.length > 0)).map((m, i) => (
                    <Menu.Item key={m.path}>
                        <Link to={m.path} replace><span style={{ marginRight: "10px", }}>{m.icon}</span>{m.name}</Link>
                    </Menu.Item>
                ))
            }

            <Menu.Item style={{ flexGrow: 1, }}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Popover placement="bottomRight" trigger="click" content={overlay}
                        style={{ padding: 0, }} 
                    >
                        <Button icon={<DownOutlined />} type="primary">{`${sessionStorage.name} ${sessionStorage.lastname}`}</Button>
                    </Popover>
                </div>
            </Menu.Item>
        </Menu>
    )

    return (
        <Layout style={{ minHeight: '100vh', }}>
            {
                (sessionStorage.token !== null && sessionStorage.token !== undefined) && (
                    <Header
                        style={{
                            display: 'flex', alignItems: "center", backgroundColor: "black", padding: '0px 4px',
                            justifyContent: breakPoints['xl'] || breakPoints['lg'] ? "flex-start" : "space-between", position: 'fixed', width: '100%',
                            zIndex: 3, height: '64px',
                        }}
                    >
                        <div style={{ margin: "0px 16px" }}><img src={logo} alt="logo" style={{ height: "7vh", }} /></div>
                        {
                            breakPoints['xl'] || breakPoints['lg'] ? (
                                mainMenu("horizontal")
                            ) : (
                                    <Popover placement="bottomRight" trigger="click" content={mainMenu("inline")}
                                        style={{ padding: 0, }} className="hamburger-menu"
                                    >
                                        <Button icon={<BarsOutlined />} size="large" style={{ color: "white", background: 'none', border: 'none' }} />
                                    </Popover>
                                )
                        }
                    </Header>
                )
            }
            {
                props.sidebar
            }
            <Content style={{ marginTop: (sessionStorage.token !== null && sessionStorage.token !== undefined) ? '64px' : 0 ,}}>
                <Component {...props} {...props.matchProps} />
            </Content>
        </Layout>

    )
}

export default MainLayout