import React, { useRef, useState } from 'react'
import { Input, Form, message } from 'antd'
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons'
import { store } from '../../../../../../../App'
import { updateEntity } from '../../../../../../../redux/actions'

const SearchForm = props => {
    const { value, setValue, } = props
    const [status, setStatus] = useState(false)
    const ref = useRef()
    
    const update = () => {
        setStatus(true)
        props.read({
            api:true,
            onSuccess: d => {
                const ip = d.find(p => !p.status)
                if(!ip) {
                    message.error("Produit non trouvé")
                    setStatus(false)
                    return
                }
                store.dispatch(
                    updateEntity('inventory_product',ip.id, {status: true}, {
                        api: true,
                        onSuccess: dd => {
                            message.success("Produit Scanné avec succées")
                            setValue("")
                            props.setReload(value)
                            setStatus(false)
                            ref.current.focus()
                        },
                        onFail: e => {
                            message.error("Produit non trouvé")
                            console.log("Error :" + e)
                            setStatus(false)
                        }
                    })
                )
            },
            onFail: e => {
                message.error("Produit non trouvé")
                console.log("Error " + e)
                setStatus(false)
            }
        })
    }
    
    return (
        <Form onFinish={() => update()}>
            <Form.Item>
                <Input
                    suffix={status ? <LoadingOutlined /> : <SearchOutlined />}
                    value={value} placeholder="Codebarre"
                    onChange={e => {
                        setValue(e.target.value)
                    }} readOnly={status}
                    disabled={status}
                    ref={ref}
                />
            </Form.Item>
        </Form>
    )
}

export default SearchForm