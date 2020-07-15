import commonjs from '@rollup/plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import sass from 'node-sass';
import autoprefixer from 'autoprefixer';

const production = !process.env.ROLLUP_WATCH; 

export default [
  {
    input: 'src/main.js',
    output: {
      file: 'public/bundle.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      builtins(),
      globals(),
      babel({
        babelHelpers: 'bundled',
        plugins: [
          '@babel/plugin-syntax-dynamic-import'
        ]
      }),
      postcss({
        preprocessor: (content, id) => new Promise((resolve, reject) => {
          const result = sass.renderSync({ file: id });
          resolve({ code: result.css.toString() });
        }),
        plugins: [
          autoprefixer
        ],
        sourceMap: true,
        extract: true,
        extensions: ['.sass','.scss','.css']
      }),
      production && terser()
    ]
  },
  {
    input: 'src/workers/worker.js',
    output: {
      file: 'public/worker.js',
      format: 'cjs'
    }
  }
];