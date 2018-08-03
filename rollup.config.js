import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.tsx',
    output: {
      name: 'ReactFullViewport',
      file: pkg.browser,
      format: 'umd',
    },
    external: ['react'],
    plugins: [typescript()],
  },

  {
    input: 'src/index.tsx',
    output: {
      name: 'ReactFullViewport',
      file: 'dist/react-full-viewport.umd.min.js',
      format: 'umd',
    },
    external: ['react'],
    plugins: [typescript(), uglify()],
  },
  {
    input: 'src/index.tsx',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    external: ['react'],
    plugins: [typescript()],
  },
];
