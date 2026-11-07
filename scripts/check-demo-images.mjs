// Verify demo photo URLs without downloading full-resolution images.
// Usage: node scripts/check-demo-images.mjs
import { readFile } from 'node:fs/promises'

const source = await readFile(new URL('../src/lib/demo-content.ts', import.meta.url), 'utf8')
const ids = [...new Set([...source.matchAll(/pexels\(\s*-\d+,\s*(\d+),/g)].map((match) => match[1]))]
const errors = []
let offset = 0

async function worker() {
  while (offset < ids.length) {
    const id = ids[offset++]
    const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=360`
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        signal: AbortSignal.timeout(12000),
        headers: { 'User-Agent': 'MakeupPortfolioMediaAudit/1.0' },
      })
      const type = response.headers.get('content-type') || ''
      if (!response.ok || !type.startsWith('image/')) {
        errors.push({ id, status: response.status, type })
      }
    } catch (error) {
      errors.push({ id, error: String(error) })
    }
  }
}

await Promise.all(Array.from({ length: 4 }, () => worker()))
console.log(`Checked ${ids.length} Pexels demo image URLs.`)
if (errors.length) {
  console.error(`${errors.length} URL(s) require manual review (HEAD may be blocked):`)
  for (const error of errors) console.error(error)
  process.exitCode = 1
} else {
  console.log('All checked URLs returned an image content type.')
}
