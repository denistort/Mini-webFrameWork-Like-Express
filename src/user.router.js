import { Router } from "../Framework/Router/Router.js";
import { getUsers, addUsers } from "./user.controller.js";

const router = new Router();

router.get('/users', getUsers)
router.post('/users', addUsers)

export { router }