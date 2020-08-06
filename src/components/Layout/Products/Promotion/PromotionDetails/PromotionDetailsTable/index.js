import React from 'react'
import {Button, Table} from 'antd'

const PromotionDetailsTable = (props) => {
  const { entity, read, status } = props
  
  React.useEffect(read,[])

  const columns = [
    {title: "Codebarre",dataIndex:"codebarre",key:"0",},{title: "Type",dataIndex:"type",key:"1",},
    {title: "Catégorie",dataIndex:"cat",key:"2",},{title: "Description",dataIndex:"description",key:"3",},
    {title: "Code Livraison",dataIndex:"code_livraison",key:"4",},{title: "PAT",dataIndex:"pat",key:"5",},
    {title: "PV",dataIndex:"pv",key:"6",},{title: "P. Solde",dataIndex:"p_solde",key:"7",},
    {title: "Action",render: v => {
      return (
        <Button type="danger" onClick={() => {
          // setForm(form.filter(f => f !== v))
          // setProducts(products.filter(p => p.id !== v))
        }}>Supprimer</Button>
      )}
    },
  ]

  const data = entity && entity.products ? entity.products.map(c => ({
      ...c,pat: parseInt(parseFloat(c.pu)+parseFloat(c.caa)), key: c.id,
      p_solde: entity.type.id === 1 ? c.pv*(entity.percent/100) : entity.type.id === 2 ? entity.price : parseInt(c.pu+c.caa),
      type: c.type && c.type.name,
  })) : []

  return (
    <Table dataSource={data} columns={columns} loading={status && status.isFetching} style={{
      overflowX:"scroll",
    }} />
  )
}

export default PromotionDetailsTable
