import { Models } from 'appwrite'

export type CreateAccountType = {
  name: string
  email: string
  password: string
}

export type LoginAccountType = {
  email: string
  password: string
}

export type ProjectSchema = Models.Document & {
  id: string
  name: string
  createdBy: string
  description?: string
  nodes: string[]
}

export type AttributeSchema = {
  id: string
  label: string
  type: 'string' | 'number' | 'boolean'
  description: string
  createdBy: string
}

export type RenderNodeDataSchema = {
  createdBy: string
  projectId: string
  label: string
  description: string
  nodeType: 'render'
  designLink?: string
  attachedImages?: string[]
}

export type ConditionalNodeDataSchema = {
  createdBy: string
  projectId: string
  label: string
  description: string
  nodeType: 'conditional'
  conditionalAttrId: string
  conditionalOperator: 'less-than' | 'more-than' | 'equality'
  conditionalValue: number | string
  childNodeMap: {
    [key: string]: string
  }
}

export type NodeSchema = {
  id: string
  data: RenderNodeDataSchema | ConditionalNodeDataSchema
  position: {
    x: number
    y: number
  }
  type?: string
}

export type CreateProjectType = Omit<ProjectSchema, 'id'>
export type CreateNodeType = Omit<NodeSchema, 'id'>
export type CreateAttributeType = Omit<AttributeSchema, 'id'>
