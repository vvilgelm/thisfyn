// Contact Form API Handler
// Works with both Netlify Functions and Vercel Serverless

module.exports = async function handler(req, res) {
  // Handle CORS
  const allowedOrigins = ['https://thisfyn.com', 'https://www.thisfyn.com', 'http://localhost:3000'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Trim and sanitize
    const cleanData = {
      name: name.trim().substring(0, 100),
      email: email.trim().toLowerCase().substring(0, 100),
      message: message.trim().substring(0, 1000),
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    };

    console.log('📧 Contact form submission:', { 
      name: cleanData.name, 
      email: cleanData.email 
    });

    // TODO: Add your email service here (Resend, SendGrid, etc.)
    // Example with Resend:
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'FYN <hello@thisfyn.com>',
      to: 'team@thisfyn.com',
      subject: `New contact from ${cleanData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${cleanData.name}</p>
        <p><strong>Email:</strong> ${cleanData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${cleanData.message}</p>
        <p><em>Received: ${cleanData.timestamp}</em></p>
      `
    });
    */

    // TODO: Store in database (Airtable, Supabase, etc.)
    // Example with Airtable:
    /*
    const Airtable = require('airtable');
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base(process.env.AIRTABLE_BASE_ID);
    
    await base('Contacts').create({
      Name: cleanData.name,
      Email: cleanData.email,
      Message: cleanData.message,
      Timestamp: cleanData.timestamp,
      IP: cleanData.ip
    });
    */

    return res.status(200).json({ 
      success: true, 
      message: 'Message received successfully' 
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process your message. Please try again later.'
    });
  }
}

// Helper function
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Netlify Functions compatibility (if needed)
/*
exports.handler = async (event, context) => {
  const req = {
    method: event.httpMethod,
    headers: event.headers,
    body: JSON.parse(event.body || '{}'),
    connection: { remoteAddress: event.headers['client-ip'] }
  };

  const res = {
    statusCode: 200,
    headers: {},
    setHeader: function(key, value) {
      this.headers[key] = value;
    },
    status: function(code) {
      this.statusCode = code;
      return this;
    },
    json: function(data) {
      return {
        statusCode: this.statusCode,
        headers: { ...this.headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
    },
    end: function() {
      return { statusCode: this.statusCode, headers: this.headers, body: '' };
    }
  };

  return await handler(req, res);
};
*/

