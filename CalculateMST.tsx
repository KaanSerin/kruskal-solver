import Edge from './components/Edge';

const calculateMST = (edges: Edge[], noOfVertices: number): Edge[] => {
  const vertex_parent = [] as number[];

  const findParent = (source: number): any => {
    if (vertex_parent[source] === source) return source;
    return findParent(vertex_parent[source]);
  };

  // Sort all the edges by ascending order of weight
  edges.sort((a, b) => a.weight - b.weight);
  edges.forEach((edge) =>
    console.log(`${edge.source} -> ${edge.dest} with cost: ${edge.weight}`)
  );
  console.log('--------------------');

  // Initially every nodes vertex_parent is itself
  for (let i = 0; i < edges.length; i++) {
    vertex_parent.push(i);
  }

  const result = new Array(noOfVertices - 1).fill(new Edge('id', -1, -1, -1));

  let count = 0;
  let i = 0;
  //   Loop over all the edges
  while (i < edges.length - 1) {
    const currentEdge = edges[i];

    // Check if can add edge to MST
    const sourceParent = findParent(currentEdge.source);
    const destParent = findParent(currentEdge.dest);

    if (sourceParent !== destParent) {
      result[count] = currentEdge;
      vertex_parent[sourceParent] = destParent;
      count++;
    }

    i++;
  }

  result.forEach((edge) =>
    console.log(`${edge.source} -> ${edge.dest} with cost: ${edge.weight}`)
  );
  return result;
};

export default calculateMST;
