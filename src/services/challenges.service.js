import { test } from '../helpers/fixtures/fixture'

//todo
const urlApi = 'https://apichallenges.eviltester.com'

export class ChallengesService {
    constructor(request) {
        this.request = request
    }
    async get(token) {
        return test.step('Post /challenges', async () => {
            const response = await this.request.get(`${urlApi}/challenges`, {
                headers: {
                    'X-CHALLENGER': token,
                },
            })
            const r = await response.json()
            return r
        })
    }
}
