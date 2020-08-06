/* Dependencies */
import React from 'react'
import { Typography, Table } from 'antd'
import ExportToExcel from '../../../../../../utils'

const TableComponent = (props) => {
  const { loading, columns, datas, period, dataExcel } = props

  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent:"space-between"}}>
        <Typography.Title level={4}>P&L</Typography.Title>
        <ExportToExcel dataArray={dataExcel} fileName={`P&L ${period}`} />
      </div>
      <Table columns={columns} dataSource={datas} loading={loading} size="small" pagination={false}
        style={{
          overflowX: 'scroll',
        }}
        />
    </React.Fragment>
  )
}

export default TableComponent
