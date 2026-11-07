import { EditorialNotFound } from '@/components/site/EditorialNotFound'

export default function ProjectNotFound() {
  return (
    <EditorialNotFound
      eyebrow="Portfolio / Missing project"
      message="The portfolio may have changed, or this project may no longer be publicly available."
      returnHref="/portfolio"
      returnLabel="Return to portfolio"
      title="This look is no longer in the edit."
    />
  )
}
