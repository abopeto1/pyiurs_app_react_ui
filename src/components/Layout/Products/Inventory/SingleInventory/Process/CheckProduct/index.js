import React from 'react'
import './index.css'
import { Row, Col, Typography, } from 'antd'
import { ProductsTable } from './ProductsTable'
import ExportToExcel, { Table } from '../../../../../../../utils'
import Entities from '../../../../../../../react-redux/Entity/Read/Entities'

const CheckProduct = props => {
    const { products, types, inventoryId } = props
    const { Title } = Typography
    
    const [page, setPage] = React.useState({
        scanned: 1, notScanned: 1,
    })
    const scanned = products.filter(p => p.status && types.includes((p.product.type.id).toString()))

    return (
        <Row gutter={[8,8]}>
            <Col xs={24} sm={12}>
                {/* <ExportToExcel dataArray={notScanned.map((p, i) => ({
                    id: p.product.id,
                    codebarre: p.product.codebarre, segment: p.product.segment.name,
                    type: p.product.type.name, categorie: p.product.cat, 
                    "Code Livraison": p.product.code_livraison,
                    source: p.product.source,
                }))} fileName="Non Trouvés" /> */}
                <Entities
                    entityName="inventory_product"
                    params={{
                        page: page.notScanned,
                        types: types,
                        inventory: inventoryId,
                        status: false,
                    }}
                >
                    {
                        rest => (
                            <ProductsTable
                                { ...rest }
                                page={page.notScanned}
                                setPage={(value) => setPage({ ...page, notScanned: value,})}
                                title="Produits Restants" types={types}
                            />
                        )
                    }
                </Entities>
            </Col>
            <Col xs={24} sm={12}>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Title level={4}>Produits Scannés :  Articles</Title>
                    <ExportToExcel dataArray={scanned.map((p, i) => ({
                        id: p.product.id,
                        codebarre: p.product.codebarre, segment: p.product.segment.name,
                        type: p.product.type.name, categorie: p.product.cat,
                        "Code Livraison": p.product.code_livraison,
                        source: p.product.source,
                    }))} fileName="Trouvés" />
                </div>
                <Table
                    data={scanned.map((p, i) => ({
                        codebarre: p.product.codebarre, segment: p.product.segment.name,
                        type: p.product.type.name, categorie: p.product.cat, key: i,
                    }))} 
                    style={{
                        overflowX: 'scroll',
                    }}
                    loading={false}
                />
            </Col>
        </Row>
    )
}

export default CheckProduct


