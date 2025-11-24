import { ReactNode } from 'react'
import ChakraProviders from '../providers/ChakraProviders'
import MainContainer from '../components/layout/MainContainer'

export const metadata = {
  title: 'DU App',
  description: 'Dynamic University app starter'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChakraProviders>
          <MainContainer />
        </ChakraProviders>
      </body>
    </html>
  )
}
