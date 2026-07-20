import { Resend } from 'resend'

// We initialize Resend using the env variable.
// If it is not present, we will run in simulated mode for local development.
const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(req) {
  try {
    const { name, email, company, service, budget, message } = await req.json()

    // Validate inputs
    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    const emailContent = `
      <h2>New Project Brief Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'Not Specified'}</p>
      <p><strong>Service Requested:</strong> ${service}</p>
      <p><strong>Budget Range:</strong> ${budget}</p>
      <p><strong>Project Details / Brief:</strong></p>
      <p style="white-space: pre-wrap; background: #f4f4f5; padding: 15px; border-radius: 8px; border: 1px solid #e4e4e7;">${message}</p>
    `

    if (!resend) {
      console.log('--- SIMULATED EMAIL SUBMISSION ---')
      console.log('No RESEND_API_KEY found in env. Logging brief contents instead:')
      console.log({ name, email, company, service, budget, message })
      console.log('----------------------------------')

      return Response.json({
        success: true,
        message: 'Simulated submission successful (development mode without Resend API key).'
      })
    }

    const recipient = process.env.CONTACT_RECEIVER_EMAIL || 'hello.weplic@gmail.com'

    // Send email via Resend SDK
    const data = await resend.emails.send({
      from: 'Weplic Studio Briefs <onboarding@resend.dev>',
      to: [recipient],
      subject: `New Project Brief - ${name} (${company || 'Individual'})`,
      html: emailContent,
      replyTo: email
    })

    return Response.json({ success: true, data })
  } catch (error) {
    console.error('Error in Resend route handler:', error)
    return Response.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
