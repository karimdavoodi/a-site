import { NextResponse } from "next/server";
import { Resend } from 'resend';
import infoData from "@public/data/info.json";

const adminEmail = infoData.contact.email;

export const runtime = "nodejs";

export async function POST(request: Request) {
    const { name, email, subject, message } = await request.json();

    if(!name || !message || !subject ){
        return NextResponse.json({ success: false, message : "All fields are required." });
    }

    if(!process.env.RESEND_KEY){
        return NextResponse.json({ success: false, message : "Email service is not configured." });
    }
        
    const resend = new Resend(process.env.RESEND_KEY);

    const res = await resend.emails.send({
        from: 'alsalaam@resend.dev',
        to: adminEmail, 
        subject: `User message in the website`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Subject:</strong> ${subject}</p>
               <p><strong>Message:</strong><br/>${message}</p>`
    });

    if(res.error){
        console.log(res.error);
    }
    return NextResponse.json({ success: true });
}




