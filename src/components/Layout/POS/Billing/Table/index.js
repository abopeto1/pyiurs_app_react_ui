/* Dependencies */
import React from 'react'
import { Button } from 'antd'
import moment from 'moment'
import { PrinterOutlined } from '@ant-design/icons'
import { Table, print } from '../../../../../utils'

const TableComponent = (props) => {
  const { entities, read, status, entityName, page } = props
  React.useEffect(
    () => {
      function fetch(){
        read({
          api: true
        })
      }
      fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page]
  )
  
  const data = entities && entities.length > 0 ? entities.map( bill => ({
    key: bill.id,
    date: moment(bill.created).format("YYYY-MM-DD HH:mm"),
    facture: bill.numero,
    client: bill.customer.name,
    total: bill.total,
    tva: bill.tva,
    net: <b>{bill.net}</b>,
    paiement: bill.typePaiement.label,
    accompte: bill.accompte && bill.accompte,
    action: <Button
              type="primary"
              icon={<PrinterOutlined />}
              shape="round" 
              onClick={() => print(bill.key, entityName) }
            />,
  })) : [{
    key: null,
    date: null,
    facture: null,
    total: null,
    tva: null,
    net: null,
    paiement: null,
    accompte: null,
    action: null,
  }]

  return (
    <Table 
      data={data}
      loading={(status && status.isFetching) || false}
      pager={props.pagination}
      page={page} setPage={props.setPage}
    />
  )
}

export default TableComponent
