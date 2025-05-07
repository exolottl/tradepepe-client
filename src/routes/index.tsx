import HomePage from '@/components/pages/Home'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => <HomePage/>,
})


