import { test } from '../helpers/fixtures/fixture'

//todo
const urlApi = 'https://apichallenges.eviltester.com'

export class ChallengesService {
    constructor(request) {
        this.request = request
    }
    async get(token) {
        return test.step('POST /challenger', async () => {
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

/*
    let response = await request.get(`${urlApi}/challenges`, {
        headers: {
            'X-CHALLENGER': token
        }
     });
     let r = await response.json(); 

     */
