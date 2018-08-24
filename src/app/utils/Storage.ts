class Storage {
    constructor() {

    }

    get(key: string) {
        return localStorage.getItem(key);
    }

    set(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    clear() {
        localStorage.clear();
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }
}

const storage = new Storage();
export default storage;
