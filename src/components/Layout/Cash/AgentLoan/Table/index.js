/* Dependencies */
import React from 'react'
import { Typography } from 'antd'
import { Table } from '../../../../../utils'
import CreateEntity from '../../../../../react-redux/Entity/Create'
import CreateForm from '../CreateForm'

const TableComponent = (props) => {
  const { entities, read, status } = props
  React.useEffect(read,[])

  const { Title } = Typography

  const data = entities !== undefined ? entities.map(c => ({
    key: c.id, nom: `${c.name} ${c.lastname}`, "période": "",
    "Total Avance": c.agent_loans.reduce(
      (a,i) => i.currency === "CDF" ? i.amount/i.taux + a : parseInt(i.amount) + a, 0
    ) + " $",
    children: c.agent_loans.map(al => ({
      key: al.id, "période": al.period, "Total Avance": `${al.amount} ${al.currency}`,
    }))
  })) : [{ key: null, nom: null, "Total Avance": null }]

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", }}>
        <Title level={4}>Gestion des Avances</Title>
        <CreateEntity entityName="agent_loan">
          {
            rest => <CreateForm { ...rest } agents={data ? data : []} />
          }
        </CreateEntity>
      </div>
      <Table data={data} loading={(status && status.isFetching) ?? false} />
    </div>
  )
}

export default TableComponent
