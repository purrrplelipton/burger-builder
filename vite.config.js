import svgr from '@svgr/rollup'
import react from '@vitejs/plugin-react-swc'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
	plugins: [react(), svgr()],
	resolve: {
		alias: {
			src: resolve(__dirname, './src'),
		},
	},
	css: {
		modules: {
			localsConvention: 'camelCase',
		},
	},
})
