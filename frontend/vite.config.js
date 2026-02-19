import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // required to listen on all addresses
    allowedHosts: [
      "https://foodreel-backend-571m.onrender.com"
    ]
  },
})


