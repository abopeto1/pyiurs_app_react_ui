import React from 'react'
import { Button, message, Popconfirm, } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'

export const AddSampleForm = ({ create, status, productId, ...props }) => {
    const [form, setForm] = React.useState({
        product: `/api/products/${productId}`,
    })

    const onReset = () => {
        setForm({ product: `/api/products/${productId}`, })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (!productId) {
            message.error("Produit Inconnu")
        } else {
            create(form, {
                api: true,
                onSuccess: (d) => {
                    message.success(`Echantillon ajouté avec succés`)
                    onReset()
                },
                onFail: () => {
                    message.error("Erreur lors de l'ajout d'un Echantillon")
                }
            })
        }
    }

    return (
        <div style={{ alignItems: "center", display: "flex", justifyContent: "flex-end"}}>
            <Popconfirm
                okText="Confirmer"
                cancelText="Annuler"
                title="Confirmer le remplacement de l'échantillon ?"
                onConfirm={onSubmit}
                disabled={!productId}
            >
                <Button
                    type="primary"
                    loading={status && status.isFetching} icon={<PlusCircleFilled />}
                    disabled={!productId}
                >
                    Ajouter
            </Button>
            </Popconfirm>
        </div>
    )
}
