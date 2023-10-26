import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist', // 自定义构建输出目录
        target: 'esnext',
        lib: {
            entry: 'src/index.ts', // 入口文件路径
            formats: ['es', 'cjs']
        }
    },
    server: {
        port: 8080, // 自定义开发服务器端口
    },
});
