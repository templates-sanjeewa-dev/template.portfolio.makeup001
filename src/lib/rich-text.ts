const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object'

export function richTextToPlainText(value: unknown): string {
  const parts: string[] = []

  const visit = (node: unknown): void => {
    if (typeof node === 'string') {
      parts.push(node)
      return
    }

    if (Array.isArray(node)) {
      node.forEach(visit)
      return
    }

    if (!isRecord(node)) return

    if (typeof node.text === 'string') {
      parts.push(node.text)
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(visit)
    }

    if (isRecord(node.root)) {
      visit(node.root)
    }
  }

  visit(value)

  return parts.join(' ').replace(/\s+/g, ' ').trim()
}
