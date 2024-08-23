import { BcriptjsHashProvider } from "../../bcryptjs-hash.providers"

describe('BcryptjsHashProvider ubit tests', () => {
  let sut: BcriptjsHashProvider

  beforeEach(() => {
    sut = new BcriptjsHashProvider()
  })

  it('shoud return encryped password', async () => {
      const password = 'testpassword'
      const hash = await sut.generatedHash(password)
      await expect(hash).toBeDefined()
  })

})




