import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'mixin.js',
  output: {
    name: 'emitter',
    file: 'dist/mixin.js',
    format: 'umd'
  },
  plugins: [
    resolve()
  ]
}
