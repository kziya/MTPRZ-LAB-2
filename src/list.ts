import { Node } from './node';

export class List<T> {
  private _head: Node<T>;
  private _tail: Node<T>;
  private _length: number;
  constructor() {
    this._tail = this._head = null;
    this._length = 0;
  }
  length() {
    return this._length;
  }
  append(val: T) {
    if (this.length() === 0) {
      this._head = this._tail = new Node<T>(val);
    } else {
      this._tail.next = new Node<T>(val, this._tail);
      this._tail.next.prev = this._tail;
      this._tail = this._tail.next;
    }
    this._length++;
  }
  prepend(val: T) {
    const newNode = new Node(val, null, this._head);
    this._head = newNode;
    this._length++;
  }
  insert(val: T, index: number) {
    if (index === 0) {
      return this.prepend(val);
    } else if (index === this._length) {
      return this.append(val);
    } else {
      const nextNode = this.getNodeByIndex(index);
      if (!nextNode) return null;
      const prevNode = nextNode.prev;
      prevNode.next = new Node<T>(val, prevNode, nextNode);
      nextNode.prev = prevNode.next;
      this._length++;
    }
  }
  getHead(): Node<T> {
    return this._head;
  }
  private getNodeByIndex(index: number): Node<T> {
    if (index < 0 || index >= this._length) return null;
    let curNode = this._head;
    let curIndex = 0;

    while (curNode.next && curIndex < index) {
      curNode = curNode.next;
      curIndex++;
    }

    return curNode;
  }
}
