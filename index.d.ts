import { RequestHandler, Response } from "express";

interface JsendResponse {
  success: (
    data?: object | null,
    status?: number,
    statusLabel?: string
  ) => Response;
  fail: (
    data?: object | null,
    status?: number,
    statusLabel?: string
  ) => Response;
  error: (
    message?: string,
    status?: number,
    options?: {
      code?: string;
      details?: string;
      extra?: object;
    },
    statusLabel?: string
  ) => Response;
}

declare function jsendMiddleware(config?: {
  successLabel?: string;
  failLabel?: string;
  errorLabel?: string;
}): RequestHandler;

declare global {
  namespace Express {
    interface Response {
      jsend: JsendResponse;
    }
  }
}

export = jsendMiddleware;
