import './globals.css'
import { Providers } from '@main/Providers'
import { GlobalModal } from '@main/components/organisms/GlobalModal'
import { overpass } from '@main/utils/fonts'

export const metadata = {
  title: 'Dataflow, a technical flow editor',
  description: 'For our hackathon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={overpass.className}>
        <div id="modal-root"></div>
        <Providers>
          {children}
          <GlobalModal />
        </Providers>
      </body>
    </html>
  )
}
