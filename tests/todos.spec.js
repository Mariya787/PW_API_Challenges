import { test } from '../src/helpers/fixtures/fixture'
import { expect } from '@playwright/test'
import { TodoBuilder } from '../src/helpers/builders/index'
import fs from 'fs'

const getToken = () => {
    return (
        process.env.AUTH_TOKEN ||
        JSON.parse(fs.readFileSync('auth-token.json', 'utf-8')).key
    )
}

const data = new TodoBuilder()
    .withTitle('TODO')
    .withDoneStatus(false)
    .withDescription('description')
    .build()

test('Создать todo', { tag: ['@post'] }, async ({ api }) => {
    const token = getToken()
    let response = await api.todos.post(token, data)

    expect(response.id).toBeTruthy()
    expect(response.title).toEqual('TODO')
    expect(response.doneStatus).toEqual(false)
    expect(response.description).toEqual('description')
})
