import { useNavigate, useParams } from 'react-router-dom'
import DocsShell from '../components/docs/DocsShell'

export function ComponentsPage() {
  const navigate = useNavigate()
  const { slug } = useParams()
  return (
    <main className="w-full bg-white min-h-screen">
      <DocsShell slug={slug} onNavigate={(nextSlug) => navigate(`/components/${nextSlug}`)} />
    </main>
  )
}
