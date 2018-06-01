export default class LocalStorage {
  constructor(name) {
    this.name = name;
    if (!window.localStorage.getItem(this.name)) {
      window.localStorage.setItem(this.name, '{}');
    }
  }

  getFullStorage(returnJSON = false) {
    const data = window.localStorage.getItem(this.name);
    return (returnJSON ? data : JSON.parse(data));
  }

  get(key) {
    const data = this.getFullStorage();
    return data[key];
  }

  set(key, value) {
    const data = this.getFullStorage();
    data[key] = value;
    window.localStorage.setItem(this.name, JSON.stringify(data));
  }

  remove(key) {
    const data = this.getFullStorage();
    delete data[key];
    window.localStorage.setItem(this.name, JSON.stringify(data));
  }

  clear() {
    window.localStorage.removeItem(this.key);
  }
}
