import { users } from "./services/users.js"
import {  usersRepositories } from './services/repositories.js'
import { lastEvents } from "./services/events.js"

function getUserProfiles(userName) {
    users(userName).then(usersData => {

        if(usersData.message === 'Not Found') {
            document.querySelector('.results').innerHTML = `<h3>Usuário não encontrado</h3>`
            return
        }

        let usersInfo = `
                            <div class="info">
                                <img src="${usersData.avatar_url}" alt="Foto de perfil do usuário" />
                                <div class="data">
                                    <h2>${usersData.name ?? `O Usuário @${usersData.login} não possui nome cadastrado`}</h2>
                                    <p>${usersData.bio ?? 'O usuário não possui bio cadastrada'}</p>
                                </div>
                            </div>

                            <div class="statistics">
                                <div>
                                    <h3>👥Seguidores</h3>
                                    <span>${usersData.followers}</span>
                                </div>
                                <div>
                                    <h3>👥Seguindo</h3>
                                    <span>${usersData.following}</span>
                                </div>
                                <div>
                                    <h3>📂Repositórios</h3>
                                    <span>${usersData.public_repos}</span>
                                </div>
                            </div>
                        `
        document.querySelector('.results').innerHTML = usersInfo
    })
}


function getUsersRepositories(userName) {
    usersRepositories(userName).then(reposData => {
        let repositories = ''

        reposData.forEach(repo => {
            repositories += `
                            <li>
                                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                                <div class="repositories-stats">
                                    <div>
                                        <i class="fa-solid fa-code-fork"></i> ${repo.forks_count}
                                    </div>
                                    <div>
                                        <i class="fa-solid fa-star"></i> ${repo.stargazers_count}
                                    </div>
                                    <div>
                                        <i class="fa-solid fa-eye"></i> ${repo.watchers_count}
                                    </div>
                                    <div>
                                        <i class="fa-solid fa-code"></i> ${repo.language}
                                    </div>
                                </div>
                            </li>`
        })

        document.querySelector('.results').innerHTML += `
            <div class="repositories">
                <h2>Repositórios</h2>
                <ul>${repositories}</ul>
            </div>
        `
    })
}

let lastEventsOnCommits = []

function getUsersLastEvents(userName) {
    lastEvents(userName).then(lastEventsData => {
        
        let lastEventsList = ''

        lastEventsData.forEach(lastEvent => {
            if(lastEvent.payload.commits) {
                lastEventsOnCommits.push(lastEvent)
            }
        })

        lastEventsOnCommits.forEach(commmitEvent => {
            lastEventsList += `<li><strong>${commmitEvent.repo.name}</strong> - ${commmitEvent.payload.commits[0].message}</li>`
        })

        //limpando o array para evitar o acumulo de eventos do usuário
        if(lastEventsOnCommits.length !== 0) {
            lastEventsOnCommits = []
        }

        document.querySelector('.results').innerHTML +=     `
                                                                <div class="events">
                                                                    <h2>Eventos</h2>
                                                                    <ul>${lastEventsList}</ul>
                                                                </div>
                                                            `
    })
}

//eventos
document.getElementById('btn-search').addEventListener('click', () => {

    //aplicando estilo na SECTION RESULTS
    
    
    const userName = document.getElementById('search-profile').value
    if(userName.length === 0) {
        alert('Preencha o cammpo com o nome do usuário no Github')
        return
    } else {
        const sectionResultsStyle = document.querySelector('.results')
        sectionResultsStyle.style.backgroundColor = 'white'
    }
    getUserProfiles(userName)
    getUsersRepositories(userName)
    getUsersLastEvents(userName)
})

document.getElementById('search-profile').addEventListener('keyup', (event) => {

    //aplicando o estilo na SECTION RESULTS
    const userName = event.target.value
    const keyEnter = event.which || event.keyCode
    if(keyEnter === 13) {

        if(userName.length === 0) {
            alert('Preencha o cammpo com o nome do usuário no Github')
            document.querySelector('.results').style.background = 'none'
            return
        } else {
            const sectionResultsStyle = document.querySelector('.results')
            sectionResultsStyle.style.backgroundColor = 'white'
        }
        getUserProfiles(userName)
        getUsersRepositories(userName)
        getUsersLastEvents(userName)
    }
})