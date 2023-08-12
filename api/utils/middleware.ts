import { info, error } from "../utils/logger";
import { Request, Response, NextFunction } from "express";

// Logs out important info of Requests to the server
const requestLogger = (request: Request, response: Response, next: NextFunction) => {
    info("Method: ", request.method);
    info("Path:  ", request.path);
    info("Body:  ", request.body);
    info("---");
    next();
};

// Returns a valid error in case of an unknown endpoint
const unknownEndpoint = (request: Request, response: Response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

export { requestLogger, unknownEndpoint };