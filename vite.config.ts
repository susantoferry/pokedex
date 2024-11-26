import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import compression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip', // Use gzip instead of Brotli
      threshold: 10240, // Compress files larger than 10KB
      deleteOriginFile: false, // Keep original files
    }),
  ],
})
