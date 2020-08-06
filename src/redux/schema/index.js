import { schema } from 'normalizr';

const agent = new schema.Entity('agent')
const agents = new schema.Array(agent)

const agent_loan = new schema.Entity('agent_loan')
const agent_loans = new schema.Array(agent_loan)

const appointment = new schema.Entity('appointment')
const appointments = new schema.Array(appointment)

const brand = new schema.Entity('brand')
const brands = new schema.Array(brand)

const bill = new schema.Entity('bill')
const bills = new schema.Array(bill)

const bill_detail = new schema.Entity('bill_detail')
const bill_details = new schema.Array(bill_detail)

const bilan_budget = new schema.Entity('bilan_budget')
const bilan_budgets = new schema.Array(bilan_budget)

const bilan_category = new schema.Entity('bilan_category')
const bilan_categories = new schema.Array(bilan_category)

const bilan_account = new schema.Entity('bilan_account')
const bilan_accounts = new schema.Array(bilan_account)

const budget = new schema.Entity('budget')
const budgets = new schema.Array(budget)

const cashin = new schema.Entity('cashin')
const cashins = new schema.Array(cashin)

const cloture = new schema.Entity('cloture')
const clotures = new schema.Array(cloture)

const cloture_month = new schema.Entity('cloture_month')
const cloture_months = new schema.Array(cloture_month)

const credit = new schema.Entity('credit')
const credits = new schema.Array(credit)

const customer = new schema.Entity('customer')
const customers = new schema.Array(customer)

const customer_category = new schema.Entity('customer_category')
const customer_categories = new schema.Array(customer_category)

const dashboard = new schema.Entity('dashboard')
const dashboards = new schema.Array(dashboard)

const debit = new schema.Entity('debit')
const debits = new schema.Array(debit)

const debit_echeance = new schema.Entity('debit_echeance')
const debit_echeances = new schema.Array(debit_echeance)

const delivery = new schema.Entity('delivery')
const deliveries = new schema.Array(delivery)

const expence_compte_category = new schema.Entity('expence_compte_category')
const expence_compte_categories = new schema.Array(expence_compte_category)

const expence_compte = new schema.Entity('expence_compte')
const expence_comptes = new schema.Array(expence_compte)

const expence = new schema.Entity('expence')
const expences = new schema.Array(expence)

const order = new schema.Entity('order')
const orders = new schema.Array(order)

const order_echeance = new schema.Entity('order_echeance')
const order_echeances = new schema.Array(order_echeance)

const order_bill = new schema.Entity('order_bill')
const order_bills = new schema.Array(order_bill)

const product = new schema.Entity('product');
const products = new schema.Array(product);

const product_department = new schema.Entity('product_department');
const product_departments = new schema.Array(product_department);

const product_movement = new schema.Entity('product_movement');
const product_movements = new schema.Array(product_movement);

const product_sample = new schema.Entity('product_sample');
const product_samples = new schema.Array(product_sample);

const product_stock = new schema.Entity('product_stock');
const product_stocks = new schema.Array(product_stock);

const promotion = new schema.Entity('promotion');
const promotions = new schema.Array(promotion);

const promotion_type = new schema.Entity('promotion_type')
const promotion_types = new schema.Array(promotion_type);

const provider = new schema.Entity('provider')
const providers = new schema.Array(provider)

const segment = new schema.Entity('segment');
const segments = new schema.Array(segment);

const service = new schema.Entity('service')
const services = new schema.Array(service)

const stock_log = new schema.Entity('stock_log')
const stock_logs = new schema.Array(stock_log)

const taux = new schema.Entity('taux')
const tauxs = new schema.Array(taux)

const type = new schema.Entity('type');
const types = new schema.Array(type);

const type_paiement = new schema.Entity('type_paiement')
const type_paiements = new schema.Array(type_paiement)

const user = new schema.Entity('user', {}, { idAttribute: 'username' })
const users = new schema.Array(user)

const inventory = new schema.Entity('inventory')
const inventories = new schema.Array(inventory)

const inventory_product = new schema.Entity('inventory_product')
const inventory_products = new schema.Array(inventory_product)

const warehouse = new schema.Entity('warehouse');
const warehouses = new schema.Array(warehouse);

agent.define({
  customer, agent_loans, appointments, 
})

agent_loan.define({
  agent,
})

appointment.define({
  customer, agent
})

bilan_account.define({
  bilan_budgets,
})

bilan_budget.define({})

bilan_category.define({
  bilan_accounts,
})

bill.define({
  customer, bill_details, bill: 'bill_reference', user: 'operator',
})

bill_detail.define({
  bill, product
})

brand.define({
  products,
})

cashin.define({
  provider
})

credit.define({
  provider,
})

expence_compte_category.define({
  expence_comptes
})

expence_compte.define({
  expences, expence_compte_category, budgets
})

customer.define({
  bills, appointments, 
})

customer_category.define({
  customers,
})

dashboard.define({})

debit.define({
  debit_echeances, provider,
})

delivery.define({
  products,
})

order_echeance.define({
  order, expence
})

product.define({
  brand, warehouse, segment, type, promotion, bill_details, delivery,
  product_stock: 'stock', product_sample: 'available_sample', product_samples: 'samples'
});

product_department.define({
  products,
})

product_sample.define({
  product,
})

product_stock.define({});

promotion.define({
  products, type: promotion_type
});

promotion_type.define({
  promotion,
});

type.define({
  segment, products
});

type_paiement.define({
  bills,
})

segment.define({
  types, product_department: 'department',
});

debit_echeance.define({
  debit,
})

order_bill.define({
  order,
})

service.define({
  user,
})

order.define({
  order_echeance,
})

stock_log.define({});

user.define({
  bills,cloture_months,services
});

warehouse.define({
  products,
});

budget.define({
  expence_compte,
})

expence.define({
  provider, expence_compte, order_echeance,
})

provider.define({
  expences,credits,cashins, debits
})

cloture.define({
  expences, bills,
})

cloture_month.define({
  user
})

inventory.define({
  products
})

inventory_product.define({
  product,
})

taux.define({})

export default {
  agent, agents,
  agent_loan, agent_loans,
  appointment, appointments,
  bilan_account, bilan_accounts,
  bilan_budget, bilan_budgets,
  bilan_category, bilan_categories,
  bill, bills,
  bill_detail, bill_details,
  brand, brands,
  budget, budgets,
  cashin, cashins,
  cloture, clotures,
  cloture_month, cloture_months,
  credit, credits,
  customer, customers,
  customer_category, customer_categories,
  dashboard, dashboards,
  debit, debits,
  debit_echeance, debit_echeances,
  delivery, deliveries,
  expence, expences,
  expence_compte, expence_comptes, 
  expence_compte_category, expence_compte_categories,
  inventory, inventories,
  inventory_product, inventory_products,
  order, orders,
  order_echeance, order_echeances,
  order_bill, order_bills,
  product, products,
  product_department, product_departments,
  product_movement, product_movements,
  product_sample, product_samples,
  product_stock, product_stocks,
  promotion, promotions,
  promotion_type, promotion_types,
  provider, providers,
  segment, segments,
  service, services,
  stock_log, stock_logs,
  taux, tauxs,
  type, types,
  type_paiement, type_paiements,
  user, users,
  warehouse, warehouses,
};
