import React from 'react'
import { Card } from 'antd'
import {BillSearch} from './BillSearch/BillSearch'
import {BillDetails} from './BillDetails/BillDetails'

export const BillToChange = (props) => {
  const { search, status, cart, setCart,billNumber,setBillNumber,changeTotal } = props

  return (
    <Card title="Facture à Echanger">
      <BillSearch search={search} billNumber={billNumber} setBillNumber={setBillNumber} status={status} cart={cart} setCart={setCart} />
      <BillDetails cart={cart} setCart={setCart} />
      <div style={{padding:"8px",backgroundColor:"rgb(64, 169, 255)",color:"white",}}>
        {
           changeTotal === null ? "Aucun produit à échanger" : `Total à échanger : ${changeTotal}`
        }
      </div>
    </Card>
  )
}
