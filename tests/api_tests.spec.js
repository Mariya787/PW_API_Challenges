import { test } from '../src/helpers/fixtures/fixture'
import { expect } from '@playwright/test'
import { Api } from '../src/services/api.service'
//todo
const urlApi = 'https://apichallenges.eviltester.com'
test('Получить токен доступа', async ({ request }) => {
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
    const api = new Api(request)
    const token = await api.challenger.post()
    let response = await api.challenges.get(token)

    expect(response.challenges.length).toEqual(59)

    response = await request.get(`${urlApi}/challenges`, {
        headers: {
            'X-CHALLENGER': token,
        },
    })
    let r = await response.json()
    expect(r.challenges.length).toEqual(59)

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
    expect(r.description).toEqual('description')
})
