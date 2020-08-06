/* Dependencies */
import React, { useEffect } from 'react'
import { Spin } from 'antd'
import { Table } from '../../../../../../utils'

const TableComponent = (props) => {
  const { entities, status, read } = props
  
  useEffect(read, [])
  
  const data = entities !== undefined ? entities.map(
    p => ({
      fournisseur: p.name,
      total: parseInt(p.debits.reduce(
        (a, i) => 
          i.currency === "CDF" ? (parseInt(i.amount) / ( parseInt(i.taux) || sessionStorage.taux)) + a 
            : i.currency === "EUR" ? (parseInt(i.amount) / (parseInt(i.taux_euro) || sessionStorage.taux)) + a : 
            parseInt(i.amount) + a,0
      )),
      "payé": 0, key: p.id,
      children: p.debits.map(
        c => ({
          fournisseur: p.name,
          total: parseInt(c.currency === "CDF" ? parseInt(c.amount) / (parseInt(c.taux) || sessionStorage.taux) : 
        c.currency === "EUR" ? parseInt(c.amount) / (parseInt(c.taux_euro) || sessionStorage.taux) : c.amount),
          "payé": 0,
          key: c.id,
        })
      ),
    })
  ) : []

  return (
    <div >
      {
        (status && status.isFetching) ? 
          <div style={{ display: "flex",justifyContent: "center",}}>
            <Spin />
          </div> : 
          <Table bordered data={data} loading={!(status && status.isFetching) && false} />
      }
    </div>
  )
}

export default TableComponent
