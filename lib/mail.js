import nodemailer from 'nodemailer';

function looksLikeHostname(value) {
  if (!value) return false;
  // crude check: hostnames should not contain '@' and should be longer than a couple chars
  return typeof value === 'string' && !value.includes('@') && value.length > 3;
}

export async function sendOtpEmail(to, code) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpSecure = process.env.SMTP_SECURE === 'true';

  let transporter = null;
  let usedEthereal = false;

    try {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: smtpUser, pass: smtpPass },
      });
      await transporter.verify();
    } catch (err) {
      console.warn('Gmail service verify failed, falling back to Ethereal:', err && err.message ? err.message : err);
      transporter = null;
    }

  const fromAddress = process.env.EMAIL_FROM || smtpUser || 'no-reply@example.com';
  const appName = process.env.APP_NAME || 'Lazinda';
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const expiresInMinutes = 5;

  const subject = `${appName}: Your login code`;

  const text = `Your ${appName} login code is ${code}. It will expire in ${expiresInMinutes} minutes.

If you did not request this, you can safely ignore this email.`;

  const html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>${appName} — Login code</title>
    </head>
    <body style="font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; background:#f6f8fb; margin:0;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center" style="padding:24px 16px;">
            <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(15,23,42,0.08);">
              <tr>
                <td style="padding:20px 24px; border-bottom:1px solid #f0f2f5; display:flex; align-items:center; gap:12px;">
                  <div>
                  </div>
                  <div>
                    <div style="font-size:16px;font-weight:600;color:#0f172a;">${appName}</div>
                    <div style="font-size:13px;color:#64748b;">Your one-time login code</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:32px 40px;text-align:center;">
                  <div style="font-size:14px;color:#334155;margin-bottom:16px;">Use the code below to sign in. This code expires in ${expiresInMinutes} minutes.</div>
                  <div style="display:inline-block;padding:18px 26px;border-radius:12px;background:linear-gradient(180deg,#ffffff,#f8fafc);box-shadow:inset 0 -1px 0 rgba(15,23,42,0.03);margin:18px 0;">
                    <div style="font-family: 'Courier New', monospace;letter-spacing:4px;font-size:28px;color:#0f172a;font-weight:700;">${code}</div>
                  </div>
                  <div style="margin-top:18px;">
                    <a href="${baseUrl}" style="display:inline-block;padding:10px 18px;border-radius:10px;background:#4f46e5;color:white;text-decoration:none;font-weight:600;">Open ${appName}</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 24px;border-top:1px solid #f0f2f5;font-size:13px;color:#94a3b8;">
                  <div>If you didn't request this code, you can safely ignore this email or <a href="${baseUrl}/support" style="color:#4f46e5;text-decoration:none">contact support</a>.</div>
                  <div style="margin-top:8px;">Thanks — The ${appName} team</div>
                </td>
              </tr>
            </table>
            <div style="max-width:600px;margin:16px auto 0;color:#9aa4b2;font-size:12px;text-align:center;">This email was sent to <strong>${to}</strong>. If you'd like to manage email preferences, visit your account settings.</div>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;

  const mailOptions = {
    from: fromAddress,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    if (usedEthereal) return nodemailer.getTestMessageUrl(info) || null;
    return null;
  } catch (err) {
    console.error('Error sending OTP email:', err && err.message ? err.message : err);
    // As a last resort, if we didn't already use ethereal, try ethereal once
    if (!usedEthereal) {
      try {
        const testAccount = await nodemailer.createTestAccount();
        const fallback = nodemailer.createTransport({
          host: testAccount.smtp.host,
          port: testAccount.smtp.port,
          secure: testAccount.smtp.secure,
          auth: { user: testAccount.user, pass: testAccount.pass },
        });
        const info = await fallback.sendMail(mailOptions);
        return nodemailer.getTestMessageUrl(info) || null;
      } catch (err2) {
        console.error('Ethereal fallback failed:', err2 && err2.message ? err2.message : err2);
        throw new Error('Failed to send OTP email (SMTP and fallback failed)');
      }
    }
    throw new Error('Failed to send OTP email');
  }
}
