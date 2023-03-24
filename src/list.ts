import { Node } from './node';

export class List<T> {
  public array: T[];
  public head: Node<T>;
  public tail: Node<T>;
  private _length: number;
  constructor() {
    this.array = [];
    this.tail = this.head = null;
    this._length = 0;
  }
  length() {
    return this.array.length;
  }
  append(val: T) {
    this.array.push(val);
  }
  prepend(val: T) {
    this.array.unshift(val);
  }
  get(index: number): T | null {
    return this.array[index];
  }
  delete(index: number): T | null {
    const val = this.array[index];
    if (val === undefined) return null;
    this.array.splice(index, 1);
    return val;
  }
  reverse() {
    return this.array.reverse();
  }
  clone(): List<T> {
    const newList = new List<T>();
    newList.array = [...this.array];
    return newList;
  }
  clear() {
    this.array = [];
  }
  extend(list: List<T>): void {
    this.array = this.array.concat(list.array);
  }
  findFirst(val: T): number {
    return this.array.indexOf(val);
  }
  findLast(val: T) {
    return this.array.lastIndexOf(val);
  }
  deleteAll(val: T) {
    this.array = this.array.filter((elem) => elem !== val);
  }
  insert(val: T, index: number) {
    if (index < 0 || index > this.array.length) return;
    const firstPiece = this.array.slice(0, index);
    const lastPiece = this.array.slice(index);
    this.array = [...firstPiece, val, ...lastPiece];
  }
  private getNodeByIndex(index: number): Node<T> {
    if (index < 0 || index >= this._length) return null;
    let curNode = this.head;
    let curIndex = 0;

    while (curNode.next && curIndex < index) {
      curNode = curNode.next;
      curIndex++;
    }

    return curNode;
  }
}
