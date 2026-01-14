import { NextResponse } from "next/server";
import { Resend } from "resend";
import infoData from "@public/data/info.json";

const adminEmail = infoData.contact.email;

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json();
  const safeName = String(name).substring(0, 100);
  const safeEmail = String(email).substring(0, 100);
  const safeSubject = String(subject).substring(0, 100);
  const safeMessage = String(message).substring(0, 2048);

  if (!name || !message || !subject || !email) {
    return NextResponse.json({
      success: false,
      message: "Name, email, and subject fields are required.",
    });
  }

  if (!process.env.RESEND_KEY) {
    return NextResponse.json({
      success: false,
      message: "Email service is not configured.",
    });
  }

  const resend = new Resend(process.env.RESEND_KEY);

  const res = await resend.emails.send({
    from: "alsalaam@resend.dev",
    to: adminEmail,
    subject: `User message in the website`,
    html: `<p><strong>Name:</strong> ${safeName}</p>
               <p><strong>Email:</strong> ${safeEmail}</p>
               <p><strong>Subject:</strong> ${safeSubject}</p>
               <p><strong>Message:</strong><br/>${safeMessage}</p>`,
  });

  if (res.error) {
    console.log(res.error);
  } else {
    console.log(`Email sent successfully`);
  }
  return NextResponse.json({ success: true });
}
