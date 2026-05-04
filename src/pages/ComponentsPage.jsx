import { useNavigate } from 'react-router-dom'
import ComponentShowcaseLayout from '../components/ComponentShowcaseLayout'

export function ComponentsPage() {
  const navigate = useNavigate()
  return (
    <main className="w-full bg-[var(--bg)] min-h-screen">
      <ComponentShowcaseLayout onBack={() => navigate('/')} />
    </main>
  )
}
