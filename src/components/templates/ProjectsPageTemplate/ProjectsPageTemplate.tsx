'use client'
import React from 'react'
import { FlowEditor } from './components/FlowEditor'
import { useSearchParams } from 'next/navigation'
import { useAllProjectData } from '@main/hooks/reactQuery/useAllProjectData'

export const ProjectsPageTemplate = () => {
  const searchParams = useSearchParams()
  const projectId = searchParams.get('projectId')
  

  return (
    <article className="bg-white-200 grow p-5">
      <FlowEditor />
    </article>
  )
}
