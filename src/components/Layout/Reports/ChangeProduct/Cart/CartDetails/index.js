import React from 'react'
import { Table,Button } from 'antd'

const CartDetails = (props) => {
  const { setCartProduct, setCart } = props

  const data = props.cart.billDetails.map(d => {
    const p = props.cartProduct.find(cp => cp.id === d.product)
    return {
      codebarre: p.codebarre, article: p.description, net: d.net, id: d.product
    }
  })
  const columns = [
    {
      title:"Codebarre", dataIndex:"codebarre",key:"0",
    },
    {
      title:"Article", dataIndex:"article",key:"1",
    },
    {
      title:"Net", dataIndex:"net",key:"2",
    },
    {
      title:"", dataIndex:"id", key:"3",render: (text,r) => <Button type="danger" onClick={() => cancel(r.id)}>Annuler</Button>
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
