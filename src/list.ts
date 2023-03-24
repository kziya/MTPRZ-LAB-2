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
    const newNode = new Node<T>(val, null, this.head);
    if (this.head) {
      this.head.prev = newNode;
    } else {
      this.tail = newNode;
    }
    this.head = newNode;
    this._length++;
  }
  get(index: number): T | null {
    const node = this.getNodeByIndex(index);
    if (!node) return null;
    return node.val;
  }
  delete(index: number): T | null {
    let val: T;
    if (index === 0) {
      val = this.head.val;
      this.head = this.head.next;
      if (this.head) this.head.prev = null;
    } else if (index === this._length - 1) {
      val = this.tail.val;
      this.tail = this.tail.prev;
      if (this.tail) this.tail.next = null;
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
  findFirst(val: T): number {
    let curElem = this.head;
    let curIndex = 0;
    while (curElem) {
      if (curElem.val === val) {
        return curIndex;
      }
      curElem = curElem.next;
      curIndex++;
    }
  }
  findLast(val: T) {
    let curElem = this.head;
    let curIndex = 0;
    let lastIndex = -1;
    while (curElem) {
      if (curElem.val === val) {
        lastIndex = curIndex;
      }
      curElem = curElem.next;
      curIndex++;
    }

    return lastIndex;
  }
  deleteAll(val: T) {
    let curElem = this.head;
    let curIndex = 0;
    while (curElem) {
      if (curElem.val === val) {
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
