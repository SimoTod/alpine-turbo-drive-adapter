import { babel } from '@rollup/plugin-babel'
import filesize from 'rollup-plugin-filesize'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: [
    {
      name: 'Alpine',
      file: 'dist/alpine-turbo-drive-adapter.js',
      format: 'umd'
    }
  ],
  plugins: [
    nodeResolve(),
    filesize(),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
              edge: '18',
              ie: '11',
              ios: '11.3',
              safari: '13'
            }
          }
        ]
      ]
    })
  ]
}
