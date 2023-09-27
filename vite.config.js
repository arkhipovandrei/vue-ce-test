import {defineConfig} from 'vite'
import path from "node:path";
import vue from '@vitejs/plugin-vue'
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [basicSsl(), vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: true,
        port: 3000,
    }
})
