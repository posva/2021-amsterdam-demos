import { mande, defaults } from 'mande'

export const imgflip = mande('https://api.imgflip.com')

delete defaults.headers['Content-Type']

export interface Meme {
  id: string
  name: string
  url: string

  width: number
  height: number

  box_count: number
}

export function getMemes() {
  return imgflip
    .get<{
      data: { memes: Meme[] }
    }>('/get_memes')
    .then(({ data }) => data.memes)
}
