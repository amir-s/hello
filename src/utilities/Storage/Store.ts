const Store = {
  set: (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  get: (key: string) => {
    const data = localStorage.getItem(key);
    if (!data) return undefined;
    return JSON.parse(data);
  },
};
export default Store;
