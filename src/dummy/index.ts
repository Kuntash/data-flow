const firstNode = {
  id: 'firstNode',
  data: {
    label: 'First Node here',
    description: 'This is the first node',
    nodeType: 'conditional',
    conditionalAttr: 'class-attr',
    conditionalOperator: 'less-than',
    conditionalValue: 12,
    nodeForTrue: 'secondNode',
    nodeForFalse: 'thirdNode',
  },
  position: {
    x: 0,
    y: 0,
  },
  type: 'input',
}

const secondNode = {
  id: 'secondNode',
  data: {
    nodeType: 'render',
    label: 'Second node here',
    description: 'This is the second node',
    designLink: 'https://figma.com',
  },
  position: {
    x: -250,
    y: 300,
  },
}

const thirdNode = {
  id: 'thirdNode',
  data: {
    nodeType: 'render',
    label: 'Third node here',
    description: 'This is the third node',
    designLink: 'https://figma.com',
  },
  position: {
    x: 250,
    y: 300,
  },
}

export const NODES = [firstNode, secondNode, thirdNode]

const attributes = [
  {
    id: 'class-attr',
    label: 'class',
    type: 'number',
    description: "Property used to know a student's class",
  },
]

const isBooleanOperator = (operator: string) => {
  return operator === 'less-than' ||
    operator === 'more-than' ||
    operator === 'equality'
    ? true
    : false
}
const getEdgesFromNodes = (nodes: any[]) => {
  let queue = []
  let edges = []
  queue.push(nodes[0])
  while (queue.length) {
    const currentNode = queue.pop()
    if (currentNode?.data?.nodeType !== 'conditional') continue

    // Check if the operator outcome is boolean
    if (isBooleanOperator(currentNode?.data?.conditionalOperator)) {
      const trueNode: any = nodes.find(
        node => node?.id === currentNode?.data?.nodeForTrue,
      )
      const falseNode: any = nodes.find(
        node => node?.id === currentNode?.data?.nodeForFalse,
      )

      edges.push({
        id: `${currentNode?.id}-${trueNode?.id}`,
        source: currentNode?.id,
        target: trueNode?.id,
        label: 'If true',
        type: 'step',
      })
      edges.push({
        id: `${currentNode?.id}-${falseNode?.id}`,
        source: currentNode?.id,
        target: falseNode?.id,
        label: 'If false',
        type: 'step',
      })

      queue.push(trueNode)
      queue.push(falseNode)
    }
    // If the number of outcomes is more than 2
    return edges
  }
}

export const EDGES = getEdgesFromNodes(NODES)
