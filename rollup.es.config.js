import { babel } from '@rollup/plugin-babel'
import filesize from 'rollup-plugin-filesize'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: [
    {
      name: 'Alpine',
      file: 'dist/alpine-turbo-drive-adapter.esm.js',
      format: 'es'
    }
  ],
  plugins: [
    nodeResolve(),
    filesize(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              esmodules: true
            }
          }
        ]
      ]
    })
  ]
}
