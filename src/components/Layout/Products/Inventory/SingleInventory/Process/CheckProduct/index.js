import React from 'react'
import './index.css'
import { Row, Col, } from 'antd'
import { ProductsTable } from './ProductsTable'
import Entities from '../../../../../../../react-redux/Entity/Read/Entities'

const CheckProduct = props => {
    const { types, inventoryId } = props
    
    const [page, setPage] = React.useState({
        scanned: 1, notScanned: 1,
    })

    return (
        <Row gutter={[8,8]}>
            <Col xs={24} sm={12}>
                <Entities
                    entityName="inventory_product"
                    params={{
                        page: page.notScanned,
                        "product.type": types,
                        inventory: inventoryId,
                        status: false,
                        "order[updated]":"DESC",
                    }}
                >
                    {
                        rest => (
                            <ProductsTable
                                { ...rest }
                                page={page.notScanned}
                                setPage={(value) => setPage({ ...page, notScanned: value,})}
                                title="Produits Restants" types={types}
                                reload={props.reload}
                            />
                        )
                    }
                </Entities>
            </Col>
            <Col xs={24} sm={12}>
                <Entities
                        entityName="inventory_product"
                        params={{
                            page: page.scanned,
                            "product.type": types,
                            inventory: inventoryId,
                            status: true,
                            "order[updated]":"DESC",
                        }}
                    >
                        {
                            rest => (
                                <ProductsTable
                                    { ...rest }
                                    page={page.notScanned}
                                    setPage={(value) => setPage({ ...page, scanned: value,})}
                                    title="Produits Restants" types={types}
                                    reload={props.reload}
                                />
                            )
                        }
                    </Entities>
            </Col>
        </Row>
    )
}

export default CheckProduct


