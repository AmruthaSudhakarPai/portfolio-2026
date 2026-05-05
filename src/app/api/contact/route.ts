import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

let transporter: nodemailer.Transporter
let currentAuth: { user: string; pass: string }

async function getTransporter() {
  if (transporter) return { transporter, auth: currentAuth }

  let auth: { user: string; pass: string }

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    auth = {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  } else {
    // Use Ethereal for testing when no credentials provided
    const testAccount = await nodemailer.createTestAccount()
    auth = {
      user: testAccount.user,
      pass: testAccount.pass,
    }
  }

  currentAuth = auth
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: Number(process.env.EMAIL_PORT || 587),
    secure: (process.env.EMAIL_SECURE ?? 'false') === 'true',
    auth,
  })

  return { transporter, auth }
}

export async function GET() {
  return NextResponse.json({ configured: true })
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { transporter, auth } = await getTransporter()
    const recipient = process.env.EMAIL_TO || process.env.EMAIL_USER || auth.user

    const htmlMessage = `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br />')}</p>
    `

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || `"Portfolio Contact" <${auth.user}>`,
      to: recipient,
      subject: `New message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: htmlMessage,
    })

    console.log('Message sent:', info.messageId)
    if (!process.env.EMAIL_USER) {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info))
    }

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact submission failed:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
