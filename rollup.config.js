import nodeResolve from "@rollup/plugin-node-resolve";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import path from "path";
import { babel } from "@rollup/plugin-babel";
import pkg from "./package.json";

const extensions = [".js", ".ts"];
const resolvePath = (...args) => path.resolve(__dirname, ...args); // 适应不同环境，封装path.resolve，少写一点代码

export default [
    /* {
        input: "src/index.ts",
        output: {
            name: "jsUtils",
            file: pkg.iife,
            format: "iife",
        },
        plugins: [
            babel({
                babelHelpers: "runtime",
                exclude: "node_modules/!**",
                extensions,
            }),
            nodeResolve({ extensions }), // so Rollup can find `ms`
            commonjs({ extensions }), // so Rollup can convert `ms` to an ES module
        ],
    },*/
    // esm，cjs格式打包
    {
        input: resolvePath("./src/index.ts"),
        output: [
            // { file: resolvePath('./', pkg.exports.require), format: 'cjs' },
            { file: resolvePath("./", pkg.module), format: "esm" },
        ],
        // external: ['date-fns'],
        plugins: [
            nodeResolve({ extensions, modulesOnly: true }),
            babel({
                babelHelpers: "runtime",
                exclude: "node_modules/**",
                extensions,
            }),
        ],
    },
    // 生成 .d.ts 类型声明文件
    {
        input: resolvePath("src/index.ts"),
        output: {
            file: resolvePath("./", pkg.types),
            format: "es",
        },
        plugins: [dts()],
    },
];
