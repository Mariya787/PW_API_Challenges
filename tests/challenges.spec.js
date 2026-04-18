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

test(
    'Получить challenges и проверить что их 59',
    { tag: ['@post'] },
    async ({ api, request }) => {
        const token = getToken()
        let response = await api.challenges.get(token)

        expect(response.challenges.length).toEqual(59)
    },
)
