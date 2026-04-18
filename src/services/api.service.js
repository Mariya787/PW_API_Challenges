import { ChallengerService, ChallengesService } from './index'
//Фасад
export class Api {
    constructor(request) {
        this.request = request
        this.challenger = new ChallengerService(request)
        this.challenges = new ChallengesService(request)
    }
}
