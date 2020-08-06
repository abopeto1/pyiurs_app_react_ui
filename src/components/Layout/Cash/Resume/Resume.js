import React from 'react'
import ReadEntities from '../../../../react-redux/Entity/Read/Entities'
import { transformDateFormat } from './Cards/transformData'
import Index from './'

export const Resume = (props) => {
    return (
        <div style={{ padding: "8px" }}>
            <ReadEntities entityName="service" params={{ month: transformDateFormat(new Date()), }}>
                {
                    rest => (
                        <ReadEntities entityName="debit" params={{ date: transformDateFormat(new Date()), }}>
                            {
                                debitProps => (
                                    <ReadEntities entityName="bill" params={{ month: transformDateFormat(new Date()), }} >
                                        {
                                            billProps => (
                                                <ReadEntities {...billProps}
                                                    entityName="expence" params={{ month: transformDateFormat(new Date()), }} readBill={billProps.read} entitiesBill={billProps.entities}
                                                    statusBill={billProps.status}
                                                >
                                                    {
                                                        expenceProps => (
                                                            <ReadEntities {...expenceProps} entityName="cashin" expencesStatus={expenceProps.status}
                                                                params={{ month: transformDateFormat(new Date()) }} getExpences={expenceProps.read} expences={expenceProps.entities}
                                                            >
                                                                {
                                                                    cashProps => (
                                                                        <ReadEntities {...cashProps} entityName="credit" params={{}} getCashin={cashProps.read}
                                                                            cashins={cashProps.entities} cashinsStatus={cashProps.status}>
                                                                            {
                                                                                creditProps => (
                                                                                    <Index {...props} {...creditProps} getCredits={creditProps.read} credits={creditProps.entities}
                                                                                            creditsStatus={creditProps.status} debitProps={debitProps} service={rest}
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
                                )
                            }
                        </ReadEntities>
                    )
                }
            </ReadEntities>
        </div>

    )
}