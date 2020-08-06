import React from 'react'
import { upperFirst } from 'lodash'
import { Button, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { PrinterOutlined } from '@ant-design/icons'
import { getColumnSearchProps } from './getColumnSearchProps'
import { baseUrl } from '../redux/services/api'

export const setTableColumns = (datas, entityName, searchedText, setSearchedText, filterColumn, setFilterColumn) => {
    // Get a sample from the datas array to create the column array properties
    const sample =  datas[0] || {}
    
    // Open a new tab with the pdf of entity to print
    const print = id => {
        window.open(`${baseUrl}/pdf/${entityName}/${id}`)
    }

    const linkedPage = sample.linkedPage
    const modals = sample.modals

    const columns = sample ? Object.keys(sample).filter(
            d => d !== "key" && d !== "children" && d !== "linkedPage" && d !== "modals"
        ).map(
            (d,i) => {
                return d === "print" ? 
                {
                    key: i, title: "", dataIndex: d,
                    render: v => (
                        <Button size="small" type="primary" onClick={() => print(v)} shape="round" icon={<PrinterOutlined />} />
                    ),
                } :  d === "statut" ? {
                    key: i, title: upperFirst(d), dataIndex: d,
                    render: v => <Tag color={v ? "#1890ff" : "#ff4d4f" } >{v ? "Validé" : "En cours de Validation"}</Tag>,
                } : d === "action" ? {
                    key: i, title: upperFirst(d), dataIndex: d,
                } : linkedPage && linkedPage[d] ? {
                    key: i, title: upperFirst(d), dataIndex: d, 
                    render: (v, r) => <Link to={{
                        pathname: `${linkedPage[d].pathname}/${r.key}`,
                        state: {
                            entity: r,
                        }
                    }}>{v}</Link>
                } : modals && modals[d] ? {
                    key: i, title: upperFirst(d), dataIndex: d,
                    render: (v, r) => (
                        <Tag
                            color={modals[d].color || 'default'}
                            onClick={modals[d].onClick}
                        >
                            {v}
                        </Tag>
                    )
                } : {
                    key: i,
                    title: upperFirst(d),
                    dataIndex: d,
                    sorter: typeof sample[d] === 'number' 
                    ? 
                        (a, b) => a[d] - b[d]
                    :
                        (a, b) => {
                            const n = a[d].toLowerCase()
                            const m = a[d].toLowerCase()
                            return n < m ? -1 : n > m ? 1 : 0
                        }
                    ,
                    ...getColumnSearchProps(d, setSearchedText, searchedText, filterColumn, setFilterColumn),
                }
    }) : []

    return columns
}