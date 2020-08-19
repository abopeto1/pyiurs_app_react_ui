import React from 'react'
import { Form,Input,message } from 'antd'
import { BarcodeOutlined } from '@ant-design/icons'

export const BillSearch = (props) => {
  const { search,setBillNumber,billNumber,status,cart,setCart } = props
  const { Item } = Form

  const onSubmit = () => {
    search({
      onFail: () => {
        message.error(`Aucune Facture trouvé pour le numero ${billNumber}`)
      },
      onSuccess: (d) => {
        setCart({...cart,billReference:d,customer:d.customer.id})
        setBillNumber("")
      }
    })
  }
  return (
    <Form onFinish={onSubmit}>
      <Item>
        <Input
          placeholder="Entrez le numero de la Facture" value={billNumber}
          onChange={e => setBillNumber(e.target.value)}
         suffix={<BarcodeOutlined spin={status && status.isFetching} />}
        />
      </Item>
    </Form>
  )
}
