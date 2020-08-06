import React from 'react'
import { Row,Button,Col } from 'antd'
import { ExcelRenderer } from 'react-excel-renderer'
import EditableTable from './EditableTable'
import { baseUrl } from '../../../../../../redux/services/api'
import Create from '../../../../../../react-redux/Entity/Create'
// import UpdateSingleEntity from '../../../../../../react-redux/Entity/Update'

const CreateForm = (props) => {
  const { warehouseId,info } = props
  const [data,setData] = React.useState([])

  const submitFile = (e) => {
    const fileobj = e.target.files[0]

    ExcelRenderer(fileobj, (err, resp) => {
      if(err){
        console.log(err)
      } else {
        const excelData = resp.rows.filter((r,i) => i !== 0)
        const dataForm = excelData.map((d,i) => ({
          postType:d[0], cat:d[1], codebarre:d[2], taille:''+d[3], pu:d[4], couleur:d[5], marque:d[6],
          description:d[7], codeLivraison:d[8],
          caa: d[9], pv: d[10], source: d[11], segment: d[12], warehouse: `/api/warehouses/${warehouseId}`
        }))
        setData(dataForm)
      }
    })
  }

  return (
    <Row>
      <Col span={24}>
        <Row>
          <Col span={12} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Button type="link" href={`${baseUrl}/files/product-stock-template.xlsx`}>Fichier Modele</Button>
          </Col>
          <Col span={12} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <input type="file" name="file" onChange={submitFile} />
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{marginTop:"16px"}}>
        <Create entityName="delivery" info={info}>
          {
            props => <EditableTable {...props} data={data} setData={setData} warehouseId={warehouseId} />
          }
        </Create>
      {/* <UpdateSingleEntity entityName="warehouse" id={warehouseId} info={info}>
        { props => <EditableTable { ...props } data={data} setData={setData} />}
      </UpdateSingleEntity> */}
      </Col>
      </Row>
  )
}

export default CreateForm
