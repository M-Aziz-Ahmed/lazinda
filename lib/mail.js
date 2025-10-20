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

  // 1) If user explicitly provided a valid-looking SMTP host and user, use it
  if (looksLikeHostname(smtpHost) && smtpUser) {
    try {
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
      });
      await transporter.verify();
    } catch (err) {
      console.warn('Configured SMTP verify failed, will attempt other options:', err && err.message ? err.message : err);
      transporter = null;
    }
  }

  // 2) If SMTP not configured but the user is a Gmail address with an app password, support Gmail service
  if (!transporter && smtpUser && smtpUser.toLowerCase().endsWith('@gmail.com') && smtpPass) {
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
  }

  // 3) Fallback to Ethereal for development/testing
  if (!transporter) {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
    usedEthereal = true;
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM || smtpUser || 'no-reply@example.com',
    to,
    subject: 'Your login OTP code',
    text: `Your OTP code is ${code}`,
    html: `<p>Your OTP code is <strong>${code}</strong></p>`,
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
