import { Hono } from "hono";
import userRoutes from "./userRoutes";
import modelRoute from "../model";
import userImageRoute from "./userImage";

const mainRoute = new Hono();

mainRoute.route('/info', userRoutes)

mainRoute.route('/ai', modelRoute)

mainRoute.route('/images', userImageRoute)





export default mainRoute;