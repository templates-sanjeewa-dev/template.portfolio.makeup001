import { EditorialNotFound } from '@/components/site/EditorialNotFound'

export default function JournalNotFound() {
  return (
    <EditorialNotFound
      eyebrow="Journal / Missing story"
      message="The journal may have been updated, or this story may no longer be published."
      returnHref="/journal"
      returnLabel="Return to journal"
      title="This story has left the page."
    />
  )
}
