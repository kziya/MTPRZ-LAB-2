import { List } from '../../list';
const list = new List<string>();
list.append('1');
list.append('1');
list.append('2');
list.append('1');
list.append('3');
list.deleteAll('1');
const res = list.get(0);

console.log(list.head);
