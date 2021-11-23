const PORT = process.env.PORT || 5000;
import { Application } from './Framework/Application.js';
import { router } from './src/user.router.js';
import { jsonParse } from './Framework/middlewares/parseJson.js';
import { parseURL } from './Framework/middlewares/parseURL.js';
const app = new Application()

app.addRouter(router)
app.use(jsonParse)
app.use(parseURL('http:/localhost:5000'))
app.listen(PORT, () => { console.log(`server started on ${PORT} port`) })