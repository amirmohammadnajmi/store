export class SessionStorage {

    set(key, value) {
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        sessionStorage.setItem(key, value);
    }

    get(key) {
        const value = sessionStorage.getItem(key);
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }

}