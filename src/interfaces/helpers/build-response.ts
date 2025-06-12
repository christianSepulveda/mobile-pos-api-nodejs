import { Response } from "express";

export class BuildResponse {
  static success(res: Response, data: any) {
    const status = 200;
    const message = "Success";
    const response = { error: false, status, message, data };

    return res.status(status).json(response);
  }

  static error(res: Response, error: Error) {
    const status = 500;
    const message = error.message;
    const response = { error: true, status, message, data: [] };

    console.error(response);
    return res.status(status).json(response);
  }

  static authError(res: Response, error: Error) {
    const status = 401;
    const message = error.message;
    const response = { error: true, status, message, data: [] };

    console.error(response);
    return res.status(status).json(response);
  }
}
