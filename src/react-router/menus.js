import React from 'react'
import {
    UserOutlined, HomeOutlined, ShoppingCartOutlined, ContainerOutlined,
    DollarCircleOutlined, DatabaseOutlined, CreditCardOutlined
} from '@ant-design/icons'

export const menus = [
    { name: "Accueil", path: "/", icon: <HomeOutlined />, access: ["ROLE_USER", "ROLE_ADMIN"], },
    { name: "Vente", path: "/pos", icon: <ShoppingCartOutlined />, access: ["ROLE_USER", "ROLE_ADMIN"], },
    { name: "Tiers", path: '/tiers', icon: <UserOutlined />, access: ["ROLE_ADMIN"], },
    { name: "Rapport de Gestion", path: '/reports', icon: <ContainerOutlined />, access: ["ROLE_ADMIN"], },
    { name: "Cash", path: '/cash', icon: <DollarCircleOutlined />, access: ["ROLE_ADMIN"], },
    { name: "Stock", path: '/stock', icon: <DatabaseOutlined />, access: ["ROLE_ADMIN"], },
    { name: "Budget", path: '/budget', icon: <CreditCardOutlined />, access: ["ROLE_ADMIN"], },
]