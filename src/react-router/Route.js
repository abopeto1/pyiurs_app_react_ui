import React from 'react'
import { Redirect } from 'react-router-dom'
import { isAuth } from '../utils/getToken'
import { isGranted } from '../utils/isGranted'
import MainLayout from './MainLayout'
import ReadEntity from '../react-redux/Entity/Read/Entity'

export const Route = ({ component: Component, roles, path, ...props }) => {
    roles = roles || []
    return (
        <React.Fragment>
            {
                isGranted(roles)
                ?
                <ReadEntity entityName="taux" id={1}>
                    {
                        rest => (
                            <MainLayout {...props} roles={roles} path={path} taux={rest} >
                                {
                                    p => <Component {...p} />
                                }
                            </MainLayout>
                        )
                    }
                </ReadEntity>
                    : (
                        isAuth() || console.log(isAuth()) ? (
                            <div>Unauthorized</div>
                        ) : (
                                <Redirect to="/login" />
                            )
                    )
            }
        </React.Fragment>
    )
}