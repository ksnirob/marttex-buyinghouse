import { ApiError } from "../utils/apiError.js";

export function notFound(req, _res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(error, _req, res, _next) {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong.";

  if (error.code === "P2002") {
    statusCode = 409;
    message = "A record with that value already exists.";
  } else if (error.code === "P2003") {
    statusCode = 409;
    message = "This record is still referenced by another record.";
  } else if (error.code === "P2025") {
    statusCode = 404;
    message = "Record not found.";
  }

  if (statusCode >= 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message,
    details: error.details || undefined,
  });
}
