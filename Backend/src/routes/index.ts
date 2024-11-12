import { Hono } from "hono";
import userRoutes from "./userRoutes";
import modelAddRoute from "./ModelAdd";
import modelRoute from "../model";
const routes = [userRoutes, modelAddRoute]

const mainRoute = new Hono();

routes.forEach((route) => {
    mainRoute.route('/', route)
})

mainRoute.route('/ai', modelRoute)





export default mainRoute;