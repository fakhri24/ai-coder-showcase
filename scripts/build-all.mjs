#!/usr/bin/env node
// Orchestrates the monorepo build: gallery first (so its dist/ output claims
// the root), then each work copied in afterward. Order matters — building
// the gallery after copying works in would wipe them out again.
import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import path from 'node:path'
import { readWorksRegistry, rootDir, workDir } from './works-registry.mjs'

const distDir = path.join(rootDir, 'dist')

function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' })
  if (result.status !== 0) {
    throw new Error(`Command gagal: ${command} ${args.join(' ')} (cwd: ${cwd})`)
  }
}

console.log('== 1. Membersihkan dist/ ==')
rmSync(distDir, { recursive: true, force: true })
mkdirSync(distDir, { recursive: true })

console.log('== 2. Build gallery ==')
run('npm', ['run', 'build', '--workspace', 'apps/gallery'], rootDir)
cpSync(path.join(rootDir, 'apps/gallery/dist'), distDir, { recursive: true })

console.log('== 3. Build & salin setiap karya ==')
const works = readWorksRegistry()
const worksDistDir = path.join(distDir, 'works')
mkdirSync(worksDistDir, { recursive: true })

for (const work of works) {
  const dir = workDir(work.slug)
  if (!existsSync(dir)) {
    throw new Error(
      `works/${work.slug} terdaftar di works.json tapi foldernya tidak ada — jalankan "npm run validate:works"`,
    )
  }

  const pkgJsonPath = path.join(dir, 'package.json')
  const targetDir = path.join(worksDistDir, work.slug)

  if (existsSync(pkgJsonPath)) {
    console.log(`  - ${work.slug} (build via npm workspace)`)
    run('npm', ['run', 'build', '--workspace', `works/${work.slug}`], rootDir)

    const workOutDir = path.join(dir, 'dist')
    if (!existsSync(workOutDir)) {
      throw new Error(`works/${work.slug} punya script build tapi tidak menghasilkan folder dist/`)
    }
    cpSync(workOutDir, targetDir, { recursive: true })
  } else {
    console.log(`  - ${work.slug} (statis, disalin apa adanya)`)
    cpSync(dir, targetDir, {
      recursive: true,
      filter: (src) => !src.endsWith('README.md'),
    })
  }
}

console.log(`\nBuild selesai -> ${distDir}`)
