#!/usr/bin/env node
import { existsSync } from 'node:fs'
import path from 'node:path'
import { readWorksRegistry, workDir } from './works-registry.mjs'

const works = readWorksRegistry()
let hasError = false

for (const work of works) {
  const dir = workDir(work.slug)

  if (!existsSync(dir)) {
    console.error(`✗ works/${work.slug} — folder tidak ditemukan (terdaftar di works.json tapi foldernya hilang)`)
    hasError = true
    continue
  }

  const thumbnailPath = path.join(dir, work.thumbnailFile)
  if (!existsSync(thumbnailPath)) {
    console.error(`✗ works/${work.slug} — thumbnail "${work.thumbnailFile}" tidak ditemukan`)
    hasError = true
    continue
  }

  if (work.hostingMode === 'external' && !work.externalUrl) {
    console.error(`✗ works/${work.slug} — hostingMode "external" tapi externalUrl kosong`)
    hasError = true
    continue
  }

  if (work.hostingMode === 'embedded' && work.externalUrl) {
    console.error(`✗ works/${work.slug} — hostingMode "embedded" seharusnya externalUrl bernilai null`)
    hasError = true
    continue
  }

  console.log(`✓ works/${work.slug}`)
}

if (hasError) {
  console.error('\nValidasi works registry gagal.')
  process.exit(1)
}

console.log('\nSemua entry works.json valid.')
