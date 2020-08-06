import React from 'react'
import { Table,Button } from 'antd'

export const BillDetails = ({ cart, setCart, ...props }) => {
  const columns = [
    {
      key: 0, title:"Codebarre", dataIndex:"codebarre",
    },
    {
      key: 1, title:"Article", dataIndex:"description",
    },
    {
      key: 2, title:"Net", dataIndex:"net",
    },
    {
      key: 3,
      title:"Action",
      render:(d,t) => (
      <Button type={t.rs === true ? "danger" : "primary"} onClick={() => setCart({
        ...cart,bill_reference:{...cart.bill_reference,bill_details:cart.bill_reference.bill_details.map(bd => {
          return bd.id === t.key ? { ...bd, rs:!bd.rs } : bd
        })}
      })}>{t.rs === true ? "Retirer" : "Ajouter"}</Button>
    ),},
  ]

  const data = cart.bill_reference !== null && cart.bill_reference.bill_details.length > 0 ? cart.bill_reference.bill_details.map((d) =>
    ({key:d.id, description:d.product.description, net:d.net, rs:d.rs, codebarre: d.product.codebarre })
  ) : []

  return (
    <Table columns={columns} dataSource={data} pagination={false} style={{marginBottom:"8px"}} />
  )
}
