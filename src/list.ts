import { Node } from './node';

export class List<T> {
  public head: Node<T>;
  public tail: Node<T>;
  private _length: number;
  constructor() {
    this.tail = this.head = null;
    this._length = 0;
  }
  length() {
    return this._length;
  }
  append(val: T) {
    if (this.length() === 0) {
      this.head = this.tail = new Node<T>(val);
    } else {
      this.tail.next = new Node<T>(val, this.tail);
      this.tail.next.prev = this.tail;
      this.tail = this.tail.next;
    }
    this._length++;
  }
  prepend(val: T) {
    this.head = new Node(val, null, this.head);
    this._length++;
  }
  delete(index: number): T | null {
    let val: T;
    if (index === 0) {
      val = this.head.val;
      this.head = this.head.next;
      this.head.prev = null;
      this._length--;
      return val;
    } else if (index === this._length - 1) {
      val = this.tail.val;
      this.tail = this.tail.prev;
      this.tail.next = null;
      return val;
    } else {
      const elemToDelete = this.getNodeByIndex(index);
      if (!elemToDelete) return null;
      const prev = elemToDelete.prev;
      const next = elemToDelete.next;
      prev.next = next;
      next.prev = prev;
      val = elemToDelete.val;
    }
    this._length--;
    return val;
  }
  get(index: number): T | null {
    const node = this.getNodeByIndex(index);
    if (!node) return null;
    return node.val;
  }
  reverse() {
    const head = this.head;
    this.head = this.tail;
    this.tail = head;
    let curElem = this.head;
    while (curElem) {
      const nextElem = curElem.next;
      curElem.next = curElem.prev;
      curElem.prev = nextElem;
      curElem = curElem.next;
    }
  }
  clone(): List<T> {
    const newList = new List<T>();
    let curElemOfOldList = this.head;
    while (curElemOfOldList) {
      newList.append(curElemOfOldList.val);
      curElemOfOldList = curElemOfOldList.next;
    }

    return newList;
  }
  clear() {
    this.head = null;
    this.tail = null;
    this._length = 0;
  }
  extend(list: List<T>): void {
    let curElem = list.head;
    while (curElem) {
      this.append(curElem.val);
      curElem = curElem.next;
    }
  }
  deleteAll(val: T) {
    let curElem = this.head;
    let curIndex = 0;
    while (curElem) {
      if (curElem.val === val) {
        console.log(curIndex);
        this.delete(curIndex);
      } else curIndex++;
      curElem = curElem.next;
    }
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
    return this.head;
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
