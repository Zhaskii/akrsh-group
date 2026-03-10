// mailer.ts
import nodemailer, { Transporter } from 'nodemailer'

// Validate email configuration
const emailUser = process.env.EMAIL_USER
const emailPass = process.env.EMAIL_PASS
const smtpHost = process.env.SMTP_HOST || 'smtp.stackmail.com'
const smtpPort = Number(process.env.SMTP_PORT || 465)

if (!emailUser || !emailPass) {
  console.warn(
    '⚠️  Email configuration missing: EMAIL_USER and EMAIL_PASS environment variables must be set for email functionality',
  )
}

const transporter: Transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  rateDelta: 1000,
  rateLimit: 5,
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 10000,
  auth:
    emailUser && emailPass
      ? {
          user: emailUser,
          pass: emailPass,
        }
      : undefined,
})

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Registration data type for academy registration */
type RegistrationData = {
  registrationNumber?: number
  id?: string
  name: string
  email: string
  phone: string
  dob: string
  age: number
  gender: 'male' | 'female' | 'other'
  address: string
  schoolName: string
  category: 'first' | 'second' | 'third' | 'fourth'
  categoryDisplay: string
  trainingDaysAndTime?: string
  tShirtSize: string
  transportationNeed?: 'yes' | 'no'
  dropoffLocation?: string
}

function minify(html: string) {
  return html.replace(/\n+/g, '').replace(/\s{2,}/g, ' ')
}

/** Send registration confirmation email with QR code */
export async function sendRegistrationEmail(data: RegistrationData) {
  const { registrationNumber, id, name, email, dob, age, categoryDisplay, trainingDaysAndTime } =
    data

  if (!email) {
    throw new Error('recipient email is required')
  }
  if (!name) {
    throw new Error('name is required')
  }

  const fromEmail = process.env.EMAIL_USER || 'no-reply@thunderboltsfc.com'
  const qrCodeUrl = 'https://res.cloudinary.com/doaiilrxn/image/upload/v1767499676/tbc_rytq1b.jpg'

  // Parse training days and time
  let trainingDays = ''
  let trainingTime = ''
  if (trainingDaysAndTime) {
    const parts = trainingDaysAndTime.split(',')
    if (parts.length >= 2) {
      trainingDays = parts[0].trim()
      trainingTime = parts.slice(1).join(',').trim()
    } else {
      trainingDays = trainingDaysAndTime
      trainingTime = ''
    }
  }

  // Format date of birth
  const dobFormatted = dob
    ? new Date(dob).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  // Format gender

  // Use registration number as Registration ID (TFC-1, TFC-2, etc.)
  const registrationId = registrationNumber
    ? `TFC-${registrationNumber}`
    : id || `TFC-${Date.now().toString().slice(-8)}-${name.substring(0, 2).toUpperCase()}`

  const registrationHtml = `
  <html>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <div style="max-width:600px; margin:10px auto; background-color:#ffffff; border:1px solid #ddd; border-radius:8px;">
        
        <!-- Header with dark blue background -->
        <div style="background-color: #0f3c7d; padding:15px 10px; text-align:center;">
          <h1 style="color:#ffffff; margin:0; font-size:20px; font-weight:700; letter-spacing:1px;">Thunderbolts FC Academy</h1>
        </div>

        <div style="padding:30px;">
          <p style="font-size:16px; line-height:1.6; color:#333; margin:0 0 20px 0;">Dear <strong>${escapeHtml(name)}</strong>,</p>
    
        <p style="font-size:16px; line-height:1.6; color:#333; margin:0 0 20px 0;">Welcome to the <strong>Thunderbolts FC Academy !</strong>.</p>

        <p style="font-size:16px; line-height:1.6; color:#333; margin:0 0 30px 0;">We are delighted to confirm that your registration has been successfully submitted under the <strong>${escapeHtml(categoryDisplay)}</strong> category. We look forward to supporting your development and growth with us.</p>

        <hr style="border:none; border-top:2px solid #e0e0e0; margin:30px 0;" />

        <h3 style="font-size:18px; font-weight:700; color:#333; margin:0 0 20px 0;">Registration Details</h3>

        <div style="margin:0 0 25px 0; font-size:15px; line-height:1.8; color:#333;">
          <p style="margin:8px 0;"><strong>Full Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin:8px 0;"><strong>Category:</strong> ${escapeHtml(categoryDisplay)}</p>
         <p style="margin:8px 0;"><strong>Date of Birth:</strong> ${escapeHtml(dobFormatted)} (${age} years)</p>
          ${trainingTime ? `<p style="margin:8px 0;"><strong>Training Time:</strong> ${escapeHtml(trainingTime)}</p>` : ''}
          ${trainingDays ? `<p style="margin:8px 0;"><strong>Training Days:</strong> ${escapeHtml(trainingDays)}</p>` : ''}
          <p style="margin:8px 0;"><strong>Fee:</strong> NPR 10,000/-</p>
          <p style="margin:8px 0;"><strong>Registration ID:</strong> ${registrationId}</p>
          <p style="margin:8px 0;"><strong>Training Location:</strong> Dhapakhel, Lalitpur</p>
        </div>

        <hr style="border:none; border-top:2px solid #e0e0e0; margin:30px 0;" />


 


        <h3 style="font-size:18px; font-weight:700; color:#333; margin:0 0 20px 0;">Payment Instructions</h3>

        <p style="font-size:15px; line-height:1.6; color:#333; margin:0 0 15px 0;">To complete your registration, please make the payment using the QR code provided in this email.</p>

        <div style="margin:0 0 20px 0; font-size:15px; line-height:1.8; color:#333;">
          <p style="margin:8px 0;"><strong>Amount:</strong> NPR 10,000/-</p>
          <p style="margin:8px 0;">Please scan the QR code and complete the payment.</p>
        </div>

        <div style="text-align:center; margin:25px 0;">
        <img src="${qrCodeUrl}" alt="Payment QR Code" width="250" height=auto style="border:2px solid #d4af37; border-radius:8px; padding:10px; background-color:#ffffff;" />

        </div>

        <p style="font-size:15px; line-height:1.6; color:#333; margin:20px 0 15px 0;">After making the payment, kindly reply to this email with a copy or screenshot of your payment slip for confirmation.</p>

        <p style="font-size:15px; line-height:1.6; color:#333; margin:0 0 30px 0;">Once the payment is verified, your registration will be officially confirmed.</p>

        <hr style="border:none; border-top:2px solid #e0e0e0; margin:30px 0;" />

        <p style="font-size:16px; line-height:1.6; color:#333; margin:0 0 20px 0;">Once again, welcome to the <strong>Thunderbolts FC family</strong>. If you have any questions or need assistance, please feel free to contact us.</p>

        <p style="font-size:15px; line-height:1.6; color:#333; margin:20px 0 10px 0;"><strong>Warm regards,</strong></p>
        <p style="font-size:15px; line-height:1.6; color:#333; margin:0 0 5px 0;"><strong>Thunderbolts FC Academy</strong></p>

        <div style="background-color:#f8f9fa; border-left:4px solid #d4af37; padding:20px; margin:20px 0; border-radius:4px;">
          <p style="font-size:15px; font-weight:700; color:#333; margin:0 0 15px 0;">Contact Information:</p>
          <p style="font-size:14px; line-height:1.8; color:#333; margin:5px 0;"><strong>Email:</strong> <a href="mailto:info@thunderboltsfc.com" style="color:#007BFF; text-decoration:none;">info@thunderboltsfc.com</a></p>
          <p style="font-size:14px; line-height:1.8; color:#333; margin:5px 0;"><strong>Contacts:</strong> <a href="https://wa.me/9779801973975" style="color:#007BFF; text-decoration:none;">+977 980 197 3975 / 85</a></p>
        </div>
        </div>
      </div>
    </body>
  </html>`

  const registrationMail = {
    from: `Thunderbolts FC Academy <${fromEmail}>`,
    to: email,
    subject: `Welcome to Thunderbolts FC Academy - Registration Confirmation`,
    html: registrationHtml,
  }

  try {
    if (!emailUser || !emailPass) {
      console.warn(
        `⚠️  Cannot send registration email to ${email}: Email credentials not configured`,
      )
      return
    }
    await transporter.sendMail(registrationMail)
    console.log(`✅ Registration email sent successfully to ${email}`)
  } catch (error: any) {
    console.error('❌ Error sending registration email:', error)
    // Don't throw error - allow registration to succeed even if email fails
    if (error.code === 'EAUTH') {
      console.error(
        '   Authentication failed. Please check EMAIL_USER and EMAIL_PASS environment variables.',
      )
      console.error('   Make sure your email credentials are correct for:', smtpHost)
    }
  }
}

/** Send admin notification email with minimal user data */
export async function sendAdminNotificationEmail(data: RegistrationData) {
  const { registrationNumber, id, name, email, phone, age, categoryDisplay } = data

  if (!email) {
    throw new Error('recipient email is required')
  }
  if (!name) {
    throw new Error('name is required')
  }

  const fromEmail = process.env.EMAIL_USER || 'no-reply@thunderboltsfc.com'
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'info@thunderboltsfc.com'

  // Use registration number as Registration ID (TFC-1, TFC-2, etc.)
  const registrationId = registrationNumber
    ? `TFC-${registrationNumber}`
    : id || `TFC-${Date.now().toString().slice(-8)}-${name.substring(0, 2).toUpperCase()}`

  const adminHtml = `
  <html>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <div style="max-width:600px; margin:10px auto; background-color:#ffffff; border:1px solid #ddd; border-radius:8px;">
        
        <!-- Header with dark blue background -->
        <div style="background-color: #0f3c7d; padding:15px 10px; text-align:center;">
          <h1 style="color:#ffffff; margin:0; font-size:20px; font-weight:700; letter-spacing:1px;">New Registration in Thunderbolts FC Academy</h1>
        </div>

        <div style="padding:30px;">
          <p style="font-size:16px; line-height:1.6; color:#333; margin:0 0 20px 0;">A new registration has been submitted:</p>

        <div style="margin:0 0 25px 0; font-size:15px; line-height:1.8; color:#333; background-color:#f8f9fa; padding:20px; border-radius:4px;">
          <p style="margin:8px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin:8px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p style="margin:8px 0;"><strong>Phone:</strong> ${escapeHtml(phone || 'N/A')}</p>
          <p style="margin:8px 0;"><strong>Age:</strong> ${age || 'N/A'}</p>
          <p style="margin:8px 0;"><strong>Category:</strong> ${escapeHtml(categoryDisplay || 'N/A')}</p>
          <p style="margin:8px 0;"><strong>Registration ID:</strong> ${registrationId}</p>
        </div>
<p style="font-size:14px; line-height:1.6; color:#333; margin:0 0 10px 0;">
  <strong>Reply to user:</strong>
  <a href="mailto:${escapeHtml(email)}" style="color:#007BFF; text-decoration:none;">
    ${escapeHtml(email)}
  </a>
</p>
        <p style="font-size:15px; line-height:1.6; color:#333; margin:20px 0 10px 0;">Please review the registration in the admin panel.</p>

        </div>
      </div>
    </body>
  </html>`

  const adminMail = {
    from: `Thunderbolts FC Academy <${fromEmail}>`,
    to: adminEmail,
    subject: `New Registration: ${registrationId} - ${escapeHtml(name)}`,
    html: adminHtml,
  }

  try {
    if (!emailUser || !emailPass) {
      console.warn(`⚠️  Cannot send admin notification email: Email credentials not configured`)
      return
    }
    await transporter.sendMail(adminMail)
    console.log(`✅ Admin notification email sent successfully to ${adminEmail}`)
  } catch (error: any) {
    console.error('❌ Error sending admin notification email:', error)
    // Don't throw error - allow registration to succeed even if email fails
    if (error.code === 'EAUTH') {
      console.error(
        '   Authentication failed. Please check EMAIL_USER and EMAIL_PASS environment variables.',
      )
      console.error('   Make sure your email credentials are correct for:', smtpHost)
    }
  }
}
