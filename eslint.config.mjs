import { defineConfig } from '@zhangyu1818/eslint-config'

export default defineConfig({
  parserOptions: {
    project: './tsconfig.json',
  },
  presets: {
    next: true,
    tailwindcss: true,
    prettier: true,
    typescript: {
      '@typescript-eslint/no-redundant-type-constituents': 'off',
    },
  },
})
