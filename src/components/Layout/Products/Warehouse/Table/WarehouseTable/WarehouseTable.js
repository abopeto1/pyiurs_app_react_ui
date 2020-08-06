/* Dependencies */
import React from 'react'
import { Typography, Row, Button, Modal } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import CreateForm from '../CreateForm'
import CreateEntity from '../../../../../../react-redux/Entity/Create'
import { Table } from '../../../../../../utils'

export const WarehouseTable = (props) => {
    const { Title } = Typography
    const { read, entities, status } = props
    const [visible, setVisible] = React.useState(false)

    React.useEffect(read, [])

    const data = entities !== undefined ? entities.map(warehouse => ({
        key: warehouse.id,
        nom: warehouse.name,
        "Stock Entrepot": warehouse.not_loaded_qte,
        "Valeur /Achat (PMP)": warehouse.not_loaded_value,
        "Valeur Vente": warehouse.not_loaded_sell_value,
        "Stock en Boutique": warehouse.loaded_qte,
        "Valeur /Achat": warehouse.loaded_value,
        "Valeur Vente Boutique": warehouse.loaded_sell_value,
        linkedPage:{
            nom: {
                pathname: "/stock/warehouses"
            }
        }
    })) : [{
        key: null,
        nom: null,
        "Stock Entrepot": null,
        "Valeur /Achat (PMP)": null,
        "Valeur Vente": null,
        "Stock en Boutique": null,
        "Valeur /Achat": null,
        "Valeur Vente Boutique": null,
    }]

    return (
        <div style={{ padding: '8px' }}>
            <Row style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Title level={2}>Entrepot</Title>
                <Button type="primary" shape="round" onClick={() => setVisible(true)} icon={<PlusCircleFilled />}>Créer</Button>
            </Row>
            <Table
                data={data} loading={(status && status.isFetching) || false }
            />
            <Modal title="Création Entrepot" visible={visible} centered
                footer={null} onCancel={() => setVisible(true)} closable={false}
            >
                <CreateEntity entityName='warehouse'>
                    {props => <CreateForm setVisible={setVisible} {...props} />}
                </CreateEntity>
            </Modal>
        </div>
    )
}
