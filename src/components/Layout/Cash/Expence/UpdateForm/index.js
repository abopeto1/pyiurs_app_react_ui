import React from 'react'
import { Button, Modal, Space, message } from 'antd'
import UpdateEntity from '../../../../../react-redux/Entity/Update'
import { print } from '../../../../../utils'

const UpdateForm = ({id}) => {
    const form = {statut: true}
    const [visible, setVisible] = React.useState(false)

    return (
        <UpdateEntity entityName="expence" id={id}>
            {
                up => (
                    <div>
                        <Button type="primary" onClick={() => {
                            if(sessionStorage.id !== (4).toString()) {
                                message.error("Vous n'avez pas le droit de valider une dépense");
                                return 1
                            }
                            setVisible(true)
                            }} >Valider</Button>
                        <Modal visible={visible} centered footer={null} onCancel={() => setVisible(true)}>
                            Voulez-vous valider la dépense??
                            <div>
                                <Space>
                                    <Button loading={up.status && up.status.isFetching} type="primary" onClick={
                                        () => up.update(form,{
                                            onSuccess: e => {
                                                setVisible(false)
                                                message.success("Dépense validé avec succés")
                                                print(e.id, up.entityName)
                                            },
                                            onFail: e => {
                                                message.error("Something Wrong")
                                                console.log(e)
                                            }
                                        })
                                    }>Valider</Button>
                                    <Button type="danger" onClick={() => setVisible(false)}>Annuler</Button>
                                </Space>
                            </div>
                        </Modal>
                    </div>
                )
            }
        </UpdateEntity>
    )
}

export default UpdateForm