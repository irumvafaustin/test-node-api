import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET);

class StripeController{

    static async stripePay(req,res){
        try {
            const {name,amount} = req.body;
            if(!name) return res.status(400).json({message:"Please enter the name"});

            const paymentIntent = await stripe.paymentIntents.create({
                amount:amount * 100,
                metadata:{name},
                currency:"usd",
                payment_method_types:['card']
            });
            const clientSecret = paymentIntent.client_secret;
            res.status(200).json({message:"payment iNitiated",clientSecret});
        } catch (error) {
            res.status(200).json({error:error.message})
        }
    }
}

export default StripeController;