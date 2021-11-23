import EventEmitter from 'events';
import http from 'http';

export class Application {
    constructor() {
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }

    use(middleware) {
        this.middlewares.push(middleware)
    }
    _createServer() {
        return http.createServer((req, res) => {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            })
            req.on('end', () => {
                if (body) {
                    req.body = JSON.parse(body)
                }
                this.middlewares.forEach(middleware => middleware(req, res))

                const emmited = this.emitter.emit(
                    this._getRouterMask(req.pathname, req.method),
                    req,
                    res)
                if (!emmited) {
                    res.writeHead(404)
                    res.end('can not find this page')
                }
            })
        })
    }

    _getRouterMask(path, method) {
        return `[${path}]:[${method}]`
    }

    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach(method => {
                this.emitter.on(this._getRouterMask(path, method), (req, res) => {
                    const handler = endpoint[method]

                    handler(req, res)
                })
            })
        })
    }

    listen(PORT, handler) {
        this.server.listen(PORT, handler)
    }
}