import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import path from "path";
import { babel } from "@rollup/plugin-babel";
import pkg from "./package.json";

const extensions = [".js", ".ts"];
const resolvePath = (...args) => path.resolve(__dirname, ...args); // 适应不同环境，封装path.resolve，少写一点代码

export default [
    {
        input: resolvePath("./src/index.ts"),
        output: {
            name: "jsUtilsIife",
            file: resolvePath("./", "lib/js-utils.iife.js"),
            format: "iife",
        },
        plugins: [
            babel({
                babelHelpers: "runtime",
                exclude: "node_modules/**",
                extensions,
            }),
            commonjs({ extensions }),
            nodeResolve({ extensions }),
        ],
    },
    // esm，cjs格式打包
    {
        input: resolvePath("./src/index.ts"),
        output: [
            { file: resolvePath("./", pkg.exports.require), format: "cjs" },
            { file: resolvePath("./", pkg.exports.import), format: "esm" },
        ],
        // external: ['date-fns'],
        plugins: [
            babel({
                babelHelpers: "runtime",
                exclude: "node_modules/**",
                extensions,
            }),
            commonjs({ extensions }),
            nodeResolve({ extensions }),
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
