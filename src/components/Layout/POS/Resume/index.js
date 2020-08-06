import React from 'react'
import { Row, Col, Divider } from 'antd'
import Cards from './Cards'
import { transformDateFormat } from '../../../../utils'
import TableComponent from './TableComponent'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'

const Resume = (props) => {
  return (
    <ReadEntities entityName="cloture" params={{month: transformDateFormat(new Date())}}>
      {
        closeProps => (
          <Row>
              <Col span={24}>
                <ReadEntities entityName="service" params={{ date: transformDateFormat(new Date()) }}>
                {
                  rest => (
                    <ReadEntities entityName="cashin" params={{ day: transformDateFormat(new Date()) }}>
                      {
                        cashProps => (
                          <ReadEntities entityName="bill" params={{ today: transformDateFormat(new Date()) }}>
                            {
                              billProps => (
                                <Cards
                                  {...billProps} closeHistory={closeProps.entities} cashProps={cashProps} service={rest}
                                />
                              )
                            }
                          </ReadEntities>
                        )
                      }
                    </ReadEntities>
                  )
                }
              </ReadEntities>
              </Col>
              <Col span={24} style={{marginTop:"16px"}}>
                <Divider>Historique Mensuelle</Divider>
                <TableComponent { ...closeProps } />
              </Col>
          </Row>
        )
      }
    </ReadEntities>
  )
}

export default Resume
