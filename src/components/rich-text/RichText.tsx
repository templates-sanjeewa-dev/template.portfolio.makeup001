import type { ReactNode } from 'react'

import styles from './RichText.module.css'

type RichTextProps = {
  data: unknown
}

type LexicalNode = Record<string, unknown>

const isNode = (value: unknown): value is LexicalNode =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value)

const childrenOf = (node: LexicalNode): unknown[] =>
  Array.isArray(node.children) ? node.children : []

const renderChildren = (node: LexicalNode, keyPrefix: string): ReactNode =>
  childrenOf(node).map((child, index) => renderNode(child, keyPrefix + '-' + String(index)))

const renderNode = (value: unknown, key: string): ReactNode => {
  if (!isNode(value)) return null

  const type = typeof value.type === 'string' ? value.type : ''

  if (type === 'text') {
    let content: ReactNode = typeof value.text === 'string' ? value.text : ''
    const format = typeof value.format === 'number' ? value.format : 0

    if (format & 1) content = <strong>{content}</strong>
    if (format & 2) content = <em>{content}</em>
    if (format & 8) content = <u>{content}</u>

    return <span key={key}>{content}</span>
  }

  if (type === 'linebreak') {
    return <br key={key} />
  }

  if (type === 'link' || type === 'autolink') {
    const fields = isNode(value.fields) ? value.fields : value
    const url = typeof fields.url === 'string' ? fields.url : '#'
    const newTab = Boolean(fields.newTab)

    return (
      <a
        href={url}
        key={key}
        rel={newTab ? 'noreferrer' : undefined}
        target={newTab ? '_blank' : undefined}
      >
        {renderChildren(value, key)}
      </a>
    )
  }

  if (type === 'heading') {
    const tag = value.tag === 'h3' ? 'h3' : value.tag === 'h4' ? 'h4' : 'h2'
    const content = renderChildren(value, key)

    if (tag === 'h3') return <h3 key={key}>{content}</h3>
    if (tag === 'h4') return <h4 key={key}>{content}</h4>

    return <h2 key={key}>{content}</h2>
  }

  if (type === 'quote') {
    return <blockquote key={key}>{renderChildren(value, key)}</blockquote>
  }

  if (type === 'list') {
    const tag = value.tag === 'ol' ? 'ol' : 'ul'
    const content = renderChildren(value, key)

    return tag === 'ol' ? <ol key={key}>{content}</ol> : <ul key={key}>{content}</ul>
  }

  if (type === 'listitem') {
    return <li key={key}>{renderChildren(value, key)}</li>
  }

  if (type === 'paragraph') {
    return <p key={key}>{renderChildren(value, key)}</p>
  }

  if (type === 'root') {
    return <div key={key}>{renderChildren(value, key)}</div>
  }

  return <span key={key}>{renderChildren(value, key)}</span>
}

export function RichText({ data }: RichTextProps) {
  if (!isNode(data)) return null

  const root = isNode(data.root) ? data.root : data

  return <div className={styles.richText}>{renderNode(root, 'root')}</div>
}
