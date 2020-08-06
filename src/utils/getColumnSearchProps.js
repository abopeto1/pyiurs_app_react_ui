import React from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'

const handleSearch = (selectedKeys, confirm, dataIndex, setSearchedText, setFilterColumn) => {
    setSearchedText(selectedKeys[0])
    setFilterColumn(dataIndex)
    confirm()
}

export const getColumnSearchProps = (dataIndex, setSearchedText, searchText,filterColumn, setFilterColumn) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
            <Input
                placeholder="Recherche"
                onChange={e => {
                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                }}
                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex, setSearchedText, setFilterColumn)}
                style={{ width: 188, marginBottom: 8, display: "block" }}
            />
        </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered && '#1890ff' }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
        if (visible) {
            // setTimeout(() => searchInput.select())
        }
    },
    render: text => dataIndex === filterColumn ? (
        <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]} autoEscape textToHighlight={text.toString()}
        />
    ) : text
})