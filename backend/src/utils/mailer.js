import nodemailer from "nodemailer";
import { env } from "../config/env.js";

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpSecure,
      auth: {
        user: env.smtpUser,
        pass: env.smtpPass,
      },
      connectionTimeout: env.smtpTimeoutMs,
      greetingTimeout: env.smtpTimeoutMs,
      socketTimeout: env.smtpTimeoutMs,
    });
  }
  return transporter;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendEnquiryEmail(enquiry) {
  if (!env.smtpPass) {
    return { sent: false, reason: "SMTP_PASS is not configured." };
  }

  const subject = `New Mart Tex enquiry from ${enquiry.name}`;
  const rows = [
    ["Name", enquiry.name],
    ["Company", enquiry.company],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone],
    ["Category", enquiry.category],
    ["Quantity", enquiry.quantity],
    ["Message", enquiry.message],
  ];

  const text = rows
    .map(([label, value]) => `${label}: ${value || "-"}`)
    .join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #12343b;">
      <h2>New website enquiry</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 640px;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <th align="left" style="border: 1px solid #d9e6e7; background: #f3faf9; width: 140px;">${escapeHtml(label)}</th>
                <td style="border: 1px solid #d9e6e7;">${escapeHtml(value || "-").replace(/\n/g, "<br>")}</td>
              </tr>
            `,
          )
          .join("")}
      </table>
    </div>
  `;

  await Promise.race([
    getTransporter().sendMail({
      from: env.mailFrom,
      to: env.mailTo,
      replyTo: enquiry.email,
      subject,
      text,
      html,
    }),
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error("SMTP request timed out.")), env.smtpTimeoutMs);
    }),
  ]);

  return { sent: true };
}
