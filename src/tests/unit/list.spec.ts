import { List } from '../../list';
const list = new List<string>();
list.append('1');
list.append('1');
list.append('2');
list.append('1');
list.append('3');
const res = list.findFirst('1');
console.log(res);
