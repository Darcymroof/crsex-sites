import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ ok: false });
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || 'true') === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    await transporter.sendMail({ from: process.env.SMTP_USER, to: process.env.TO_EMAIL, subject:`Lead from ${name}`, text:`Email: ${email}` });
    res.json({ ok: true });
  } catch { res.status(500).json({ ok: false }); }
}
