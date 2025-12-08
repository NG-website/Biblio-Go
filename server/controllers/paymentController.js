import paymentModel from "../models/paymentModel.js";
import Stripe from "stripe";
import dotenv from 'dotenv';
import userModel from "../models/userModel.js";
import userController from "./userController.js";
dotenv.config();
const stripe = new Stripe(process.env.SECRET_KEY_STRIPE);

const paymentControler = {
    async SearchCustomer(req, res) {
        try {
            const { email, name } = req.body;
            const customer = await paymentModel.searchCustomer(name, email);
            res.json(customer);
        } catch (error) {
            res.status(500).json({ message: "Impossible de rechercher le client", erreur: error.message });
        }
    },

    async CreateCustomer(req, res) {
        try {
            const name = req.body.name;
            const email = req.body.email;
            const create = await paymentModel.createCustomer(name, email);
            res.json(create);
        } catch (error) {
            res.status(500).json({ message: "Impossible de créer le client", erreur: error.message });
        }
    },

    async SearchProduct(req, res) {
        try {
            const productName = req.body.productName;
            const products = await paymentModel.searchProduct();
            const product = products.data.find((p) => p.name === productName);
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: "Impossible de rechercher le produit", erreur: error.message });
        }
    },

    async CreateSession(req, res) {
        try {
            const customerId = req.body.customerId;
            const priceId = req.body.priceId;
            const userId = req.body.userId
            const abonementType = req.body.abonementType
            const create = await paymentModel.createSession(customerId, priceId, userId, abonementType);
            console.log(create)
            res.json(create.url);
        } catch (error) {
            res.status(500).json({ message: "Impossible de créer la session", erreur: error.message });
        }
    },

    async CheckPayment(req, res) {
        const sig = req.headers["stripe-signature"];
        const endpointSecret = process.env.WEBHOOK_ENDPOINT_STRIPE;
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            if (event.type === "checkout.session.completed") {
                const today = new Date();
                const oneYearLater = new Date(today);
                const updateUser = await userModel.update(
                    {
                        abonnement: oneYearLater.setDate(today.getDate() + 365),
                        abonnementType: event.data.object.metadata.abonementType
                    },
                    { where: { id: event.data.object.metadata.userId } },
                );
            }
            res.json({ received: false });
        } catch (err) {
            console.error("❌ Erreur webhook :", err.message);
            res.status(400).send(`Webhook Error: ${err.message}`);
        }
    }

};

export default paymentControler;
