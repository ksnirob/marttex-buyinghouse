import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendEnquiryEmail } from "../utils/mailer.js";
import { getPagination } from "../utils/pagination.js";

export const createEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await prisma.enquiry.create({ data: req.validated.body });

  try {
    const email = await sendEnquiryEmail(enquiry);
    if (!email.sent) {
      throw new ApiError(502, email.reason || "Enquiry saved, but email was not sent.");
    }
  } catch (error) {
    console.error("Enquiry email failed:", error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(502, error.message || "Enquiry saved, but email was not sent.");
  }

  res.status(201).json({ success: true, data: enquiry, email: { sent: true } });
});

export const listEnquiries = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const where = req.query.status ? { status: req.query.status } : {};

  const [items, total] = await Promise.all([
    prisma.enquiry.findMany({ where, orderBy: { createdAt: "desc" }, skip, take: limit }),
    prisma.enquiry.count({ where }),
  ]);

  res.json({ success: true, data: items, meta: { page, limit, total } });
});

export const updateEnquiry = asyncHandler(async (req, res) => {
  const existing = await prisma.enquiry.findUnique({ where: { id: req.params.id } });
  if (!existing) throw new ApiError(404, "Enquiry not found.");
  const enquiry = await prisma.enquiry.update({
    where: { id: req.params.id },
    data: req.validated.body,
  });
  res.json({ success: true, data: enquiry });
});

export const deleteEnquiry = asyncHandler(async (req, res) => {
  const existing = await prisma.enquiry.findUnique({ where: { id: req.params.id } });
  if (!existing) throw new ApiError(404, "Enquiry not found.");
  const enquiry = await prisma.enquiry.delete({ where: { id: req.params.id } });
  res.json({ success: true, data: enquiry });
});
