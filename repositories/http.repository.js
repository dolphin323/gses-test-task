import fetch from "node-fetch";
import qs from "qs";
import { ExceptionMessage, HttpMethod } from "../utils/enums/enums.js";

class HttpRepository {
  async load(url, options = {}) {
    const headers = options.headers || {};
    const queryString = options.queryParams
      ? `?${qs.stringify(options.queryParams)}`
      : "";
    const method = options.method || HttpMethod.GET;
    let body;

    if (options.body) {
      if (method === HttpMethod.GET) {
        throw new Error(ExceptionMessage.GET_REQUEST_DOESNT_SUPPORT_REQ_BODY);
      }

      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url + queryString, {
      method,
      headers,
      ...(method === HttpMethod.GET ? {} : { body }),
    });

    return response;
  }
}

export { HttpRepository };
