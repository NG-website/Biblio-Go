Installer mon Environement de travail :

//Front
npm create vite@latest client

//Back
npm init -y
npm install mysql2
npm install express
npm install nodemon
npm install sequelize
npm install jsonwebtoken
npm install cors
npm install bcrypt
npm install dotenv
npm install stripe
npm install nodemailer
npm install multer
npm i express-rate-limit
npm install tesseract.js
npm install sharp traitement de l image ocr // a desinstaller
$ npm install express-session
npm install redis //blacklist token non expirée


//stripe
webhook en local

lancer le server
lancer un powershell
     .\stripe.exe login 
     .\stripe.exe  listen --forward-to localhost:3000/subscription/webhook
lancer un bash
    ./stripe.exe trigger checkout.session.completed


mail :
     Bibliotheque:
     address : bibliogo@outlook.fr
     password : Biblio'Go16