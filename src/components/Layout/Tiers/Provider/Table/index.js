/* Dependencies */
import React from 'react'
import { Table,Button } from 'antd'
import { transformDateFormat } from '../../../../../utils'

const TableComponent = (props) => {
  const { entities, read, status } = props
  React.useEffect(read,[])

  const columns = [
    {title: "Nom",dataIndex:"name",key:"0",render:v => ( <div style={{fontStyle:"italic"}}><b>{v}</b></div> )},
    {title: "Téléphone",dataIndex:"telephone",key:"1"},{title: "Type",dataIndex:"type",key:"2"},
    {title: "Email",dataIndex:"email",key:"3"},{title: "Adresse",dataIndex:"adress",key:"3"},
    {title: "Date d'inscription",dataIndex:"date",key:"4"},
    {title: "Action",key:"5",render:v => {
        return (
          <Button size="sm" onClick={() => alert(v)}>Modifier</Button>
        )
      }
    },
  ]

  const data = entities !== undefined ? entities.map(c => ({
    ...c,date: c.created!==undefined ? transformDateFormat(new Date(c.created)):"inconnue",key: c.id,
  })) : []

  return (
    <Table dataSource={data} columns={columns} style={{overflowX:"scroll"}}
      loading={status && status.isFetching}
    />
  )
}

export default TableComponent
