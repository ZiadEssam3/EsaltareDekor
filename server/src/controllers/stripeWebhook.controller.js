const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Order } = require("../models/order.model");

const stripeWebhookHandler = async (req, res) => {
    let event;

    try {
        const sig = req.headers["stripe-signature"];
        event = stripe.webhooks.constructEvent(
            req.rawBody, // must use rawBody middleware
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata.orderId;

        await Order.findByIdAndUpdate(orderId, { status: "Paid" });
    }

    if (event.type === "payment_intent.payment_failed") {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata.orderId;

        await Order.findByIdAndUpdate(orderId, { status: "Failed" });
    }

    res.json({ received: true });
};

module.exports = { stripeWebhookHandler };
