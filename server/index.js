import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import multer from "multer";
import stripe from "stripe";

import userRouter from "./routes/userRouter.js";
import bookRouter from "./routes/bookRouter.js";
import bookUserRouter from "./routes/bookUserRouter.js";
import authorRouter from "./routes/authorRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import adminRouter from "./routes/adminRouter.js";
import likeRouter from "./routes/likeRouter.js";

import authMiddleware from "./middleware/authMiddleware.js";
import trylogin from "./middleware/tryLogin.js";
import queryLimiter from "./middleware/queryLimiter.js";
import syncDB from "./utils/sequelizeSync.js"

import sendMail from "./utils/nodemailer.js";
import Tesseract from 'tesseract.js'
import fs from 'fs'
import adminMiddleware from "./middleware/adminMiddleware.js";
dotenv.config();
//syncDB()
const app = express();

const allowedOrigins = [
  "http://localhost:5173",       // dev
  "https://biblio-go.vercel.app" // prod
];

app.use(cors({
  origin: function(origin, callback){
    if (!origin) return callback(null, true); // pour Postman ou requêtes serveur à serveur
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


// app.use(cors({
//   origin: "https://biblio-go.vercel.app",
//   credentials: true
// }));


app.use("/api/subscription/webhook", express.raw({ type: "application/json" }));
const stripe_ = new stripe(process.env.SECRET_KEY_STRIPE);

app.use(session({
  secret: process.env.SECRET_KEY_EXPRESS,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true en prod, false en dev
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    // secure: true,
    // sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));

app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.path === '/user') {
      cb(null, `uploads/user`);
    } else if (req.path === '/book') {
      cb(null, `uploads/book`);
    } else if (req.path === '/ocr') {
      cb(null, `uploads/temp`);
    } else {
      return false
    }
  },
  filename: (req, file, cb) => {
    const name = req.body.name + ".jpg"
    cb(null, name);
  }
})
const upload = multer({ storage })

app.get("/", (req, res) => res.send("hello world"));


app.post("/login", queryLimiter, trylogin, authMiddleware, (req, res) => {
  req.session.user = req.user;
  req.session.save(() => {
    res.json(req.user);
  });
});

app.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: "Erreur logout" });
    res.clearCookie("connect.sid");
    res.json({ message: "Déconnecté" });
  });
});


app.get("/cookies", (req, res) => {
  console.log(req.session)
  res.json({ user: req.session.user || null });
});


app.post('/api/ocr', async (req, res) => {

  const { path } = req.body;
  if (!path) return res.status(400).send('Aucun chemin fourni');

  try {
    const { data: { text } } = await Tesseract.recognize(path, 'fra');

    fs.unlinkSync(path);

    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: 'Erreur OCR' });
  }
});

app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
app.use("/api/bookuser", bookUserRouter);
app.use("/api/author", authorRouter);
app.use("/api/like", likeRouter);
app.use("/api/subscription", paymentRouter);
app.use("/api/admin", adminMiddleware, adminRouter);


app.use("/api/image", upload.single("image"), (req, res) => {
  if (req.file && req.path === '/ocr') {
    res.json({ name: req.body.name, path: req.file.path })
  } else {
    res.status(200).json("ok")
  }

  if (!req.file) {
    res.status(400).send('Aucun fichier reçu')
  }
});

app.use("/api/uploads", express.static("uploads"));

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}/`);
});
