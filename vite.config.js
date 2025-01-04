// https://vite.dev/config/
import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [
        {
            name: "treat-js-files-as-jsx",
            async transform(code, id) {
                if (!id.match(/src\/.*\.js$/)) return null;

                // Use the exposed transform from vite, instead of directly
                // transforming with esbuild
                return transformWithEsbuild(code, id, {
                    loader: "jsx",
                    jsx: "automatic",
                });
            },
        },
        react(),
    ],

    optimizeDeps: {
        force: true,
        esbuildOptions: {
            loader: {
                ".js": "jsx",
            },
        },
    },
    build: {
        commonjsOptions: {
            strictRequires: true,
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    preview: {
        port: 8080,
        strictPort: true,
    },
    server: {
        port: 3000,
        strictPort: true,
        host: true,
        //origin: "http://0.0.0.0:8080"
    },
});
