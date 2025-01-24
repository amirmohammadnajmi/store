export class LocalStorage {
    set(key, value) {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
        return true;
    }

    get(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }
}