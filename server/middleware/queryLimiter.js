import { rateLimit } from 'express-rate-limit'
    const queryLimiter = rateLimit({
     
        windowMs: 15 * 60 * 1000,
        limit: 10,
        message: { error: "Trop de tentatives. Réessayez plus tard." },
        standardHeaders: true, // ajoute RateLimit-* headers
        legacyHeaders: false,  // désactive les X-RateLimit-*
    })
   

export default queryLimiter