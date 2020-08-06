import React, {useEffect} from 'react'
import { Table, Modal, Typography, Tag} from 'antd'
import ExportToExcel from '../../../../../../utils'

const TableComponent = (props) => {
    const { read, entities, status, delivery } = props
    const { Title } = Typography
    const [modal,setModal] = React.useState({
        visible:false,products:[],title:""
    })
    useEffect(read,[])
    
    const data = entities ? entities.map(d => ({
        ...d,
        total: d.products,
        selled: d.products.filter(p => p.stock && (p.stock.qte - p.stock.out_qte < 1)),
        notSelled: d.products.filter(p => p.stock && (p.stock.qte - p.stock.out_qte > 0)),
        loaded: d.products.filter(p => p.stock),notLoaded: d.products.filter(p => !p.stock),
        key: d.id,
    })) : []

    const columns = [
        {key:0, title: "Type", dataIndex:"name"},
        {key:1, title: "Total", dataIndex:"total",render:(v,r) => (
            <Tag color="#108ee9" onClick={() => {
                console.log(r.total);
                setModal({visible:true,products:r.total,title:`Total: ${r.name}`})
                }}>
                {r.total.length}
            </Tag>
        )},
        {key:5, title: "Non Chargés", dataIndex:"notLoaded",render:(v,r) => (
            <Tag color="#d9363e" onClick={() => setModal({visible:true,products:v,title:`Non Chargés: ${r.name}`})}>
                {r.notLoaded.length}
            </Tag>
        )},
        {key:2, title: "Chargés", dataIndex:"loaded",render:(v,r) => (
            <Tag color="#1890ff" onClick={() => setModal({visible:true,products:r.loaded,title:`Total: ${r.name}`})}>
                {r.loaded.length}
            </Tag>
        )},
        {
            key:3, title: "Vendus", dataIndex:"selled",render:(v,r) => (
                <Tag color="#e91e63" onClick={() => setModal({visible:true,products:r.selled,title:`Vendus: ${r.name}`})}>
                    {r.selled.length}
                </Tag>
            )
        },
        {
            key:4, title: "En Boutique", dataIndex:"notSelled",render:(v,r) => (
                <Tag color="#ff5722" onClick={() => setModal({visible:true,products:v,title:`En Boutique: ${r.name}`})}>
                    {r.notSelled.length}
                </Tag>
            )
        },
    ]

    const productColumns = [
        {key:0, title: "Codebarre", dataIndex:"codebarre"},
        {key:1, title: "PU", dataIndex:"pu",},
        {key:2, title: "CAA", dataIndex:"caa",},
        {key:2, title: "PV", dataIndex:"pv",},
    ]

    return (
        <div>
            <Title level={3}>{delivery ? delivery.name : ""}</Title>
            <Title level={4}>Total : {entities ? `${entities.reduce((a,i) => a+i.products.length,0)} articles` : ""}</Title>
            <p>
                <strong><i>Valeur Produits en Boutique :</i></strong>  {
                    entities ? entities.reduce((a,i) => {
                        const products = i.products.filter(p => p.stock && (p.stock.qte - p.stock.out_qte > 0))
                        return products.reduce((aa,p) => p.pu + p.caa + aa, 0) + a
                    },0).toFixed(0) : 0
                } $
            </p>
            <p>
                <strong><i>Valeur Produits en Entrepot :</i></strong> 
                {
                    entities ? entities.reduce((a, i) => {
                        const products = i.products.filter(p => !p.stock)
                        return products.reduce((aa, p) => p.pu + p.caa  + aa, 0) + a
                    }, 0).toFixed(0) : 0
                } $
            </p>
            <p>
                <strong><i>Valeur Produits Vendus :</i></strong>
                {
                    entities ? entities.reduce((a, i) => {
                        const products = i.products.filter(p => p.stock && (p.stock.qte - p.stock.out_qte < 1))
                        return products.reduce((aa, p) => {
                            const bd = p.bill_details.find(bd => !bd.rs)
                            return bd ? bd.net + aa : aa
                        }, 0) + a
                    }, 0).toFixed(0) : 0
                } $
            </p>
            <p>
                <strong><i>Taux de rentabilité :</i></strong>
                {
                    entities ? ((entities.reduce((a, i) => {
                        const products = i.products.filter(p => p.stock && (p.stock.qte - p.stock.out_qte < 1))
                        return products.length + a
                    }, 0) / entities.reduce((a, i) => i.products.length + a, 0))*100).toFixed(0) : 0
                } %
            </p>
            <Table dataSource={data} columns={columns} loading={status && status.isFetching} size="small" />
            <Modal title={modal.title} visible={modal.visible} centered
                footer={null} onCancel={() => setModal({...modal,visible:!modal.visible})} closable={true}
            >
                <ExportToExcel dataArray={modal.products} fileName={modal.title} 
                    style={{marginBottom:4}}
                />
                <Table 
                    dataSource={modal.products.map(p => ({ ...p, key:p.id}))} size="small"
                    columns={productColumns} loading={status && status.isFetching}
                />
            </Modal>
        </div>
    )
}

export default TableComponent
