import React, { lazy } from 'react'
import { UserOutlined, ShoppingOutlined } from '@ant-design/icons'
import * as Tiers from '../components/Layout/Tiers'
import { ChangeProduct, AllReports, ExpenceReports } from '../components/Layout/Reports'
import { Resume as CashResume, Expence, Credit, Debit, AgentLoan } from '../components/Layout/Cash'
import * as Stock from '../components/Layout/Products'
import * as Budget from '../components/Layout/Budget'

const Login = lazy(() => import('../components/Login'))
const Dashboard = lazy(() => import('../components/Layout/Dashboard'))

// POS Page
const Sell = lazy(() => import('../components/Layout/POS/Sell'))
const Appointment = lazy(() => import('../components/Layout/POS/Appointment'))
const Billing = lazy(() => import('../components/Layout/POS/Billing'))
const BillToPay = lazy(() => import('../components/Layout/POS/BillToPay'))
const SellProducts = lazy(() => import('../components/Layout/POS/Products'))
const SellResume = lazy(() => import('../components/Layout/POS/Resume'))

// Tiers Page
const Agent = lazy(() => import('../components/Layout/Tiers/Agent'))
const Customer = lazy(() => import('../components/Layout/Tiers/Customer'))
const SingleCustomer = lazy(() => import('../components/Layout/Tiers/Customer/SingleCustomer'))

export const routes = [
    { name: "Accueil", path: "/", component: Dashboard, exact: true, roles: ["ROLE_USER",], },
    {
        name: "Vente", path: "/pos", roles: ["ROLE_USER",], routes:[
            { name: 'Vente', component: Sell, path: "/", exact: true, },
            { name: 'Rendez-Vous', component: Appointment, path:"/appointments", exact: true,},
            { name: 'Facturation', component: Billing, path: "/bills", exact: true, },
            { name: 'Traqueur Crédit', component: BillToPay, path: "/loanbills", exact: true, },
            { name: 'Produits', component: SellProducts, path: "/products", exact: true, },
            { name: 'Clotûre', component: SellResume, path: "/resume", exact: true, },
        ]
    },
    {
        name: "Tiers", path: '/tiers', roles: ["ROLE_ADMIN"], routes: [
            { name: 'Clients', component: Customer, path: "", exact: true, icon: <UserOutlined />, },
            { name: 'Produit Cosmétique', component: SingleCustomer, path: "/customers/:id", exact: true, nested: true, },
            { name: 'Fournisseurs', component: Tiers.Provider, path: "/providers", exact: true, icon: <UserOutlined />, },
            { name: 'Personnel', component: Agent, path: "/agents", exact: true, icon: <UserOutlined />, },
        ],
    },
    {
        name: "Rapport de Gestion", path: '/reports', roles: ["ROLE_ADMIN"], routes: [
            { name: 'Echange Produit', component: ChangeProduct, path: "", icon: ShoppingOutlined, exact: true, },
            { name: 'Rapports Vente', component: AllReports, path: "/all-reports", exact: true, },
            { name: 'Rapports Dépense', component: ExpenceReports, path: "/expence-reports", exact: true, },
        ]
    },
    {
        name: "Cash", path: '/cash', exact: false, roles: ["ROLE_ADMIN"], routes:[
            { name: 'Resumé', component: CashResume, path: "", exact: true, },
            { name: 'Dépense', component: Expence, path: "/expences", exact: true, },
            { name: 'Crédit', component: Credit, path: "/credit", exact: true, },
            { name: 'Débit', component: Debit, path: "/debit", exact: true, },
            { name: 'Gestion des Avances', component: AgentLoan, path: "/agent_loan", exact: true, },
        ]
    },
    {
        name: "Stock", path: '/stock', exact: false, roles: ["ROLE_ADMIN"], routes:[
            { name: 'Resumé', component: Stock.Resume, path: "", exact: true, },
            { name: 'Entrepot', component: Stock.Warehouse, path: "/warehouses", exact: true, },
            { name: "Entrepot Details", component: Stock.WarehouseDetails, path: "/warehouses/:id", exact: true, nested: true},
            { name: 'Livraison', component: Stock.Delivery, path: "/deliveries", exact: true,},
            { name: "Livraison Details", component: Stock.DeliveryDetails, path: "/deliveries/:id", exact: true, nested: true},
            { name: 'Promotion', component: Stock.Promotion, path: "/promotions", exact: true },
            { name: "Promotion Détails", component: Stock.PromotionDetails, path: "/promotions/:id", exact: true, nested: true},
            { name: 'Commande', component: Stock.Order, path: "/orders", exact: true, },
            { name: "Détails Commande", component: Stock.OrderDetails, path: "/orders/:id", exact: true, nested: true},
            { name: 'Produit', component: Stock.Product, path: "/products", exact: true, },
            { name: 'Catalogue Cosmétique', component: Stock.Catalog, path: "/catalogs", exact: true, },
            { name: 'Services', component: Stock.Service, path: "/services", exact: true, },
            { name: 'Produit Cosmétique', component: Stock.SingleProduct, path: "/catalogs/products/:id", exact: true, nested: true, },
            { name: 'Segment', component: Stock.Segment, path: "/segments", exact: true, },
            { name: 'Type', component: Stock.Type, path: "/types", exact: true, },
            { name: 'Marque', component: Stock.Brand, path: "/brands", exact: true, },
            { name: 'Inventaire', component: Stock.Inventory, path: "/inventories", exact: true,},
            { name: "Inventaire Details", component: Stock.SingleInventory, path: "/inventories/:id", exact: true, nested: true},
        ]
    },
    {
        name: "Budget", path: '/budget', roles: ["ROLE_ADMIN"], routes:[
            { name: 'P&L', component: Budget.Pnl, path: "", icon: ShoppingOutlined, exact: true, },
            { name: 'Cloture Mois', component: Budget.CloseMonth, path: "/closeMonth", exact: true, },
            { name: 'Gestion des Comptes', component: Budget.Manage, path: "/manage", exact: true, },
        ]
    },
    { name: "Login", path: '/login', component: Login, roles: [], },
]