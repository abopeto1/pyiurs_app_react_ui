import { baseUrl } from '../redux/services/api'

// Open a new tab with the pdf of entity to print
export const print = (id, entityName) => {
    window.open(`${baseUrl}/pdf/${entityName}/${id}`)
}