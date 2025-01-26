import { LocalStorage } from "./Drivers/LocalStorage.js";
import { SessionStorage } from "./Drivers/SessionStorage.js";
import { Cookie } from "./Drivers/Cookie.js";

export class Store {
    static #instances = new Map();
    static #drivers = Object.freeze({
        local: LocalStorage,
        session: SessionStorage,
        cookie: Cookie
    });

    constructor(driver) {
        this.driver = driver;
        this.cache = new Map();
    }

    static getInstance(type) {
        if (!this.#instances.has(type)) {
            const DriverClass = this.#drivers[type];
            if (!DriverClass) throw new Error(`Unknown driver type: ${type}`);
            this.#instances.set(type, new Store(new DriverClass()));
        }
        return this.#instances.get(type);
    }

    get(key) {
        return this.cache.get(this.#getCacheKey(key)) ?? this.#fetchAndCache(key);
    }

    set(key, value, ttl) {
        this.cache.set(this.#getCacheKey(key), value);
        this.driver.set(key, value, ttl);
    }

    #getCacheKey(key) {
        return `${this.driver.toString()}:${key}`;
    }

    #fetchAndCache(key) {
        const value = this.driver.get(key);
        if (value) {
            const cacheKey = this.#getCacheKey(key);
            this.cache.set(cacheKey, value);
        }
        return value;
    }
}