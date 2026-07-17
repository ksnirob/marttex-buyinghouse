import { env } from "../config/env.js";

let transporter;

function splitEmails(value = "") {
  return String(value)
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

async function sendWithResendApi({ from, to, replyTo, subject, text, html }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), env.smtpTimeoutMs);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: splitEmails(to),
        reply_to: replyTo ? [replyTo] : undefined,
        subject,
        text,
        html,
      }),
      signal: controller.signal,
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.message || `Resend API request failed with status ${response.status}.`);
    }

    return result;
  } finally {
    clearTimeout(timeout);
  }
}

async function getTransporter() {
  if (!transporter) {
    const { default: nodemailer } = await import("nodemailer");
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
  if (!env.smtpPass && !env.resendApiKey) {
    return { sent: false, reason: "Email credentials are not configured." };
  }

  const submittedAt = enquiry.createdAt
    ? new Date(enquiry.createdAt).toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Dhaka",
      })
    : new Date().toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Dhaka",
      });
  const subject = `New Mart Tex enquiry from ${enquiry.name} - ${submittedAt}`;
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

  if (env.resendApiKey && env.smtpHost === "smtp.resend.com") {
    await sendWithResendApi({
      from: env.mailFrom,
      to: env.mailTo,
      replyTo: enquiry.email,
      subject,
      text,
      html,
    });
  } else {
    await Promise.race([
      (await getTransporter()).sendMail({
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
  }

  return { sent: true };
}
