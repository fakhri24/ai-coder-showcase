#!/usr/bin/env node
import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { rootDir } from './works-registry.mjs'

const slug = process.argv[2]

if (!slug) {
  console.error('Pemakaian: npm run new-work -- <slug-karya>')
  process.exit(1)
}

if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error('Slug harus kebab-case: huruf kecil, angka, dan tanda hubung saja (contoh: snake-game).')
  process.exit(1)
}

const targetDir = path.join(rootDir, 'works', slug)
if (existsSync(targetDir)) {
  console.error(`works/${slug} sudah ada.`)
  process.exit(1)
}

const templateDir = path.join(rootDir, 'works/_template/react-vite')
cpSync(templateDir, targetDir, { recursive: true })

for (const file of ['package.json', 'vite.config.ts']) {
  const filePath = path.join(targetDir, file)
  const content = readFileSync(filePath, 'utf-8').replaceAll('__SLUG__', slug)
  writeFileSync(filePath, content)
}

console.log(`Karya baru dibuat di works/${slug}/`)
console.log('Selanjutnya:')
console.log('  1. npm install')
console.log(`  2. Tambahkan entry di apps/gallery/src/features/works-registry/works.json`)
console.log(`  3. Buat dokumen Firestore works/${slug} (lihat CONTRIBUTING.md)`)
