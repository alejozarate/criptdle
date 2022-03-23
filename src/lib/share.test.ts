const mockSolutionGetter = jest.fn()

jest.mock('./words', () => ({
    ...jest.requireActual('./words'),
    get solution() {
        return mockSolutionGetter()
    },
}))

describe('generateEmojiGrid', () => {
    test('generates grid for ascii', async () => {
        const guesses = ['EDCBA', 'VWXYZ', 'ABCDE']
        const tiles = ['C', 'P', 'A'] // Correct, Present, Absemt
        mockSolutionGetter.mockReturnValue('ABCDE')

        const grid = (await import('./share')).generateEmojiGrid(guesses, tiles)
        const gridParts = grid.split('\n')
        expect(gridParts[0]).toBe('PPCPP')
        expect(gridParts[1]).toBe('AAAAA')
        expect(gridParts[2]).toBe('CCCCC')
    })
    test('generates grid for ascii', async () => {
        const guesses = ['5️⃣4️⃣3️⃣2️⃣1️⃣', '♠️♥️♦️♣️🔔', '1️⃣2️⃣3️⃣4️⃣5️⃣']
        const tiles = ['C', 'P', 'A'] // Correct, Present, Absemt
        mockSolutionGetter.mockReturnValue('1️⃣2️⃣3️⃣4️⃣5️⃣')

        const grid = (await import('./share')).generateEmojiGrid(guesses, tiles)
        const gridParts = grid.split('\n')
        expect(gridParts[0]).toBe('PPCPP')
        expect(gridParts[1]).toBe('AAAAA')
        expect(gridParts[2]).toBe('CCCCC')
    })
})

export {}
