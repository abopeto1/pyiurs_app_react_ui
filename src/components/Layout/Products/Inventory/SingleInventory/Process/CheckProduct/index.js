import React from 'react'
import './index.css'
import { Row, Col, Typography, } from 'antd'
// import ToggleEntity from '../../../../../../../react-redux/Entity/Toggle'
import ExportToExcel, { Table } from '../../../../../../../utils'

const CheckProduct = props => {
    const { products, types, value, } = props
    const { Title } = Typography
    
    const notScanned = products.filter(p => !p.status && types.includes((p.product.type.id).toString()))
    const scanned = products.filter(p => p.status && types.includes((p.product.type.id).toString()))

    return (
        <Row gutter={[8,8]}>
            <Col xs={24} sm={12}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Title level={4}>Produits Restants : {notScanned.length} Articles</Title>
                    <ExportToExcel dataArray={notScanned.map((p, i) => ({
                        id: p.product.id,
                        codebarre: p.product.codebarre, segment: p.product.segment.name,
                        type: p.product.type.name, categorie: p.product.cat, 
                        "Code Livraison": p.product.code_livraison,
                        source: p.product.source,
                    }))} fileName="Non Trouvés" />
                </div>
                <Table
                    data={
                        value === "" ? notScanned.map((p, i) => ({
                            codebarre: p.product.codebarre, segment: p.product.segment.name,
                            type: p.product.type.name, categorie: p.product.cat, key: i,
                        })) : 
                            notScanned.filter(
                                p => (p.product.codebarre.toLowerCase()).includes(value.toLowerCase())
                            ).map((p,i) => ({
                                codebarre:p.product.codebarre, segment:p.product.segment.name,
                                type:p.product.type.name, categorie: p.product.cat, key:i,
                             }))
                        }
                    loading={false}
                />
            </Col>
            <Col xs={24} sm={12}>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Title level={4}>Produits Scannés : {scanned.length} Articles</Title>
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


