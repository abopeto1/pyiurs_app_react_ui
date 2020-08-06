import React, { useState } from 'react'
import { Card, Row, Col,Table, DatePicker,Button} from 'antd'
import { uniq } from 'lodash'
import moment from 'moment'
import { reduceType, getUniqueBillsSegment } from './reduceType'

const ChartArea = ({dateFilter,setDateFilter,read, entities, status, params, today }) => {
    const { RangePicker } = DatePicker
    
    useState(read,[])
    
    // const previous = prev.entities ?? []
    
    const cols= [
        {
            title:"Label",key:0,dataIndex:"name",render:(v,r) => {
                return !r.children ? v : <strong>{v}</strong>
            }
        },
        {
            title:"Valeur",key:1,dataIndex:"value", render:(v,r) => {
                return !r.children ? v : <strong>{v} ({r.percent.toFixed(0)} %)</strong>
            }
        },
        {
            title: "# Factures", key: 2, dataIndex: "invoices", render:(v,r) => {
                return !r.children ? v : <strong>{v}</strong>
            }
        },
        {
            title:"# Produits",key:3,dataIndex:"products", render:(v,r) => {
                return !r.children ? v : <strong>{v}</strong>
            }
        },
        {
            title:"Patricia",key:4,dataIndex:"patricia", render:(v,r) => {
                return !r.children ? v : <strong>{v}</strong>
            }
        },
        {
            title:"Kerta",key:5,dataIndex:"kerta", render:(v,r) => {
                return !r.children ? v : <strong>{v}</strong>
            }
        },
        {
            title:"Admin",key:8,dataIndex:"Admin",render:(v,r) => {
                return !r.children ? v : <strong>{v}</strong>
            }
        },
    ]

    const data = entities ? entities.map((s,i) => {
        const tot = entities ? entities.reduce((a,i) => {
            return i.types.reduce((aa,ii) => {
                return ii.products.reduce((aaa,iii) => {
                    const product = iii.bill_details.find( bd => !bd.rs )
                    return product ? aaa + parseFloat(product.net) : aaa
                },0) + aa
            },0) + a
        },0) : 0
        
        return {
            name: s.name, 
            value: reduceType(s.types, params).toFixed(0),
            key:s.id, 
            percent: tot === 0 ? 0 : (reduceType(s.types, params)/tot)*100,
            invoices: uniq(getUniqueBillsSegment(s, params)).length,
            products: s.types.reduce((a,i) => {
                const products = i.products.filter(p => p.bill_details.find(bd => !bd.rs))
                return [...a, ...products]
            },[]).length,
            patricia: s.types.reduce((a,i) => {
                return i.products.reduce((aa,ii) => {
                    const product = ii.bill_details.find(bd => !bd.rs && bd.bill.operator.id === 3)
                    return product ? aa + parseFloat(product.net) : aa
                },0) + a
            },0).toFixed(0),
            kerta: s.types.reduce((a,i) => {
                return i.products.reduce((aa,ii) => {
                    const product = ii.bill_details.find(bd => !bd.rs && bd.bill.operator.id === 2)
                    return product ? aa + parseFloat(product.net) : aa
                },0) + a
            },0).toFixed(0),
            Admin: s.types.reduce((a,i) => {
                return i.products.reduce((aa,ii) => {
                    const product = ii.bill_details.find(bd => !bd.rs && bd.bill.operator.id === 1)
                    return product ? aa + parseFloat(product.net) : aa
                },0) + a
            },0).toFixed(0),
            children: s.types.map(t => {
                const totC = s.types ? reduceType(s.types, params) : 0

                return {
                    name:t.name, value:t.products.reduce((aa,ii) => {
                        const product = ii.bill_details.find(bd => !bd.rs)
                        return product ? aa + parseFloat(product.net) : aa
                    },0).toFixed(0), key: t.id,
                    percent: totC === 0 ? 0 : (reduceProducts(t.products)/totC)*100,
                    invoices: uniq(getUniqueBillsTypes(t), params).length,
                    products: t.products.filter(p => p.bill_details.find(bd => !bd.rs)).length,
                    patricia: t.products.reduce((aa,ii) => {
                        const product = ii.bill_details.find(bd => !bd.rs && bd.bill.operator.id === 3)
                        return product ? aa + parseFloat(product.net) : aa
                    },0).toFixed(0),
                    kerta: t.products.reduce((aa,ii) => {
                        const product = ii.bill_details.find(bd => !bd.rs && bd.bill.operator.id === 2)
                        return product ? aa + parseFloat(product.net) : aa
                    },0).toFixed(0),
                    Admin: t.products.reduce((aa,ii) => {
                        const product = ii.bill_details.find(bd => !bd.rs && bd.bill.operator.id === 1)
                        return product ? aa + parseFloat(product.net) : aa
                    },0).toFixed(0),
                }
            })
        }
        
    }) : []

    return (
        <Row gutter={[8,8]}>
            <Col span="24">
                <Card title="Total des ventes de l'Année par Segment">
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <RangePicker
                            format="YYYY-MM-DD" style={{flexGrow:1,marginBottom:"4px"}}
                            defaultValue={[moment(today,"YYYY-MM-DD"),moment(today,"YYYY-MM-DD")]}
                            onCalendarChange={
                                (d,s) => {
                                    setDateFilter({start:s[0], end:s[1]})
                                }
                            }
                        />
                        <Button type="primary" onClick={
                            () => {
                                read()
                            }
                        }>Chercher</Button>
                    </div>
                    <Table dataSource={data} columns={cols} size="small" style={{
                        overflowX:"scroll", }} pagination={false} loading={status && status.isFetching} bordered />
                </Card>
            </Col>
        </Row>
    )
}

export default ChartArea

const reduceProducts = (arr) => {
    return arr.reduce((aa,ii) => {
            const product = ii.bill_details.find(bd => !bd.rs)
            return product ? aa + parseFloat(product.net) : aa
    },0)
}

const getUniqueBillsTypes = type => {
    const products_bill = type.products.reduce((b,j) => {
        const bill_detail_bill = j.bill_details.find(bd => !bd.rs)
        const id = bill_detail_bill ? bill_detail_bill.bill.id : null
        return id ? [...b, id] : b
    },[])
    return products_bill
}