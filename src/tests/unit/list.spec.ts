import { List } from '../../list';

describe('List', () => {
  let list: List<number>;
  beforeEach(() => {
    list = new List<number>();
  });

  describe('#append', () => {
    it('should add new elem to the end of the list', () => {
      const elemToAdd = 1;
      list.append(elemToAdd);
      expect(list.get(0)).toBe(elemToAdd);
    });
  });
  describe('#length', () => {
    it('should return the length of current list', () => {
      list.append(1);
      list.append(2);
      expect(list.length()).toBe(2);
    });
  });
  describe('#prepend', () => {
    it('should add elem to the beginning of the list', () => {
      const elemToPrepend = 1;
      list.append(-1);
      list.prepend(elemToPrepend);
      expect(list.get(0)).toBe(elemToPrepend);
    });
  });
  describe('#get', () => {
    it('should return elem in the specific index', () => {
      const elemToGet = 1;
      list.append(elemToGet);
      expect(list.get(0)).toBe(elemToGet);
    });
  });
  describe('#delete', () => {
    it('should delete elem added to the start by index', () => {
      const elemToDelete = 1;
      list.append(elemToDelete);
      expect(list.delete(0)).toBe(elemToDelete);
      expect(list.length()).toBe(0);
    });
    it('should delete elem added to the end by index', () => {
      const elemToDelete = 1;
      list.append(0);
      list.append(elemToDelete);
      expect(list.delete(1)).toBe(elemToDelete);
      expect(list.length()).toBe(1);
    });
    it('should delete elem added to the middle by index', () => {
      const elemToDelete = 2;
      list.append(1);
      list.append(elemToDelete);
      list.append(3);
      expect(list.delete(1)).toBe(elemToDelete);
      expect(list.length()).toBe(2);
    });
  });
  describe('#reverse', () => {
    it('should revers the current list', () => {
      list.append(1);
      list.append(2);
      list.append(3);
      list.append(4);
      list.reverse();
      expect(list.get(0)).toBe(4);
      expect(list.get(1)).toBe(3);
      expect(list.get(3)).toBe(1);
    });
  });
  describe('#clone', () => {
    it('should clone current list and return the new one', () => {
      list.append(0);
      list.append(1);
      const newList = list.clone();
      expect(newList.length()).toBe(list.length());
      expect(newList.get(0)).toBe(list.get(0));
      expect(newList.get(1)).toBe(list.get(1));
    });
  });
  describe('#clear', () => {
    it('should remove all the elems from the current list', () => {
      list.append(1);
      list.append(0);
      list.clear();
      expect(list.length()).toBe(0);
      expect(list.get(0)).not.toBe(1);
    });
  });
  describe('#extend', () => {
    it('should get new list and extend current list with new one', () => {
      const newList = new List<number>();
      list.append(1);
      list.append(2);
      newList.append(3);
      list.extend(newList);
      expect(list.length()).toBe(3);
      expect(list.get(list.length() - 1)).toBe(3);
    });
  });
  describe('#findFirst', () => {
    it('should return index of first found elem', () => {
      list.append(0);
      list.append(1);
      list.append(2);
      expect(list.findFirst(1)).toBe(1);
    });
  });
  describe('#findLast', () => {
    it('should return index of last found elem', () => {
      list.append(0);
      list.append(1);
      list.append(2);
      expect(list.findLast(1)).toBe(1);
    });
  });
  describe('#deleteAll', () => {
    it('should delete all the elems that matches given param', () => {
      list.append(1);
      list.append(1);
      list.append(0);
      list.append(1);
      list.deleteAll(1);
      expect(list.length()).toBe(1);
      expect(list.get(0)).toBe(0);
    });
  });
  describe('#insert', () => {
    it('should insert new elem  to the specific index', () => {
      list.append(1);
      list.append(3);
      list.insert(2, 1);
      expect(list.length()).toBe(3);
      expect(list.get(1)).toBe(2);
    });
    it('should not insert new elem when index is not valid', () => {
      list.append(1);
      list.insert(2, -1);
      expect(list.length()).toBe(1);
    });
  });
});
