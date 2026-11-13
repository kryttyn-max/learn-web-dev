import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import myApiPlugin from './server/server.js'

export default defineConfig({
  plugins: [react(), myApiPlugin()],
})