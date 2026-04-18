import { test } from '../src/helpers/fixtures/fixture'
import { expect } from '@playwright/test'
import fs from 'fs'
//todo

const getToken = () => {
    return (
        process.env.AUTH_TOKEN ||
        JSON.parse(fs.readFileSync('auth-token.json', 'utf-8')).key
    )
}

const urlApi = 'https://apichallenges.eviltester.com'
test('Получить токен доступа', async ({ api }) => {
    /*
    // Получить ключ авторизации
    let response = await request.post(`${urlApi}/challenger`)
    // КОнвертировать хедеры в Json
    const headers = response.headers()

    // Вытащить токен из хедера
    const key = headers['x-challenger']
    const link = `${urlApi}${headers.location}`

    console.log(link)
    expect(headers['x-challenger'].length).toEqual(36)
    */

    const token = getToken()
    let response = await api.challenges.get(token)

    expect(response.challenges.length).toEqual(59)

    //let r = await response.json()

    console.log(response)

    /*expect(r.challenges.length).toEqual(59)

    response = await request.post(`${urlApi}/todos`, {
        headers: {
            'X-CHALLENGER': token,
        },
        // унести в билдер
        data: {
            title: 'title',
            doneStatus: false,
            description: 'description',
        },
    })
    r = await response.json()
    expect(r.id).toBeTruthy()
    expect(r.title).toEqual('title')
    expect(r.doneStatus).toEqual(false)
    expect(r.description).toEqual('description')*/
})
