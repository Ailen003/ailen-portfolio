export interface ContactEmailData {
  name: string
  email: string
  subject: string
  message: string
}

export function generateContactEmail({ name, email, subject, message }: ContactEmailData): string {
  const safeMessage = message.replace(/\n/g, "<br />")

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New message from portfolio</title>
</head>
<body style="margin:0;padding:0;background-color:#F7FDFA;font-family:'Segoe UI',Arial,sans-serif;color:#1E3530;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#F7FDFA;padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Card wrapper -->
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background-color:#3A9E8B;border-radius:16px 16px 0 0;padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td>
                    <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.65);">Portfolio Contact</p>
                    <h1 style="margin:8px 0 0;font-size:26px;font-weight:700;color:#FFFFFF;letter-spacing:-0.02em;line-height:1.2;">New message</h1>
                    <p style="margin:6px 0 0;font-size:14px;color:rgba(255,255,255,0.8);">Someone reached out through your portfolio form</p>
                  </td>
                  <td align="right" valign="middle">
                    <!-- Decorative circles -->
                    <div style="width:48px;height:48px;border-radius:50%;border:2px solid rgba(255,255,255,0.25);display:inline-block;"></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body card -->
          <tr>
            <td style="background-color:#FFFFFF;padding:36px 40px;border-left:1px solid #DFF0EC;border-right:1px solid #DFF0EC;">

              <!-- Sender info row -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:28px;">
                <tr>
                  <td width="50%" style="padding-right:10px;">
                    <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#3A9E8B;">From</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#1E3530;">${name}</p>
                  </td>
                  <td width="50%" style="padding-left:10px;">
                    <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#3A9E8B;">Email</p>
                    <p style="margin:0;font-size:15px;color:#1E3530;">
                      <a href="mailto:${email}" style="color:#3A9E8B;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #DFF0EC;margin:0 0 28px;" />

              <!-- Subject -->
              <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#3A9E8B;">Subject</p>
              <p style="margin:0 0 28px;font-size:18px;font-weight:700;color:#1E3530;letter-spacing:-0.01em;">${subject}</p>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #DFF0EC;margin:0 0 28px;" />

              <!-- Message -->
              <p style="margin:0 0 4px;font-family:'Courier New',monospace;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#3A9E8B;">Message</p>
              <div style="margin:12px 0 0;background-color:#F7FDFA;border-left:3px solid #3A9E8B;border-radius:0 8px 8px 0;padding:18px 20px;">
                <p style="margin:0;font-size:15px;line-height:1.75;color:#1E3530;">${safeMessage}</p>
              </div>

            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="background-color:#EBF5F2;padding:24px 40px;border:1px solid #DFF0EC;border-top:none;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td>
                    <p style="margin:0;font-size:13px;color:#637875;">Reply directly to this email to respond to <strong style="color:#1E3530;">${name}</strong>.</p>
                  </td>
                  <td align="right">
                    <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display:inline-block;background-color:#3A9E8B;color:#FFFFFF;font-size:13px;font-weight:600;text-decoration:none;padding:10px 20px;border-radius:50px;">Reply</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-radius:0 0 16px 16px;border:1px solid #DFF0EC;border-top:none;background-color:#FFFFFF;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td>
                    <p style="margin:0;font-size:12px;color:#9BBAB6;">This message was sent via the contact form on your portfolio.</p>
                  </td>
                  <td align="right">
                    <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;font-weight:600;color:#3A9E8B;letter-spacing:0.05em;">portfolio.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- End card wrapper -->

      </td>
    </tr>
  </table>

</body>
</html>`
}
