import { Manrope, Overpass, Roboto } from 'next/font/google'

export const overpass = Overpass({ subsets: ['latin'] })
export const roboto = Roboto({
  weight: ['500', '400', '700'],
  subsets: ['latin', 'greek'],
})

export const manrope = Manrope({ subsets: ['latin'] })
