import log from "./log";
import util from "util";

export default function* apiErrorHandler(next) {
  try {
    yield next;
  } catch (_error) {
    console.log("Caught API error:");
    console.error(_error);
    const {
      status = 500,
      message = error.stack || "Non-standard, nondescript error. Bug a dev to add messages to error objects",
      userMessage
    } = _error;
    const error = {status, message, userMessage};

    this.body = error;
    this.status = status;

    if (status >= 500) {
      this.app.emit("error", new Error(message), this);
      log.error(message, {status, event: "response", request: this.request.href, error});
    } else {
      log.info(message, {status, event: "response", request: this.request.href, error});
    }
  }
}
