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

const todoData = new TodoBuilder()
    .withTitle('TODO')
    .withDoneStatus(false)
    .withDescription('description')
    .build()

test(
    'Создать todo и проверить название, статус, описание',
    { tag: ['@post'] },
    async ({ api }) => {
        const token = getToken()
        let response = await api.todos.post(token, todoData)

        expect(response.id).toBeTruthy()
        expect(response.title).toEqual('TODO')
        expect(response.doneStatus).toEqual(false)
        expect(response.description).toEqual('description')
    },
)

test(
    'Get /todos и проверить что длина списка больше 1',
    { tag: ['@get'] },
    async ({ api }) => {
        const token = getToken()
        let response = await api.todos.get(token)
        expect(response.todos.length).toBeGreaterThan(1)
    },
)

test(
    'Get /todo и проверить что возвращает 404',
    { tag: ['@get'] },
    async ({ api }) => {
        const token = getToken()
        let status = await api.todos.getErrorStatusTodos(token)
        expect(status).toEqual(404)
    },
)

test(
    'Get /todos c id = 1 и проверить что id = 1 и title = scan paperwork',
    { tag: ['@get'] },
    async ({ api }) => {
        const token = getToken()
        let response = await api.todos.getTodoById(token, 1)
        expect(response.todos[0].id).toEqual(1)
        expect(response.todos[0].title).toEqual('scan paperwork')
    },
)

test(
    'Get /todos/{id} и проверить что возвращает 404',
    { tag: ['@get'] },
    async ({ api }) => {
        const token = getToken()
        let status = await api.todos.getErrorStatusTodoById(token)
        expect(status).toEqual(404)
    },
)

const todoData2 = new TodoBuilder()
    .withTitle('TODO')
    .withDoneStatus(true)
    .withDescription('description')
    .build()

test(
    'Get /todos with doneStatus = true и проверить что doneStatus = true',
    { tag: ['@get'] },
    async ({ api }) => {
        const token = getToken()
        //создаем todo with donestatus = true
        let todo = await api.todos.post(token, todoData2)

        let response = await api.todos.getTodosWithDoneStatusTrue(token)
        expect(response.todos[0].doneStatus).toBeTruthy()
    },
)
