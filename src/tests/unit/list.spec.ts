import { List } from '../../list';

describe('List', () => {
  let list: List<number>;
  beforeEach(() => {
    list = new List<number>();
  });
  describe('#length', () => {
    it('should return the length of current list', () => {
      list.append(1);
      list.append(2);
      expect(list.length()).toBe(2);
    });
  });
});
