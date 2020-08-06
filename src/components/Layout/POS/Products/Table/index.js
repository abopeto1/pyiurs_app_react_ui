/* Dependencies */
import React from 'react'
import { Table, Grid } from 'antd'
import { getColumnSearchProps } from '../../../../../utils'

const TableComponent = (props) => {
  const { entities, read, status } = props
  const bk = Grid.useBreakpoint()
  React.useEffect(read,[])

  const [searchedText, setSearchedText] = React.useState("")
  const [filterColumn, setFilterColumn] = React.useState("")

  const columns = [
    {
      title:"ID",dataIndex:"key",key:"0",
    },
    {
      title:"Codebarre",dataIndex:"codebarre",key:"1",
      sorter: (a, b) => {
        const n = a.codebarre.toUpperCase()
        const m = b.codebarre.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('codebarre', setSearchedText, searchedText, filterColumn, setFilterColumn)
    },
    {
      title:"Segment",dataIndex:"segment",key:"2",
      sorter: (a, b) => {
        const n = a.segmenttype.toUpperCase()
        const m = b.segmenttype.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('segmenttype', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
    {
      title:"Type",dataIndex:"type",key:"3",
      sorter: (a, b) => {
        const n = a.type.toUpperCase()
        const m = b.type.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('type', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
    {
      title:"Catégorie",dataIndex:"cat",key:"4",
      sorter: (a, b) => {
        const n = a.cat.toUpperCase()
        const m = b.catmarque.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('cat', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
    {
      title:"Marque",dataIndex:"marque",key:"5",
      sorter: (a, b) => {
        const n = a.marque.toUpperCase()
        const m = b.marque.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('marque', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
    {
      title:"Couleur",dataIndex:"couleur",key:"6",
      sorter: (a, b) => {
        const n = a.couleur.toUpperCase()
        const m = b.couleur.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('couleur', setSearchedText, searchedText, filterColumn, setFilterColumn)
    },
    {
      title:"Taille",dataIndex:"taille",key:"7",
      sorter: (a, b) => {
        const n = a.taille.toUpperCase()
        const m = b.taille.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('taille', setSearchedText, searchedText, filterColumn, setFilterColumn)
    },
    {
      title:"PU",dataIndex:"pu",key:"8",
      sorter: (a, b) => a.pu - b.pu,
      ...getColumnSearchProps('pu', setSearchedText, searchedText, filterColumn, setFilterColumn),
    },
    {
      title:"CAA",dataIndex:"caa",key:"9", sorter: (a, b) => a.caa - b.caa,
      ...getColumnSearchProps('caa', setSearchedText, searchedText, filterColumn, setFilterColumn)
    },
    {
      title:"PV",dataIndex:"pv",key:"10",render: text => <strong>{`${text} $`}</strong>,
      sorter: (a, b) => a.pv - b.pv,
      ...getColumnSearchProps('pv', setSearchedText, searchedText, filterColumn, setFilterColumn)
    },
    {
      title:"Code Livraison",dataIndex:"code_livraison",key:"11",
      sorter: (a, b) => {
        const n = a.code_livraison.toUpperCase()
        const m = b.code_livraison.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('code_livraison', setSearchedText, searchedText, filterColumn, setFilterColumn)
    },
    {
      title:"Source",dataIndex:"source",key:"12",
      sorter: (a, b) => {
        const n = a.source.toUpperCase()
        const m = b.source.toUpperCase()
        return n < m ? -1 : n > m ? 1 : 0
      },
      ...getColumnSearchProps('source', setSearchedText, searchedText, filterColumn, setFilterColumn)
    },
  ]

  const data = entities !== undefined ? entities.reduce((a,i) => {
    return [
      ...a,{
        ...i, key:i.id, segment: i.segment.label, type: i.type.name,
      }
    ]
  },[]) : []

  return (
    <Table bordered columns={columns} dataSource={data}
      loading={status && status.isFetching} size="small"
      style={{
        overflowX: 'scroll', backgroundColor: bk['xs'] || bk['sm'] ? 'white' : 'none'
      }}
    />
  )
}

export default TableComponent
