import { rateLimit } from 'express-rate-limit'
    const queryLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 10,
        message: { error: "Trop de tentatives. Réessayez plus tard." },
        standardHeaders: true,
        legacyHeaders: false,  
    })
export default queryLimiter
