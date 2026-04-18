import { test } from '../helpers/fixtures/fixture'

//todo
const urlApi = 'https://apichallenges.eviltester.com'

export class TodosService {
    constructor(request) {
        this.request = request
    }

    async post(token, data) {
        return test.step('POST /todos', async () => {
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
}
