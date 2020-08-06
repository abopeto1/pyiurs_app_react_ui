import { combineReducers } from 'redux';
import getByIdReducer from './byId';
import getReadIdsReducer from './read';
import getUpdateIdsReducer from './update';
import getDeleteIdsReducer from './delete';
import getToggleIdsReducer from './toggle';
import getCreateIdsReducer from './create';

const getReducers = reducerName => (
  combineReducers({
    byId: getByIdReducer(reducerName),
    createIds: getCreateIdsReducer(reducerName),
    readIds: getReadIdsReducer(reducerName),
    updateIds: getUpdateIdsReducer(reducerName),
    deleteIds: getDeleteIdsReducer(reducerName),
    toggleIds: getToggleIdsReducer(reducerName),
  })
);

const entities = combineReducers({
  agent: getReducers('agent'),
  agent_loan: getReducers('agent_loan'),
  appointment: getReducers('appointment'),
  bilan_account: getReducers('bilan_account'),
  bilan_budget: getReducers('bilan_budget'),
  bilan_category: getReducers('bilan_category'),
  bill: getReducers('bill'),
  bill_detail: getReducers('bill_detail'),
  brand: getReducers('brand'),
  budget: getReducers('budget'),
  cashin: getReducers('cashin'),
  cloture: getReducers('cloture'),
  cloture_month: getReducers('cloture_month'),
  credit: getReducers('credit'),
  customer: getReducers('customer'),
  customer_category: getReducers('customer_category'),
  dashboard: getReducers('dashboard'),
  debit: getReducers('debit'),
  debit_echeance: getReducers('debit_echeance'),
  delivery: getReducers('delivery'),
  expence: getReducers('expence'),
  expence_compte: getReducers('expence_compte'),
  expence_compte_category: getReducers('expence_compte_category'),
  inventory: getReducers('inventory'),
  inventory_product: getReducers('inventory_product'),
  order: getReducers('order'),
  order_bill: getReducers('order_bill'),
  order_echeance: getReducers('order_echeance'),
  product: getReducers('product'),
  product_department: getReducers('product_department'),
  product_movement: getReducers('product_movement'),
  product_sample: getReducers('product_sample'),
  product_stock: getReducers('product_stock'),
  promotion: getReducers('promotion'),
  promotion_type: getReducers('promotion_type'),
  provider: getReducers('provider'),
  segment: getReducers('segment'),
  service: getReducers('service'),
  stock_log: getReducers('stock_log'),
  taux: getReducers('taux'),
  type: getReducers('type'),
  type_paiement: getReducers('type_paiement'),
  user: getReducers('user'),
  warehouse: getReducers('warehouse'),
});

const reducers = combineReducers({
  entities,
});

export default reducers;
