export interface HashProviders {
  generatedHash(payload: string): Promise<string>
  compareHash(payload: string, hash: string): Promise<boolean>
}

