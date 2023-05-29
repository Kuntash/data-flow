'use client'
import { EDGES, NODES } from '@main/dummy'
import React, { useState } from 'react'
import { Background, Controls, ReactFlow } from 'reactflow'

import 'reactflow/dist/style.css'

export const FlowEditor = () => {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const openCreateNodeModal = () => {
    setNodes(NODES as any)
    setEdges(EDGES as any)
    console.log('nodes: ', NODES)
    console.log('edges: ', EDGES)
  }

  return (
    <div className="w-full rounded-md border h-full relative">
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>

      <button
        className="absolute bottom-4 right-4 px-5 py-3 rounded-md bg-theme text-white-100 font-semibold text-lg"
        onClick={openCreateNodeModal}
      >
        Create new node
      </button>
    </div>
  )
}
