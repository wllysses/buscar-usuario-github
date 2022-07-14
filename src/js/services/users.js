import { baseUrl } from '../variables.js'

async function users(userName) {
    const url = `${baseUrl}/${userName}`
    const response = await fetch(url)
    return await response.json()
}

export { users }