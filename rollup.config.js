import babel from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: [
    {
      name: 'Alpine',
      file: 'dist/alpine-turnolinks-bridge.js',
      format: 'umd'
    },
    {
      name: 'Alpine',
      file: 'dist/alpine-turnolinks-bridge.es.js',
      format: 'es'
    }
  ],
  plugins: [
    resolve(),
    filesize(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
