/* Dependencies */
import React from 'react'
import { Table as TableAntd } from 'antd'
import PropTypes from 'prop-types'
import { setTableColumns } from '../'
import styled from 'styled-components'
import { upperFirst } from 'lodash'

const TableComponent = styled(TableAntd)`
    & .ant-table-tbody {
        background: white;
    }
`

export const Table = ({ loading, data, entityName, pager, setPage, page, ...props}) => {
    const [searchedText, setSearchedText] = React.useState("")
    const [filterColumn, setFilterColumn] = React.useState("")

    const columns = setTableColumns(data, entityName, searchedText, setSearchedText, filterColumn, setFilterColumn)
    const datas = !data || !data[0] || (data[0].key === null || data[0].key === undefined || data[0].key === 0) ? [] : data

    return (
        <TableComponent
            {...props} dataSource={datas} columns={columns} scroll={{ x: true, }}
            loading={loading} size="small" bordered={props.bordered}
            locale={{
                emptyText: `No ${upperFirst(entityName)} Found`
            }}
            
            pagination={
                pager && pager.total_items > 10 ? 
                    {
                        current: page,
                        total: pager.total_items,
                        onChange: (val) => {console.log(val);setPage(val);},
                    } : false 
                }
        />
    )
}

Table.propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
}
