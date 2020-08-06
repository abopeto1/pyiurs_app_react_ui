export const getToken = () => {
    return {
        token: sessionStorage.token,
        roles: sessionStorage.getItem('roles') !== null ? (sessionStorage.getItem('roles')).split(',') : null
    }
}

export const isAuth = () => {
    return sessionStorage.token !== undefined && sessionStorage.token !== null
}