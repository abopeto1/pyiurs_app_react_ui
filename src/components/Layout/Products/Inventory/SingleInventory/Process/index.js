import React, { useEffect, useState } from 'react'
import {Typography, Spin, Row, Col } from 'antd'
import ReadEntities from '../../../../../../react-redux/Entity/Read/Entities'
import { transformDateFormat } from '../../../../../../utils'
import CheckProduct from './CheckProduct'
import SearchToUpdateForm from './SearchToUpdateForm'
import SelectType from './SelectType'

const Process = (props) => {
    const { Title } = Typography
    const { read, entity, status } = props
    const [types, setTypes] = useState([])
    const [value, setValue] = useState("")
    useEffect(read,[])
    
    const data = entity ? entity : {}

    return (
        <div>
        {
            status && status.isFetching ?
            <div style={{minHeight:'100vh', justifyCenter:"center", alignItems:'center'}}>
                <Spin />
            </div>
            :
            <Row>
                <Col sm={24} md={12}>
                    <Title level={4}>
                    {
                        data && data.created && `Inventaire du ${transformDateFormat(data.created,'Y-m-d')}`
                    }
                    </Title>
                </Col>
                <Col  sm={24} md={12}>
                    <ReadEntities entityName="type">
                        {
                            rProps => <SelectType { ...rProps } setTypes={setTypes} />
                        }
                    </ReadEntities>
                </Col>
                <Col xs={24}>
                    <ReadEntities 
                        entityName="inventory_product"
                        params={{codebarre: value, types: types, inventory: entity && entity.id}}
                    >
                        {
                            rest => <SearchToUpdateForm
                                value={value} setValue={setValue} types={types} {...rest }
                            />
                        }
                    </ReadEntities>
                    <CheckProduct
                        products={data.inventory_products ?? []} types={types} value={value}
                                inventoryId={entity && entity.id} setValue={setValue}
                    />
                </Col>
            </Row>
        }
        </div>
    )
}

export default Process