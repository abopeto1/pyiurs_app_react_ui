import React from 'react'
import moment from 'moment'
import { Table, Grid, Tag, Form, Select, DatePicker, Button, Space } from 'antd'
import { UserAddOutlined, CalendarFilled } from '@ant-design/icons'
import { transformDateFormat, getColumnSearchProps } from '../../../../../utils'

const Reports = (props) => {
    const { entities, read, status, setFilter, setDateFilter } = props
    const bk = Grid.useBreakpoint()
    const { RangePicker} = DatePicker

    const [searchedText, setSearchedText] = React.useState("")
    const [filterColumn, setFilterColumn] = React.useState("")
    const filters = [
        { value: "created", label: "Date de Création", icon:<UserAddOutlined />, },
        { value: "bill_created", label: "Période d'Achat", icon: <CalendarFilled /> },
    ]

    const columns = [
        {
            key: 0, title: "Nom", dataIndex: 'name',
            sorter: (a, b) => {
                const n = a.name.toUpperCase()
                const m = a.name.toUpperCase()
                return n < m ? -1 : n > m ? 1 : 0
            },
            ...getColumnSearchProps('name', setSearchedText, searchedText, filterColumn, setFilterColumn),
        },
        {
            title: "Téléphone", key: 1, dataIndex: "telephone",
            sorter: (a, b) => a.telephone - b.telephone,
            ...getColumnSearchProps('telephone', setSearchedText, searchedText, filterColumn, setFilterColumn),
        },
        {
            key: 2, title: "Total Achat", dataIndex: "total_article_sell",
            sorter: (a, b) => a.total_article_sell - b.total_article_sell,
            ...getColumnSearchProps('total_article_sell', setSearchedText, searchedText, filterColumn, setFilterColumn),
        },
        {
            key: 3, title: "Total Article", dataIndex: "total_article_count",
            sorter: (a, b) => a.total_article_count - b.total_article_count,
            ...getColumnSearchProps('total_article_count', setSearchedText, searchedText, filterColumn, setFilterColumn),
        },
        {
            key: 4, title: "Points de Fidélité", dataIndex: "points",
            sorter: (a, b) => a.points - b.points,
            ...getColumnSearchProps('points', setSearchedText, searchedText, filterColumn, setFilterColumn),
        },
        {
            key: 5, Title: "Date d'inscription", dataIndex: "created",
            sorter: (a, b) => {
                const n = a.created.toUpperCase()
                const m = a.created.toUpperCase()
                return n < m ? -1 : n > m ? 1 : 0
            },
            ...getColumnSearchProps('created', setSearchedText, searchedText, filterColumn, setFilterColumn),
        },
        {
            key: 6, title: "Catégorie", dataIndex: 'category',
            sorter: (a, b) => {
                const n = a.category.toUpperCase()
                const m = a.category.toUpperCase()
                return n < m ? -1 : n > m ? 1 : 0
            },
            ...getColumnSearchProps('category', setSearchedText, searchedText, filterColumn, setFilterColumn),
            render: (v, r) => (
                <Tag color={r.cid === 1 ? "#f06292" : r.cid === 2 ? "#b2ebf2" : r.cid === 3 ? "#303f9f" : "#cddc39"}>{v}</Tag>
            ),
        },
    ]

    const data = entities !== undefined ? entities.map(c => ({
        name: c.name,
        telephone: c.telephone,
        totalSell: c.bills ? c.bills.reduce((a, i) => { return i.type_paiement.id === 2 ? a + parseFloat(i.accompte) : a + parseFloat(i.net) }, 0) : 0,
        totalProduct: c.bills ? c.bills.reduce((acc, item) => { return acc + parseFloat(item.bill_details.filter(bd => !bd.rs).length) }, 0) : 0,
        points: c.points, created: c.created !== undefined ? transformDateFormat(new Date(c.created)) : "inconnue",
        category: c.categorie ? c.categorie.name : "",
        key: c.id,
        cid: c.categorie.id,
    })) : []

    return (
        <div>
            <Form onFinish={() => read()} style={{display:"flex", justifyContent:"center"}}>
                <Form.Item style={{marginRight:8}}>
                    <Select defaultValue="created" onChange={(value) => setFilter(value)}>
                        {
                            filters.map(f => (
                                <Select.Option key={f.value} value={f.value}>
                                    <i style={{marginLeft:2}}>{f.icon}</i>{f.label}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item style={{ flexGrow: 1, display:"flex" }}>
                    <Space>
                        <RangePicker
                            format="YYYY-MM-DD" style={{ flexGrow: 1, marginBottom: "4px" }}
                            defaultValue={[moment(new Date(), "YYYY-MM-DD"), moment(new Date(), "YYYY-MM-DD")]}
                            onCalendarChange={
                                (d, s) => {
                                    setDateFilter({ start: s[0], end: s[1] })
                                }
                            }
                        />
                        <Button type="primary" onClick={() => read()}>Chercher</Button>
                    </Space>
                </Form.Item>
            </Form>
            <Table
                dataSource={data} columns={columns} loading={status && status.isFetching}
                style={{
                    overflowX: 'scroll', backgroundColor: bk['xs'] || bk['sm'] ? 'white' : 'none',
                }} size="small"
            />
        </div>
    )
}

export default Reports