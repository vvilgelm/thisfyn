// Stripe Checkout Session API Handler
// Creates a checkout session with Klarna enabled

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
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
    // Log for debugging
    console.log('🔑 Stripe key status:', process.env.STRIPE_SECRET_KEY ? 'SET' : 'NOT SET');
    console.log('🔑 Key starts with:', process.env.STRIPE_SECRET_KEY?.substring(0, 10));
    
    // Parse body if needed
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }
    
    const { priceId, quantity = 1 } = body || {};

    console.log('💳 Creating checkout session...');
    
    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'klarna'], // Enable both card and Klarna
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'FYN Premium Service',
              description: 'Access to FYN premium features',
              images: ['https://thisfyn.com/assets/images/og-image.jpg'],
            },
            unit_amount: 9900, // $99.00 in cents
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: 'https://thisfyn.com/success.html?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://thisfyn.com/cancel.html',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'DE', 'FR', 'IT', 'ES', 'SE', 'NO', 'DK', 'FI', 'NL', 'BE', 'AT', 'CH'],
      },
    });

    console.log('✅ Checkout session created:', session.id);

    return res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });

  } catch (error) {
    console.error('❌ Stripe checkout error:', error);
    console.error('Error type:', error.type);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Full error:', JSON.stringify(error, null, 2));
    
    return res.status(500).json({
      error: 'Failed to create checkout session',
      message: error.message,
      type: error.type,
      code: error.code,
      details: error.raw?.message || 'No additional details',
    });
  }
}


