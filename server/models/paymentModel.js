import Stripe from "stripe";
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.SECRET_KEY_STRIPE);

const paymentModel = {
    async searchCustomer(name, email) {
        try {
            const customer = await stripe.customers.search({
                query: `name:'${name}' AND email:'${email}'`,
            });
            return customer;
        } catch (error) {
            throw new Error("Impossible de rechercher le client : " + error.message);
        }
    },

    async createCustomer(name, email) {
        try {
            const create = await stripe.customers.create({
                name: name,
                email: email,
            });
            return create;
        } catch (error) {
            throw new Error("Impossible de créer le client : " + error.message);
        }
    },

    async searchProduct() {
        try {
            const products = await stripe.products.list({ limit: 100 });
            return products;
        } catch (error) {
            throw new Error("Impossible de récupérer les produits : " + error.message);
        }
    },

    async createSession(customerId, priceId, userId, abonnementType) {
        try {
            const session = await stripe.checkout.sessions.create({
                customer: customerId,
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                allow_promotion_codes: true,
                automatic_tax: { enabled: false },
                success_url: `${process.env.FRONT_URL}subscription/success`,
                cancel_url: `${process.env.FRONT_URL}subscription/cancel`,
                metadata: {
                    userId: userId,
                    abonnementType: abonnementType

                }
            });
            return session;
        } catch (error) {
            throw new Error("Impossible de créer la session : " + error.message);
        }
    },
};

export default paymentModel;
