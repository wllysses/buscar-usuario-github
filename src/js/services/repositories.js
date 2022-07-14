import { baseUrl, quantity } from '../variables.js'

async function usersRepositories(userName) {
    const url = `${baseUrl}/${userName}/repos?per_page=${quantity}`
    const response = await fetch(url)
    return await response.json()
}

export { usersRepositories }