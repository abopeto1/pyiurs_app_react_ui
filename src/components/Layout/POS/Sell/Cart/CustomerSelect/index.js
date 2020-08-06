import React,{ useEffect } from 'react'
import { Select,Button } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import CustomerCreateForm from '../../../../Tiers/Customer/CreateForm'
import CreateEntity from '../../../../../../react-redux/Entity/Create'

const CustomerSelect = (props) => {
  const { entities, read, status, setCart, cart } = props
  const customers = entities ? entities : []
  const [visible,setVisible] = React.useState(false)

  useEffect(read,[])

  return (
    <div style={{display:"flex",justifyContent:"space-between"}}>
      <Select
        showSearch placeholder="Client"
        onChange={val => setCart({ ...cart, customer: `/api/customers/${val}`})}
        style={{width:"100%"}} optionFilterProp="children"
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        loading={status && status.isFetching}
      >
      {
        customers && customers.map(c => (
          <Select.Option key={c.id} value={c.id}>{`${c.name} (${c.telephone})`}</Select.Option>
        ))
      }
      </Select>
      <Button
        type="primary" shape="round" onClick={() => setVisible(true)} icon={<UserAddOutlined />}
        style={{marginLeft:"5px"}} 
      />
      <CreateEntity entityName='customer'>
      {
        customerProps => <CustomerCreateForm { ...customerProps } setVisible={setVisible} visible={visible}/>
      }
      </CreateEntity>
    </div>
  )
}

export default CustomerSelect
