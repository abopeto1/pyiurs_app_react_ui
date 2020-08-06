import {getToken} from './getToken'

export const isGranted = (roles = []) => {
    const token = getToken()

    if(roles.length > 0 && (token === null || Array.isArray(token.roles) === false)){
        return false
    }

    return roles.every(role => token.roles.includes(role))
}

