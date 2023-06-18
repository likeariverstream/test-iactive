import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
    return {
        plugins: [react()],
        resolve: {
            alias: {}
        },

        server: {
            host: true,
            strictPort: false,
            port: 8000,
            proxy: {
                '/api': {
                    target: 'http://a0830433.xsph.ru',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
            base: '/test-iactive/'
        }
    }
})
