import { Node } from './node';
import { util } from 'prettier';
import isNextLineEmpty = util.isNextLineEmpty;

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
    this._head = new Node(val, null, this._head);
    this._length++;
  }
  delete(index: number): T | null {
    if (index === 0) {
      const val = this._head.val;
      this._head = this._head.next;
      this._head.prev = null;
      return val;
    } else if (index === this._length - 1) {
      const val = this._tail.val;
      this._tail = this._tail.prev;
      this._tail.next = null;
      return val;
    } else {
      const elemToDelete = this.getNodeByIndex(index);
      if (!elemToDelete) return null;
      const prev = elemToDelete.prev;
      const next = elemToDelete.next;
      prev.next = next;
      next.prev = prev;
      return elemToDelete.val;
    }
  }
  get(index: number): T | null {
    const node = this.getNodeByIndex(index);
    if (!node) return null;
    return node.val;
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
