import { EditorialNotFound } from '@/components/site/EditorialNotFound'

export default function NotFound() {
  return (
    <EditorialNotFound
      eyebrow="Lost in the edit"
      message="The page may have moved, been unpublished, or the address may be incomplete."
      returnHref="/"
      returnLabel="Return home"
      title="Nothing here, beautifully."
    />
  )
}
