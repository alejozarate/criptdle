import { WORDS } from '../constants/wordlist'
import { WORDS_DESCRIPTION } from '../constants/worddescription'

describe('wordsDescription', () => {
    test('each word has a definition', async () => {
        WORDS.forEach((w) => {
            expect(WORDS_DESCRIPTION[w]).toBeTruthy()
        })
    })
})

export {}
