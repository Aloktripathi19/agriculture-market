import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const INQUIRY_TYPE_LABELS: Record<string, string> = {
  'bulk-order': 'Bulk Order',
  'export': 'Export Inquiry',
  'product-info': 'Product Information',
  'partnership': 'Partnership',
  'general': 'General Inquiry',
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const typeLabel = INQUIRY_TYPE_LABELS[data.type] ?? data.type;
    const subject = data.productName
      ? `New Inquiry: ${data.productName} — ${typeLabel}`
      : `New Inquiry: ${typeLabel} from ${data.name}`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f8fafc; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 0 auto; padding: 32px 16px; }
    .card { background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
    .header { background: linear-gradient(135deg, #16a34a, #15803d); padding: 28px 32px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 20px; }
    .header p { color: #bbf7d0; margin: 4px 0 0; font-size: 13px; }
    .body { padding: 28px 32px; }
    .badge { display: inline-block; background: #dcfce7; color: #15803d; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 20px; }
    .product-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 14px 18px; margin-bottom: 20px; }
    .product-box p { margin: 0; font-size: 14px; color: #15803d; font-weight: 600; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    td { padding: 10px 0; font-size: 14px; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
    td:first-child { color: #64748b; width: 38%; font-weight: 500; }
    td:last-child { color: #0f172a; font-weight: 600; }
    .message-box { background: #f8fafc; border-left: 3px solid #16a34a; border-radius: 4px; padding: 14px 18px; font-size: 14px; color: #334155; line-height: 1.6; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 32px; font-size: 12px; color: #94a3b8; text-align: center; }
    .cta { display: inline-block; margin-top: 20px; padding: 12px 24px; background: #16a34a; color: #ffffff; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <h1>🌾 New Buyer Inquiry</h1>
        <p>Arihant Enterprises</p>
      </div>
      <div class="body">
        <span class="badge">${typeLabel}</span>
        ${data.productName ? `
        <div class="product-box">
          <p>📦 Product: ${data.productName}</p>
        </div>` : ''}
        <table>
          <tr><td>Buyer Name</td><td>${data.name}</td></tr>
          <tr><td>Email</td><td><a href="mailto:${data.email}" style="color:#16a34a">${data.email}</a></td></tr>
          <tr><td>Phone</td><td><a href="tel:${data.phone}" style="color:#16a34a">${data.phone}</a></td></tr>
          <tr><td>Country</td><td>${data.country}</td></tr>
          ${data.company ? `<tr><td>Company</td><td>${data.company}</td></tr>` : ''}
          ${data.quantity ? `<tr><td>Quantity Required</td><td>${data.quantity}</td></tr>` : ''}
        </table>
        <p style="font-size:13px;color:#64748b;font-weight:500;margin-bottom:8px;">Message / Requirements:</p>
        <div class="message-box">${data.message.replace(/\n/g, '<br/>')}</div>
        <a href="mailto:${data.email}?subject=Re: Your Inquiry — Arihant Enterprises&body=Dear ${data.name},%0A%0AThank you for reaching out to Arihant Enterprises.%0A%0A" style="display:inline-block;margin-top:24px;padding:12px 26px;background:#f0fdf4;color:#15803d !important;border:1px solid #bbf7d0;border-radius:10px;text-decoration:none;font-size:14px;font-weight:600;">✉️&nbsp;Reply to ${data.name}</a>
      </div>
      <div class="footer">
        Arihant Enterprises &nbsp;·&nbsp; +91 79998 37117
      </div>
    </div>
  </div>
</body>
</html>`;

    await transporter.sendMail({
      from: `"Arihant Enterprises" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: data.email,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Email send error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
