import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  // dialect is required by this drizzle-kit version's types
  dialect: 'postgresql',
  // driver field can be kept for runtime behavior; cast to any to satisfy types
  driver: 'pg' as unknown as any
})
