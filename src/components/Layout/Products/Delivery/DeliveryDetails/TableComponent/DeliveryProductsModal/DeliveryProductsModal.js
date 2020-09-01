import React from 'react'
import { Modal } from 'antd'
import { Table } from '../../../../../../../utils'
// import ExportToExcel from '../../../../../../../utils'

export const DeliveryProductsModal = ({open, setOpen, read, status, entities, params, page,  ...props}) => {
    React.useEffect(() => {
        function fetch(){
            read({
                api: true,
            })
        }
        fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, open])

    const data = entities ? entities.map(product => ({
        key: product.id,
        codebarre: product.codebarre,
        description: product.description,
        "PU": product.pu,
        "CAA": product.caa,
        "PV": product.pv,
    })) : [{
        key: null,
        codebarre: null,
        description: null,
        "PU": null,
        "CAA": null,
        "PV": null,
    }]
    return (
        <Modal title='title' visible={open} centered
            footer={null}
            onCancel={() => setOpen(false)}
            closable={true}
            size="medium"
        >
            <Table
                page={props.page} setPage={props.setPage}
                data={data} loading={(status && status.isFetching) || false}
                pager={props.pagination} 
            />
        </Modal>
    )
}