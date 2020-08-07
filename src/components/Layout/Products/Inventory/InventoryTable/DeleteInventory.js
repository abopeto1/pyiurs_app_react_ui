import React from 'react'
import { Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

export const DeleteInventory = ({read, ...props}) => {
    const { confirm } = Modal

    const showConfirm = () => {
        confirm({
            title: 'Voulez vous effacer cet inventaire?',
            icon: <ExclamationCircleOutlined />,
            // content: 'When clicked the OK button, this dialog will be closed after 1 second',
            okText: "Supprimer",
            okType: "danger",
            onOk() {
              props.delete({
                  api: true,
                  onSuccess: () => {
                      read({ api: true, })
                  }
              })
            },
            onCancel() {},
          });
    }

    return (
        <Button type="danger" onClick={showConfirm}>Supprimer</Button>
    )
}