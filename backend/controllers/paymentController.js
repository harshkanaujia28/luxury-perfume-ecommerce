import dotenv from 'dotenv';
dotenv.config(); 

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 
// export const createPaymentIntent = async (req, res) => {
//   try {
//     const { amount } = req.body;

//     if (!amount || typeof amount !== 'number') {
//       return res.status(400).json({ error: 'Invalid amount' });
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: 'inr',
//     });

//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error('Stripe error:', error.message);
//     res.status(500).json({ error: 'Payment intent creation failed' });
//   }
// };

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, productName } = req.body;

    if (!amount || typeof amount !== 'number') {
      return res.status(400).json({ error: 'Invalid amount format' });
    }

    const amountInPaise = amount * 100; 

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: productName || 'Product',
            },
            unit_amount: amountInPaise,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://www.zafrine.in/success`,
      cancel_url: `https://www.zafrine.in/cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error.message);
    res.status(500).json({ error: 'Stripe checkout session failed' });
  }
};

