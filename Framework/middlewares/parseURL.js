export const parseURL = (basedURL) => (req, res) => {
    const parsedURL = new URL(req.url, basedURL)
    const params = {}
    parsedURL.searchParams.forEach((value, key) => {
        params[key] = value
    });

    console.log(params)
    req.pathname = parsedURL.pathname
    req.params = params
}