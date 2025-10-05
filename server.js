import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/lead', async (req, res) => {
  try {
    const { name, email, tradingSkill, goals } = req.body || {};
    if (!name || !email) return res.status(400).json({ ok: false, error: 'Missing required fields' });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || 'true') === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    const to = process.env.TO_EMAIL || 'darcyhansen@marsx.ink';
    const subject = `CRSEX Lead: ${name} (${tradingSkill || 'N/A'})`;
    const html = `<h2>New CRSEX Lead</h2>
      <ul>
        <li><b>Name:</b> ${name}</li>
        <li><b>Email:</b> ${email}</li>
        <li><b>Skill:</b> ${tradingSkill || ''}</li>
        <li><b>Goals:</b> ${goals || ''}</li>
      </ul>`;

    await transporter.sendMail({ from: process.env.SMTP_USER, to, subject, html });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
