/* Dependencies */
import React from 'react'
import { transformDateFormat, Table } from '../../../../../utils'

const TableComponent = (props) => {
  const { entities, read, status, page, setPage } = props

  React.useEffect(() => read(), [read, page])

  const data = entities !== undefined ? entities.map(c => ({
    nom: c.name,
    telephone: c.telephone,
    points: Math.round(c.points),
    date: c.created!==undefined ? transformDateFormat(new Date(c.created)):"inconnue",
    categorie: c.categorie ? c.categorie.name : "",
    key:c.id,
    linkedPage: {
      pathname: `/tiers/customers`,
      dataIndex: "nom",
    }
  })) : [{ nom: null, telephone: null, points: null, date: null, categorie: null, key: null, }]


  return (
    <Table
      loading={(status && status.isFetching) || false}
      data={data} pager={props.pagination} page={page} setPage={setPage}
    />
  )
}

export default TableComponent
