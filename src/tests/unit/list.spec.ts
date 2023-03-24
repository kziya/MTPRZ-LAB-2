import { List } from '../../list';
const list = new List<string>();
list.append('1');
list.append('2');
list.append('3');
list.append('4');
list.append('5');
list.append('6');

list.reverse();
const res = list.get(1);
console.log(res);
