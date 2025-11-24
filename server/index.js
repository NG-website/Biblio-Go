import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import multer from "multer";
import stripe from "stripe";

// Routers
import userRouter from "./routes/userRouter.js";
import bookRouter from "./routes/bookRouter.js";
import bookUserRouter from "./routes/bookUserRouter.js";
import authorRouter from "./routes/authorRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import adminRouter from "./routes/adminRouter.js";
import likeRouter from "./routes/likeRouter.js";

// Middlewares
import authMiddleware from "./middleware/authMiddleware.js";
import trylogin from "./middleware/tryLogin.js";
import queryLimiter from "./middleware/queryLimiter.js";
import syncDB from "./utils/sequelizeSync.js"
import sendMail from "./utils/nodemailer.js";

import Tesseract from 'tesseract.js'
import fs from 'fs'
dotenv.config();
//syncDB()
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ----------- STRIPE WEBHOOK (body brut obligatoire) -----------
app.use("/subscription/webhook", express.raw({ type: "application/json" }));
const stripe_ = new stripe(process.env.SECRET_KEY_STRIPE);

app.use(session({
  secret: process.env.SECRET_KEY_EXPRESS,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,        
    sameSite: "lax",     
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));


app.use(express.json());



// ----------- MULTER UPLOADS -----------
//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
   console.log(req.path)
  console.log("multerstorage",req.body)
   console.log(file)
    if (req.path === '/user') {
      cb(null, `uploads/user`);
    } else if (req.path === '/book') {
      cb(null, `uploads/book`);
    } else if (req.path === '/ocr') {
      cb(null, `uploads/temp`);
    }else {
      return false
    }
  },
  filename: (req, file, cb) => {
    const name = req.body.name + ".jpg"
    cb(null, name);
  }
})

const upload = multer({ storage })

// ----------- TEST ROUTE -----------
app.get("/", (req, res) => res.send("hello world"));

// ----------- LOGIN -----------
app.post("/login", queryLimiter, trylogin, authMiddleware, (req, res) => {
  console.log(5)
  req.session.user = req.user;
  req.session.save(() => {
    res.json(req.user);
  });
});

// ----------- LOGOUT -----------
app.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: "Erreur logout" });
    res.clearCookie("connect.sid");
    res.json({ message: "Déconnecté" });
  });
});
app.post('/api/contact', (req, res)=>{
  const contentEmail = ([req.body.firstname,req.body.lastname, req.body.email, req.body.contentEmail ])
  sendMail("bibliogo@outlook.fr", "contact", contentEmail)
  console.log(res)
})
// ----------- CHECK SESSION -----------
app.get("/cookies", (req, res) => {
  res.json({ user: req.session.user || null });
});

//---ocR--
app.post('/api/ocr', async (req, res) => {
  console.log("hello ocr",req.body)
    const { path } = req.body; 
    if (!path) return res.status(400).send('Aucun chemin fourni');

    try {
        const { data: { text } } = await Tesseract.recognize(path, 'fra');
        
        // Optionnel : supprimer le fichier temporaire après OCR
        fs.unlinkSync(path);

        res.json({ text });
    } catch (err) {
        res.status(500).json({ error: 'Erreur OCR' });
    }
});

// ----------- ROUTES -----------
app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
app.use("/api/bookuser", bookUserRouter);
app.use("/api/author", authorRouter);
app.use("/api/like", likeRouter);
app.use("/api/subscription", paymentRouter);
app.use("/api/admin", adminRouter);

// ----------- UPLOAD IMAGES -----------
app.use("/api/image", upload.single("image"), (req, res) => {
    console.log("PATH",req.path)
  console.log("req",req.file)
 console.log("req",req.body.name)
 
    if (req.file && req.path === '/ocr'){
      console.log("arriver")
      res.json({ name: req.body.name, path: req.file.path })
    }else{
      res.status(200).json("ok")
    }

       if(!req.file){
      res.status(400).send('Aucun fichier reçu')
    }
  // if (!req.file) return res.status(400).send("Aucun fichier reçu");
  // res.json({
  //   name: req.body.name,
  //   path: req.file.path
  // });
});

// ----------- STATIC FILES -----------
app.use("/api/uploads", express.static("uploads"));

// ----------- START SERVER -----------
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}/`);
});
