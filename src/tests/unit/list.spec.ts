import { List } from '../../list';
const list = new List<string>();
list.append('Ziya');
list.append('Gunay');
list.insert('Vaqif', 2);
console.log(list.getHead());
