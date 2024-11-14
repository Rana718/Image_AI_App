import { Hono } from "hono";
import saveCancelRoute from "./saveCancel";
import textToImageRoute from "./TextToImage";
import avatarRoute from "./Avatar";
import imageUpBgRoute from "./ImgUpBg";

const modelRoute = new Hono();
const routes = [saveCancelRoute, textToImageRoute, avatarRoute, imageUpBgRoute]

routes.forEach((route) => {
    modelRoute.route('/', route)
})


export default modelRoute;