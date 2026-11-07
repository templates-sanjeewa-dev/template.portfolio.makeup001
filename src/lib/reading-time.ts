import { richTextToPlainText } from './rich-text'

export function getReadingTime(value: unknown, wordsPerMinute = 200) {
  const text = richTextToPlainText(value)
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0

  return Math.max(1, Math.ceil(words / wordsPerMinute))
}
