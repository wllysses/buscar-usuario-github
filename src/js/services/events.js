import { baseUrl, quantity } from '../variables.js'

async function lastEvents(userName) {
    const url = `${baseUrl}/${userName}/events?per_page=${quantity}`
    const response = await fetch(url)
    return await response.json()
}

export { lastEvents }