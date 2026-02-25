import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface InvestorFormData {
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  investor_type: string;
  investment_range: string;
  interest_level: string;
  funding_timeline?: string;
  areas_of_interest?: string[];
  how_heard?: string;
  additional_notes?: string;
  accredited_investor: boolean;
  created_at: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { record } = await req.json() as { record: InvestorFormData };

    const emailBody = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; color: #222; }
            .section { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 New Investor Form Submission</h1>
            </div>
            <div class="content">
              <p>A new investor has submitted the form on ReFi Trading. Here are the details:</p>

              <div class="section">
                <h2>Contact Information</h2>
                <div class="field">
                  <div class="label">Full Name:</div>
                  <div class="value">${record.full_name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${record.email}">${record.email}</a></div>
                </div>
                ${record.phone ? `
                <div class="field">
                  <div class="label">Phone:</div>
                  <div class="value">${record.phone}</div>
                </div>
                ` : ''}
                ${record.company ? `
                <div class="field">
                  <div class="label">Company:</div>
                  <div class="value">${record.company}</div>
                </div>
                ` : ''}
              </div>

              <div class="section">
                <h2>Investment Profile</h2>
                <div class="field">
                  <div class="label">Investor Type:</div>
                  <div class="value">${record.investor_type}</div>
                </div>
                <div class="field">
                  <div class="label">Investment Range:</div>
                  <div class="value">${record.investment_range}</div>
                </div>
                <div class="field">
                  <div class="label">Interest Level:</div>
                  <div class="value">${record.interest_level}</div>
                </div>
                ${record.funding_timeline ? `
                <div class="field">
                  <div class="label">Funding Timeline:</div>
                  <div class="value">${record.funding_timeline}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">Accredited Investor:</div>
                  <div class="value">${record.accredited_investor ? 'Yes' : 'No'}</div>
                </div>
              </div>

              ${record.areas_of_interest && record.areas_of_interest.length > 0 ? `
              <div class="section">
                <h2>Areas of Interest</h2>
                <div class="value">
                  <ul>
                    ${record.areas_of_interest.map(area => `<li>${area}</li>`).join('')}
                  </ul>
                </div>
              </div>
              ` : ''}

              ${record.how_heard ? `
              <div class="section">
                <h2>Source</h2>
                <div class="field">
                  <div class="label">How they heard about ReFi Trading:</div>
                  <div class="value">${record.how_heard}</div>
                </div>
              </div>
              ` : ''}

              ${record.additional_notes ? `
              <div class="section">
                <h2>Additional Notes</h2>
                <div class="value">${record.additional_notes.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}

              <div class="section">
                <p style="color: #666; font-size: 0.9em;">
                  Submitted at: ${new Date(record.created_at).toLocaleString('en-US', {
                    dateStyle: 'full',
                    timeStyle: 'long'
                  })}
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Email service not configured'
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'ReFi Trading <notifications@refi.trading>',
        to: ['zeshan@refi.trading'],
        subject: `New Investor Form: ${record.full_name} - ${record.interest_level}`,
        html: emailBody,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error('Failed to send email:', errorData);
      throw new Error(`Email API error: ${emailResponse.status}`);
    }

    const emailData = await emailResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email notification sent successfully',
        emailId: emailData.id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in notify-investor-form function:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
