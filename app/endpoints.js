import koa from "koa";
import koaRouter from "koa-router";
import bodyParser from "koa-bodyparser";
import queryRoutes from "./query-routes";
import pubNub from "./publish-bot"

const api = koa();
const router = koaRouter();

api.use(bodyParser());

// ......................
router.get("/webhook", queryRoutes.webhook);
router.post("/webhook", pubNub.webhook)


api
  .use(router.routes())
  .use(router.allowedMethods());

export default api;
