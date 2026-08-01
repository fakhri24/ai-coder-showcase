import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptsDir = path.dirname(fileURLToPath(import.meta.url))

export const rootDir = path.resolve(scriptsDir, '..')

export const registryPath = path.join(
  rootDir,
  'apps/gallery/src/features/works-registry/works.json',
)

export function readWorksRegistry() {
  const raw = readFileSync(registryPath, 'utf-8')
  return JSON.parse(raw)
}

export function workDir(slug) {
  return path.join(rootDir, 'works', slug)
}
