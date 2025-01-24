import {LocalStorage} from "./Drivers/LocalStorage.js";
import {SessionStorage} from "./Drivers/SessionStorage.js";
import {Cookie} from "./Drivers/Cookie.js";

export class Store {
    static #instances = new Map();
    static #drivers = Object.freeze({
        local: new LocalStorage(),
        session: new SessionStorage(),
        cookie: new Cookie()
    });

    constructor(driver) {
        this.driver = driver;
        this.cache = new Map();
    }

    static getInstance(type) {
        return this.#instances.get(type) ??
            this.#instances.set(type, new Store(this.#drivers[type])).get(type);
    }

    get(key) {
        return this.cache.get(key) ?? this.#fetchAndCache(key);
    }

    set(key, value, ttl) {
        this.cache.set(key, value);
        this.driver.set(key, value, ttl);
    }

    #fetchAndCache(key) {
        const value = this.driver.get(key);
        if (value) this.cache.set(key, value);
        return value;
    }
}