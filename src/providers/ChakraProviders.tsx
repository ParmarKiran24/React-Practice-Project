"use client"

import { ReactNode } from 'react'
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'
import { Global } from '@emotion/react'

const system = createSystem(defaultConfig)

const rootVars = `
:root{
  --brand-500: #327245;
  --brand-700: #0b4f2c;
  --accent: #FB9300;
  --muted: #6b7280;
  --max-width: 1100px;
  --font-sans: Inter, Arial, sans-serif;
}
body { font-family: var(--font-sans); margin:0; color: #1f2937; background: #fff }
`

export default function ChakraProviders({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <Global styles={rootVars} />
      {children}
    </ChakraProvider>
  )
}
