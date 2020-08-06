import React from 'react'
import { Button, message } from 'antd'
import DeleteEntity from '../../../../../react-redux/Entity/Delete'

const DeleteForm = ({id}) => {
    return (
        <DeleteEntity entityName="expence" id={id}>
            {
                del => (
                    <Button type="danger" onClick={() => {
                        del.delete({
                            onSuccess: d => message.success("Dépense annulé avec succés"),
                            onFail: e => {
                                console.log(e)
                                message.success("Dépense annulé avec succés")
                            }
                        })
                    }} size="small" style={{marginTop: "4px"}}>Suppriner</Button>
                )
            }
        </DeleteEntity>
    )
}

export default DeleteForm