/* Dependencies */
import React from 'react'
import { Spin, Button } from 'antd'
import { PrinterOutlined } from '@ant-design/icons'
import UpdateForm from '../UpdateForm'
import DeleteForm from '../DeleteForm'
import { Table, transformDateFormat, print } from '../../../../../utils'

const TableComponent = (props) => {
  const { read, entities, status } = props

  React.useEffect(read,[])

  const data = entities !== undefined ? entities.reduce((a,i) => {
    const action = i.statut ? (
        <Button
          size="small" type="primary" onClick={() =>  print(i.id, "expence")} icon={<PrinterOutlined />}
        />
    ) : 
    <div style={{ display: "flex", alignContent: "center", flexDirection: "column" }}>
      <UpdateForm id={i.id} />
      <DeleteForm id={i.id} />
    </div>
    
    return [...a, {
      date: transformDateFormat(i.created, 'Y-m-d H:i'),
      compte: i.expence_compte.name,
      motif: i.motif, 
      montant: i.montant,
      currency: i.currency,
      provider: i.provider.name,
      statut: i.statut ,
      key: i.id, action: action, 
    }]
  },[]) : []

  return (
    <div style={{height:"100%"}}>
      {
        (status && status.isFetching) ? (
          <div style={{display:"flex", justifyContent:"center",}}><Spin  /></div>
        ) : (
            <Table bordered data={data} loading={!(status && status.isFetching) && false} />
        )
      }
    </div>
  )
}

export default TableComponent
