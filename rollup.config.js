export default [
    {
        input: "./dist/main.es2015.js",
        output: {
            name: "ReactConditional",
            file:"./dist/main.umd.js",
            format:"umd"
        },
        globals: {
            "react":"react"
        },
        
        onwarn: () => { return }
    },
    {
        input: "./dist/main.es2015.js",
        output: {
            file:"./dist/main.cjs.js",
            format:"cjs"
        },
        globals: {
            "react":"react"
        },
        
        onwarn: () => { return }
    }
]