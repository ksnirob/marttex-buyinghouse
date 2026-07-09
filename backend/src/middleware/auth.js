import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const requireAuth = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    throw new ApiError(401, "Authentication token is required.");
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await prisma.adminUser.findUnique({
      where: { id: payload.sub },
      omit: { passwordHash: true },
    });

    if (!user) {
      throw new ApiError(401, "Admin account no longer exists.");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(401, "Invalid or expired token.");
  }
});
