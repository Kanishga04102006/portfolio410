import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requestLog = new Map<string, number[]>();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9\s\-()]{8,20}$/;

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  website?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = requestLog.get(ip) || [];
  const inWindow = timestamps.filter((ts) => now - ts < WINDOW_MS);

  if (inWindow.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(ip, inWindow);
    return false;
  }

  inWindow.push(now);
  requestLog.set(ip, inWindow);
  return true;
}

function validatePayload(data: Payload): string | null {
  const name = data.name?.trim() || '';
  const email = data.email?.trim() || '';
  const phone = data.phone?.trim() || '';
  const subject = data.subject?.trim() || '';
  const message = data.message?.trim() || '';

  if (data.website && data.website.trim()) {
    return 'Spam detected.';
  }

  if (!name || name.length < 2 || name.length > 60) {
    return 'Name must be between 2 and 60 characters.';
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return 'Please provide a valid email address.';
  }

  if (phone && !PHONE_REGEX.test(phone)) {
    return 'Please provide a valid phone number.';
  }

  if (!subject || subject.length < 4 || subject.length > 120) {
    return 'Subject must be between 4 and 120 characters.';
  }

  if (!message || message.length < 15 || message.length > 2000) {
    return 'Message must be between 15 and 2000 characters.';
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute and try again.' },
        { status: 429 }
      );
    }

    const payload = (await req.json()) as Payload;
    const validationError = validatePayload(payload);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpSecure = (process.env.SMTP_SECURE || 'false').toLowerCase() === 'true';
    const toEmail = process.env.CONTACT_TO_EMAIL || 'kanisathiya06@gmail.com';
    const fromEmail = process.env.SMTP_FROM || smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass || !fromEmail) {
      return NextResponse.json(
        { error: 'Email service is not configured yet. Please set SMTP environment variables.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    await transporter.verify();

    const name = payload.name!.trim();
    const email = payload.email!.trim();
    const phone = payload.phone?.trim() || 'Not provided';
    const subject = payload.subject!.trim();
    const message = payload.message!.trim();

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
        <h2 style="margin-bottom: 12px;">New Portfolio Contact Message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 12px; border-radius: 8px; background: #f1f5f9; white-space: pre-wrap;">${escapeHtml(message)}</div>
      </div>
    `;

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Unable to send message right now. Please try again later.' },
      { status: 500 }
    );
  }
}
