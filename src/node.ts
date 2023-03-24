export class Node<T> {
  prev: Node<T>;
  next: Node<T>;
  val: T;
  constructor(val: T, prev: Node<T> = null, next: Node<T> = null) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}
