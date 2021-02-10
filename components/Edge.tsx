export default class Edge {
  public id: string;
  public source: number;
  public dest: number;
  public weight: number;

  constructor(id: string, source: number, dest: number, weight: number) {
    this.id = id;
    this.source = source;
    this.dest = dest;
    this.weight = weight;
  }
}
