import koa from "koa";
import koaRouter from "koa-router";
import bodyParser from "koa-bodyparser";
import queryRoutes from "./query-routes";

const api = koa();
const router = koaRouter();

api.use(bodyParser());

router.get("/message", queryRoutes.fetchMessage);
router.get("/throwError", queryRoutes.throwErrorByDefault);
// ......................
router.get("/webhook", queryRoutes.webhook);


api
  .use(router.routes());

export default api;
