import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prices = req.body.prices as string[] | undefined

    if(req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed.' })
    }

    if(!prices) {
        return res.status(400).json({ error: 'Price not found.' })
    }

    const line_items = prices.map(price => ({price, quantity: 1}));

    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.NEXT_URL}/`;

    const checkoutSession = await stripe.checkout.sessions.create({
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: 'payment',
        line_items,
    });

    return res.status(201).json({
        checkoutSessionUrl: checkoutSession.url,
    })
}