export default class Edge {
  public id: string;
  public source: string;
  public dest: string;
  public weight: number;

  constructor(id: string, source: string, dest: string, weight: number) {
    this.id = id;
    this.source = source;
    this.dest = dest;
    this.weight = weight;
  }
}
