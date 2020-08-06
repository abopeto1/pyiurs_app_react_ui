import React from 'react'
import { Table,Button } from 'antd'

const CartDetails = (props) => {
  const { setCartProduct, setCart } = props

  const data = props.cart.billDetails.map(d => {
    const p = props.cartProduct.find(cp => `/api/products/${cp.id}` === d.product)

    return {
      codebarre: p && p.codebarre, 
      article: p && p.description, 
      net: (d.net * d.qte),
      id: d.product,
      key: d.product, qte: d.qte, 
    }
  })

  const columns = [
    {
      title:"Codebarre", dataIndex:"codebarre",
    },
    {
      title:"Article", dataIndex:"article",
    },
    {
      title: "Qté", dataIndex: "qte",
    },
    {
      title:"Net", dataIndex:"net",
    },
    {
      title:"", dataIndex:"id", render: (text,r) => <Button type="danger" onClick={() => cancel(r.id)}>Annuler</Button>
    },
  ]

  const cancel = (id) => {
    setCartProduct(props.cartProduct.filter(cp => cp.id !== id))
    setCart({...props.cart,billDetails: props.cart.billDetails.filter(bd => bd.product !== id)})
  }

  return (
    <Table dataSource={data} columns={columns} pagination={false} size="small" />
  )
}

export default CartDetails
