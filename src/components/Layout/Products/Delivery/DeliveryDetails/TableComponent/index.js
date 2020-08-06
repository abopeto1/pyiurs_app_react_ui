import React, {useEffect} from 'react'
import { Typography, Row, Col } from 'antd'
import { DeliveryStatistics } from './Statistisc'
import { Details } from './Details'
import Entities from '../../../../../../react-redux/Entity/Read/Entities'
import { DeliveryTypeTable } from './DeliveryTypeTable'
import { DeliveryProductsModal } from './DeliveryProductsModal'

const TableComponent = (props) => {
    const { read, entity, status, delivery, id } = props
    const { Title } = Typography
    const [open,setOpen] = React.useState(false)

    const [page, setPage] = React.useState(1)

    const [modalParams, setModalParams] = React.useState({
        page: 1,
        required:{}
    })

    useEffect(() => {
        function fetch(){
            read({ api: true})
        }
        fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div>
            <Title level={3}>{delivery ? delivery.name : entity && entity.name}</Title>
            <Title level={4}>
                Total : {delivery ? `${delivery.total} articles` : entity && `${entity.name} articles`}
            </Title>
            <Row gutter={8}>
                <Col xs={24} sm={12}>
                    <DeliveryStatistics delivery={entity} status={status} />
                </Col>
                <Col xs={24} sm={12}>
                    <Details delivery={entity && entity} status={status} />
                </Col>
            </Row>
            <Entities entityName="type" params={{ "products.delivery": id, page: page, }}>
                {
                    rest => (
                        <DeliveryTypeTable
                            {...rest} page={page} setPage={setPage}
                            setOpen={setOpen} modalParams={modalParams} setModalParams={setModalParams}
                        />
                    )
                }
            </Entities>
            <Entities entityName="product" params={{ "delivery": id, ...modalParams, ...modalParams.required }}>
                {
                    rest => (
                        <DeliveryProductsModal
                            open={open} setOpen={setOpen} { ...rest }
                            page={modalParams.page} required={modalParams.required}
                            setPage={(page) => setModalParams({ ...modalParams, page: page,})}
                        />
                    )
                }
            </Entities>
        </div>
    )
}

export default TableComponent
