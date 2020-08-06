import React from 'react'
import { Button } from 'antd'
import { FileExcelOutlined } from '@ant-design/icons'
import { write, utils } from 'xlsx'
import { saveAs } from 'file-saver'

const ExportToExcel = ({ dataArray, fileName, ...props}) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportToExcel = (dataArray, fileName) => {
        const ws = utils.json_to_sheet(dataArray);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
        const datas = new Blob([excelBuffer], {type: fileType})
        saveAs(datas, fileName + fileExtension)
    }

    return (
        <Button 
            type="primary" icon={<FileExcelOutlined />} onClick={(e) => exportToExcel(dataArray, fileName)}
            style={props.style}
        >
            Exporter
        </Button>
    )
}

export default ExportToExcel
