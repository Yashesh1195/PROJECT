/**
 * Jay Dwarkadhish Accounting Services – server.js
 * Node.js + Express backend with Nodemailer contact form handler
 *
 * Usage:
 *   1. npm install express nodemailer dotenv
 *   2. Create a .env file (see .env.example below)
 *   3. node server.js
 *
 * .env.example:
 *   EMAIL_USER=your_gmail@gmail.com
 *   EMAIL_PASS=your_app_password
 *   PORT=3000
 */

require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'env.example'), override: false });

const app = express();
const PORT = process.env.PORT || 3000;
const MAIL_USER = (process.env.EMAIL_USER || '').trim();
const MAIL_PASS = (process.env.EMAIL_PASS || '').replace(/\s+/g, '');
const MAIL_TO = (process.env.EMAIL_TO || MAIL_USER || 'nihar@jaydwarkadhishaccountingservices.com').trim();

// ---- Middleware ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files from the same directory
app.use(express.static(path.join(__dirname)));

// ---- Nodemailer Transporter ----
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,  // Use Gmail App Password, not your account password
  },
});

// ---- POST /api/contact ----
app.post('/api/contact', async (req, res) => {
  if (!MAIL_USER || !MAIL_PASS) {
    return res.status(500).json({
      error: 'Mail service is not configured. Add EMAIL_USER and EMAIL_PASS in .env (or env.example).'
    });
  }

  const { name, email, message } = req.body;

  // --- Validation ---
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Please provide a valid name.' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({ error: 'Message must be at least 10 characters.' });
  }

  const sanitizedName    = name.trim().substring(0, 100);
  const sanitizedEmail   = email.trim().substring(0, 200);
  const sanitizedMessage = message.trim().substring(0, 5000);

  // --- Email to firm ---
  const mailToFirm = {
    from: `"Jay Dwarkadhish Website" <${MAIL_USER}>`,
    to: MAIL_TO,
    replyTo: sanitizedEmail,
    subject: `New Contact Form Inquiry from ${sanitizedName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f4f6fb; padding: 32px; border-radius: 12px;">
        <div style="background: linear-gradient(135deg, #0f2557, #1a4a8e); padding: 28px 32px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: #f0c040; font-size: 22px; margin: 0; letter-spacing: 1px;">Jay Dwarkadhish Accounting Services</h1>
          <p style="color: #a0b8e0; margin: 8px 0 0; font-size: 14px;">New Contact Form Submission</p>
        </div>
        <div style="background: #ffffff; padding: 32px; border-radius: 0 0 10px 10px; border: 1px solid #e0e8f4;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 16px; background: #f4f6fb; border-radius: 6px; font-weight: 600; color: #0f2557; width: 120px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Name</td>
              <td style="padding: 12px 16px; color: #1a1a2e; font-size: 15px;">${sanitizedName}</td>
            </tr>
            <tr><td colspan="2" style="height: 8px;"></td></tr>
            <tr>
              <td style="padding: 12px 16px; background: #f4f6fb; border-radius: 6px; font-weight: 600; color: #0f2557; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
              <td style="padding: 12px 16px;"><a href="mailto:${sanitizedEmail}" style="color: #1a4a8e; font-size: 15px;">${sanitizedEmail}</a></td>
            </tr>
            <tr><td colspan="2" style="height: 8px;"></td></tr>
            <tr>
              <td style="padding: 12px 16px; background: #f4f6fb; border-radius: 6px; font-weight: 600; color: #0f2557; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top;">Message</td>
              <td style="padding: 12px 16px; color: #1a1a2e; font-size: 15px; line-height: 1.7; white-space: pre-line;">${sanitizedMessage}</td>
            </tr>
          </table>
          <div style="margin-top: 28px; padding: 16px; background: linear-gradient(135deg, rgba(201,150,12,0.1), rgba(240,192,64,0.05)); border: 1px solid rgba(201,150,12,0.3); border-radius: 8px;">
            <p style="margin: 0; font-size: 13px; color: #7a5c00;"><strong>Reply directly</strong> to this email to respond to ${sanitizedName}.</p>
          </div>
        </div>
        <p style="text-align: center; color: #a0b0c8; font-size: 12px; margin-top: 20px;">Jay Dwarkadhish Accounting Services &bull; GST No: 24ESWPB3235E1ZU</p>
      </div>
    `,
  };

  // --- Auto-reply to sender ---
  const autoReply = {
    from: `"Jay Dwarkadhish Accounting Services" <${MAIL_USER}>`,
    to: sanitizedEmail,
    subject: 'We received your message – Jay Dwarkadhish Accounting Services',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f4f6fb; padding: 32px; border-radius: 12px;">
        <div style="background: linear-gradient(135deg, #0f2557, #1a4a8e); padding: 28px 32px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: #f0c040; font-size: 22px; margin: 0;">Jay Dwarkadhish Accounting Services</h1>
        </div>
        <div style="background: #ffffff; padding: 32px; border-radius: 0 0 10px 10px; border: 1px solid #e0e8f4;">
          <p style="color: #1a1a2e; font-size: 16px;">Dear ${sanitizedName},</p>
          <p style="color: #344e7a; font-size: 15px; line-height: 1.8;">Thank you for reaching out to us. We have received your message and will get back to you as soon as possible, typically within 24 hours on business days.</p>
          <p style="color: #344e7a; font-size: 15px; line-height: 1.8;">For urgent inquiries, please call us directly at <a href="tel:8780160801" style="color: #1a4a8e; font-weight: 600;">8780160801</a>.</p>
          <div style="margin: 28px 0; padding: 20px; background: #f4f6fb; border-left: 4px solid #c9960c; border-radius: 4px;">
            <p style="margin: 0; font-size: 13px; color: #344e7a; font-weight: 600;">Jay Dwarkadhish Accounting Services</p>
            <p style="margin: 4px 0 0; font-size: 13px; color: #7a90b8;">Nihar Brahmbhatt, M.Com, Inter CA</p>
            <p style="margin: 4px 0 0; font-size: 13px; color: #7a90b8;">C-88, Manglam Tenement, Ghodasar, Ahmedabad – 380505</p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailToFirm);
    await transporter.sendMail(autoReply);
    return res.status(200).json({ message: 'Your message has been sent successfully.' });
  } catch (err) {
    console.error('Nodemailer error:', err.message);
    return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});

// ---- Serve index.html for all other routes ----
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ---- Start Server ----
const server = app.listen(PORT, () => {
  console.log(`\nJay Dwarkadhish Accounting Services server running at:`);
  console.log(`  http://localhost:${PORT}\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the running server or change PORT in your environment.`);
    process.exit(1);
  }

  console.error('Server startup error:', err.message);
  process.exit(1);
});
