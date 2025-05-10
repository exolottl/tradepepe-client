import Journal from '@/components/pages/Journal'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/journal/')({
  component: () => <Journal/>,
})

