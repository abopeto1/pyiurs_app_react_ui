import React from 'react'
import CardsResume from './Cards'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'
import { transformDateFormat } from '../../../../utils'
import History from './History'

export const Resume = () => {
  return (
    <div style={{padding:"8px"}}>
      <ReadEntities entityName="type" params={{ statut: "closed", date: transformDateFormat(new Date()) }}>
      {
        closedProps => (
          <ReadEntities
            closed={closedProps} entityName="type"
            params={{ statut: "selled", date: transformDateFormat(new Date()) }}
          >
            {
              selledProps => (
                <ReadEntities
                  entityName="type"
                  params={{ statut: "added", date: transformDateFormat(new Date()) }}>
                  {
                    addedProps => (
                      <ReadEntities entityName="type" params={{ statut: "open", date: transformDateFormat(new Date()) }} >
                        {
                          openProps => (
                            <CardsResume
                              open={openProps} added={addedProps}
                              selled={selledProps} closed={closedProps}
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
        )
      }
      </ReadEntities>
      <ReadEntities entityName="stock_log" params={{ month: transformDateFormat(new Date()), }}>
        {
          rest => (
            <History { ...rest } />
          )
        }
      </ReadEntities>
    </div>
  )
}
