/* Dependencies */
import React from 'react'
import { Typography } from 'antd'
import ExportToExcel, { Table, transformDateFormat } from '../../../../../../utils'

const TableComponent = (props) => {
  const { entities, status, params, entityName } = props
  const { Title } = Typography

  const data = entities !== undefined ? entities.map(c => ({
      date: c.created !== undefined ? transformDateFormat(new Date(c.created),"Y-m-d H:i"):"inconnue",
      compte: c.expence_compte.name,
      fournisseur: c.provider.name,
      montant: c.montant,
      'dévise': c.currency,
      taux: c.taux !== "USD" && c.taux,
      key: c.id, print: c.id
  })) : []

  return (
    <div>
    {
      (data.length > 0) && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title level={4}>
              Total Dépense : {`${entities.reduce((a,i) => {
                return i.currency === "CDF" ? a + parseFloat(i.montant)/parseFloat(i.taux) : a + parseFloat(i.montant)
              },0).toFixed(0)} $`}
            </Title>
            <ExportToExcel dataArray={data} fileName={`Rapport Dépense du ${params.start} au ${params.end}`} />
          </div>
        )
    }
      <Table
        data={data} loading={!(status && status.isFetching) && false}
        size="small" entityName={entityName}
      />
    </div>
  )
}

export default TableComponent
