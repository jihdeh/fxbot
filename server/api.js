import mount from "koa-mount";
import koa from "koa";
import cacheControl from "koa-cache-control";
import apiErrorHandler from  "../util/api-error-handler";
import endpointApi from "../app/endpoints";


export default function Api() {
  const api = koa();
  api.use(apiErrorHandler);

  api.use(cacheControl({maxage: 10 * 1000}));
  api.use(mount("/", endpointApi));
  api.use(function *terminator() {
    return; // Do not continue past the API request handlers into the frontend request handlers
  });

  return api;
}
