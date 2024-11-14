import { Hono } from "hono";
import userRoutes from "./userRoutes";
import modelRoute from "../model";

const mainRoute = new Hono();

mainRoute.route('/', userRoutes)

mainRoute.route('/ai', modelRoute)





export default mainRoute;