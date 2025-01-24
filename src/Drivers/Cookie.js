export class Cookie {

    set(key, value, ttl) {

        const date = new Date();
        date.setTime(date.getTime() + ttl * 1000);
        const expires = "expires=" + date.toUTCString();
        return document.cookie = `${key}=${value}; ${expires}; "path=/"`;
    }

    get(key) {
        const cookieArray = document.cookie.split(';');
        for (let cookie of cookieArray) {
            cookie = cookie.trim();
            if (cookie.startsWith(`${key}=`)) {
                return cookie.substring(key.length + 1);
            }
        }
        return null;
    }
}

