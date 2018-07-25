import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'emitter.mjs',
  output: {
    file: 'dist/emitter.js',
    format: 'umd',
    name: 'emitter'
  },
  plugins: [
    resolve()
  ]
}
