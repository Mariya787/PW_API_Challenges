import { test } from '../helpers/fixtures/fixture'

//todo
const urlApi = 'https://apichallenges.eviltester.com'

export class TodosService {
    constructor(request) {
        this.request = request
    }

    async post(token, data) {
        return test.step('Post /todos', async () => {
            const response = await this.request.post(`${urlApi}/todos`, {
                headers: {
                    'X-CHALLENGER': token,
                },

                data: data,
            })

            const r = await response.json()
            return r
        })
    }

    async get(token) {
        return test.step('Get /todos', async () => {
            const response = await this.request.get(`${urlApi}/todos`, {
                headers: {
                    'X-CHALLENGER': token,
                },
            })

            const r = await response.json()
            return r
        })
    }
    async getErrorStatusTodos(token) {
        return test.step('Get /todo', async () => {
            const response = await this.request.get(`${urlApi}/todo`, {
                headers: {
                    'X-CHALLENGER': token,
                },
            })

            const r = await response.status()
            return r
        })
    }
    async getTodoById(token, id) {
        return test.step('Get /todos', async () => {
            const response = await this.request.get(`${urlApi}/todos/${id}`, {
                headers: {
                    'X-CHALLENGER': token,
                },
            })

            const r = await response.json()
            return r
        })
    }
    async getErrorStatusTodoById(token) {
        return test.step('Get /todos/{id}', async () => {
            const response = await this.request.get(`${urlApi}/todos/{id}`, {
                headers: {
                    'X-CHALLENGER': token,
                },
            })

            const r = await response.status()
            return r
        })
    }
    async getTodosWithDoneStatusTrue(token) {
        return test.step('Get /todos', async () => {
            const response = await this.request.get(`${urlApi}/todos`, {
                headers: {
                    'X-CHALLENGER': token,
                },
                params: {
                    doneStatus: true,
                },
            })

            const r = await response.json()
            return r
        })
    }
}
