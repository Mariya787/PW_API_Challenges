import { faker } from '@faker-js/faker'

export class TodoBuilder {
    withTitle(title) {
        this.title = title ?? faker.word.noun()
        return this
    }

    withDoneStatus(status) {
        this.doneStatus = status ?? false
        return this
    }

    withDescription(description) {
        this.description = description ?? faker.word.words()
        return this
    }

    build() {
        const result = { ...this }
        return result
    }
}
