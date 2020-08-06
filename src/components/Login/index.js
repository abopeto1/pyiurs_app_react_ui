import React from 'react'
import { Redirect } from 'react-router-dom'
import pyiursban from '../../assets/images/Pyiursban.jpg'
import { Layout,Form,Input,Button,message } from 'antd'
import { RightCircleOutlined } from '@ant-design/icons'
import GetUser from '../../react-redux/Entity/Create'
import { isAuth } from '../../utils/getToken'

const Login = ({user,setUser,...props}) => {
  const [form,setForm] = React.useState({
    login:"",password:""
  })
  const [connected, setConnected] = React.useState(false)

  const login = us => {
    if (form.login === '' || form.password === ""){
      message.info("Nom d'Utilisateur et mot de passe obligatoire")
    } else {
      us.create(form,{
        onSuccess: (auth) => {
          setForm({})
          sessionStorage.setItem('token',auth.value)
          sessionStorage.setItem('name',auth.user.name)
          sessionStorage.setItem('lastname',auth.user.lastname)
          sessionStorage.setItem('id',auth.user.id)
          sessionStorage.setItem('roles',auth.user.roles)
          sessionStorage.setItem('taux',auth.taux.taux)
          setConnected(true)
          message.success(`Bienvenue ${auth.user.name && auth.user.name} ${auth.user.lastname && auth.user.lastname}`)
          console.log(connected)
        },
        onFail: (e) => console.log(e) || message.error("Erreur lors de la connexion")
      })
    }
  }

  return (
    <React.Fragment>
    {
      isAuth() ? <Redirect to="/" /> :
      <Layout style={{padding: '-20px',minHeight:'100vh', background:"black", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:'center',}}>
        <img src={pyiursban} width="60%" alt="Pyiurs Banner" />
        <GetUser entityName="user" params={{login:true}}>
        {
          userProps => (
            <Form onFinish={() => login(userProps)}>
              <Form.Item>
                <Input type="text" 
                  placeholder="Nom d'Utilisateur" value={form.login}
                  onChange={(e) => setForm({ ...form, login:e.target.value,})}
                />
              </Form.Item>
              <Form.Item>
                <Input type="password" placeholder="Mot de passe" value={form.password} onChange={(e) => setForm({...form, password:e.target.value,})} />
              </Form.Item>
                <Button
                  type="primary" onClick={() => login(userProps)} icon={<RightCircleOutlined />}
                  loading={ userProps.status && userProps.status.isFetching }
                >
                  Connexion
                </Button>
            </Form>
          )
        }
        </GetUser>
      </Layout>
    }
    </React.Fragment>
  )
}

export default Login
