import Edge from './components/Edge';

const calculateMST = (edges: Edge[]): [Edge[], number] => {
  const distinctVertices = new Set([] as number[]);

  // Remove self connecting edges
  edges = edges.filter((edge) => edge.source !== edge.dest);

  // Calculate the distinct number of vertices
  edges.forEach((edge) => {
    distinctVertices.add(edge.source);
    distinctVertices.add(edge.dest);
  });

  const vertex_parent = [] as number[];
  // Initially every nodes vertex_parent is itself
  for (let i = 0; i < distinctVertices.size; i++) {
    vertex_parent.push(i);
  }

  const findParent = (source: number): number => {
    if (vertex_parent[source] === source) return source;
    return findParent(vertex_parent[source]);
  };

  // Sort all the edges by ascending order of weight
  edges.sort((a, b) => a.weight - b.weight);
  edges.forEach((edge) =>
    console.log(`${edge.source} -> ${edge.dest} with cost: ${edge.weight}`)
  );
  console.log('--------------------');

  const result = new Array(distinctVertices.size - 1).fill(
    new Edge('id', -1, -1, -1)
  );

  let count = 0;
  let i = 0;
  //   Loop over all the edges
  while (i < edges.length) {
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
  return [result, distinctVertices.size];
};

export default calculateMST;
