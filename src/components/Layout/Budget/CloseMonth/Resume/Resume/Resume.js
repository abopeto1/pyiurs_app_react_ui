import React from 'react'
import ReadEntities from '../../../../../../react-redux/Entity/Read/Entities'
import { ResumeTable } from './ResumeTable/ResumeTable'

export const Resume = (props) => {
    const {  reload, month } = props

    return (
        <div style={{ width: '100%'}}>
            <ReadEntities entityName="dashboard" params={{ value: 'cash', month: month}}>
                {
                    rest => <ResumeTable {...rest} title="Revenus & Entrée Cash" reload={reload} />
                }
            </ReadEntities>

            <ReadEntities entityName="dashboard" params={{ value: 'expence', month: month }}>
                {
                    rest => <ResumeTable {...rest} title="Dépenses" reload={reload} />
                }
            </ReadEntities>
            
            <ReadEntities entityName="dashboard" params={{ value: 'stock', month: month }}>
                {
                    rest => <ResumeTable {...rest} title="Stock" reload={reload} />
                }
            </ReadEntities>

            <ReadEntities entityName="dashboard" params={{ value: 'customer', month: month }}>
                {
                    rest => <ResumeTable {...rest} title="Clients" reload={reload} />
                }
            </ReadEntities>

            <ReadEntities entityName="dashboard" params={{ value: 'customer_categorie', month: month }}>
                {
                    rest => <ResumeTable {...rest} title="Categorie Clients" reload={reload} />
                }
            </ReadEntities>

            <ReadEntities entityName="dashboard" params={{ value: 'kpis', month: month }}>
                {
                    rest => <ResumeTable {...rest} title="Autres Kpis" reload={reload} />
                }
            </ReadEntities>
        </div>
    )
}