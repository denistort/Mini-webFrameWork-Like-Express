const DEFAULT_METHOD = "GET";

export class Router {
    constructor() {
        this.endpoints = {}
    }

    request(method = DEFAULT_METHOD, path, handler) {
        if (!this.endpoints[path]) {
            this.endpoints[path] = {}
        }
        const endpoint = this.endpoints[path]
        if (endpoint[method]) {
            throw new Error(`this ${method} in the path ${path} already exist`)
        }


        endpoint[method] = handler;
    }

    get(path, handler) {
        return this.request('GET', path, handler)
    }
    post(path, handler) {
        return this.request('POST', path, handler)
    }
    patch(path, handler) {
        return this.request('PATCH', path, handler)
    }
    delete(path, handler) {
        return this.request('DELETE', path, handler)
    }

}