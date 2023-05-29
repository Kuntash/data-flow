'use client'

import { Header } from '@main/components/molecules/Header'
import { ProjectSelectionPanel } from '@main/components/templates/ProjectsPageTemplate/components/ProjectSelectionPanel'
import { useCurrentUser } from '@main/hooks/reactQuery/useCurrentUser'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { data: currentUser, isLoading } = useCurrentUser()

  useEffect(() => {
    if (!isLoading && !currentUser?.isLoggedIn) router.push('/')
  }, [currentUser])

  if (!currentUser?.isLoggedIn) return <div>Loading...</div>

  return (
    <section>
      <div>
        {/* Header */}
        <Header />
        <main className="flex h-[calc(100vh-4rem)]">
          {/* Left panel */}
          <aside className="hidden md:flex w-[240px]">
            <ProjectSelectionPanel />
          </aside>

          {/* Right dashboard */}
          {children}
        </main>
      </div>
    </section>
  )
}
