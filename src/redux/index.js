import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import middlewares from './middlewares';
import { computeSchema } from './utils';

// Add your entities here. Under define key you need to define
// all the nested relationships. Pass a string if the name of the field
// is the same as the entity name or an object with the key being the field name
// and the value being the entity name
export const schema = {
  agent: {
    define: [{ customer_account: 'customer' }, 'agent_loans', 'appointments']
  },
  agent_loan: {
    define: ['agent'],
  },
  appointment: {
    define: ['customer', 'agent']
  },
  bilan_category: {
    define: ['bilan_accounts']
  },
  bilan_account: {
    define: ['bilan_budgets']
  },
  bilan_budget: {
    define: []
  },
  bill: {
    define: ['customer', 'bill_details', { operator: 'user' }, { billReference: 'bill' }]
  },
  bill_detail: {
    define: ['bill', 'product'],
  },
  brand: {
    define: ['products'],
  },
  budget: {
    define: [{ expence_account: 'expence_compte' }],
  },
  cashin: {
    define: ['provider'],
  },
  cloture: {
    define: ['bills', 'expences', { cash_ins: 'cashins' }]
  },
  cloture_month: {
    define: ['user',]
  },
  credit: {
    define: ['provider'],
  },
  customer: {
    define: ['bills', 'appointments',]
  },
  customer_category: {
    define: ['customers',],
  },
  dashboard: {
    define: [],
  },
  debit: {
    define: ['debit_echeances', 'provider']
  },
  debit_echeance: {
    define: ['debit']
  },
  delivery: {
    define: ['products']
  },
  expence: {
    define: ['provider', 'expence_compte', 'order_echeance'],
  },
  expence_compte: {
    define: ['expences', 'expence_compte_category', 'budgets'],
  },
  expence_compte_category: {
    define: [{ expence_accounts: 'expence_comptes' }],
  },
  inventory: {
    define: ['inventory_products']
  },
  inventory_product: {
    define: ['product']
  },
  order_echeance: {
    define: [{the_order:'order'},'expence']
  },
  order_bill: {
    define: ['order']
  },
  service:{
    define: [{operator:'user'}]
  },
  order:{
    define: ['order_bills','order_echeance'],
  },
  product: {
    define: [
      'bill_details', 'brand', 'inventories', 'segment', 'type', 'warehouse', 'product_movements',
      'delivery',
      { stock: "product_stock", }, { samples: "product_samples"}, {availableSample: "product_sample"} 
    ],
  },
  product_department: {
    define: ['segments',],
  },
  product_movement: {
    define: ['product'],
  },
  product_sample: {
    define: ['product'],
  },
  product_stock: {
    define:[]
  },
  promotion: {
    define: ['products', { type: 'promotion_type' }]
  },
  promotion_type: {
    define: ['promotions']
  },
  segment: {
    define: ['types', { department: 'product_department'}],
  },
  type: {
    define: ['segment','products'],
  },
  type_paiement: {
    define:['bills',]
  },
  user: {
    define: ['bills', 'cloture_months', 'services']
  },
  warehouse: {
    define: ['products'],
  },
  provider: {
    define: ['expences','credits','cashins','debits'],
  },
  stock_log: {
    define:[]
  },
  taux: {
    define: []
  },
};

export const entitiesSchema = computeSchema(schema);

const getStore = (initialState, options = {}) => {
  if (options.debug) {
    const reduxLogger = createLogger({
      collapsed: true,
    });
    middlewares.push(reduxLogger);
  }
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)));
};


export default getStore;
