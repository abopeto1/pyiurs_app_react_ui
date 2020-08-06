/* Dependencies */
import React, { useEffect } from 'react'
import { Table,Button } from 'antd'
import { PrinterOutlined } from '@ant-design/icons'
import { print } from '../../../../../utils'

const TableComponent = (props) => {
  const { entities, read, status, entityName } = props

  useEffect(read,[])

  const loading = status && status.isFetching

  const columns = [
    {title:"Mois",dataIndex:"date",key:"0",},
    {title:"Opérateur",dataIndex:"created_by",key:"1"},
    {title:"Action",dataIndex:"key",key:"9",render:(text,r) =>
      <Button type="primary" icon={<PrinterOutlined />} shape="round" onClick={() => print(r.key, entityName)}></Button>,},
  ]
  const data = entities ? entities.map(e => ({
    ...e, date:`${e.year}-${e.month}`, created_by:`${e.operator.name} ${e.operator.lastname}`, key: e.id
  })) : []

  return (
    <Table bordered columns={columns} dataSource={data} loading={loading} />
  )
}

export default TableComponent
