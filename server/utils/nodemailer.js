import nodemailer from 'nodemailer'
import dotenv from "dotenv"
import { formatDate } from '../functions/login.js'
import reservation from '../mail/reservation.js'
import comfirmation from '../mail/comfirmation.js'
import contact from '../mail/contact.js'
dotenv.config()

const sendMail = async (emailUser, emailType, emailContent) => {
  let attachments = []
  let html = ""
  let subject = ""

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: 'afec.nicolas@gmail.com',
      pass: process.env.SECRET_KEY_GMAIL
    }
  })

  if (emailType === "contact") {
    const [userFirstname, userLastname, userEmail, userMessage] = emailContent;
    console.log(emailContent)
    try {

      subject = "Contact Biblio'Go"
      html = contact(userFirstname, userLastname, userEmail, userMessage)


    } catch (error) {
      console.log(error);
    }
  }


    if (emailType === "inscription") {
      const [userName, link] = emailContent;
      try {
        attachments.push(
          {
            filename: `logo.png`,
            path: `./uploads/logo.png`,
            cid: 'logo'
          }
        )

        subject = "BiblioNico, comfirmation de votre compte"
        html = comfirmation(userName, link)
      } catch (error) {
        console.log(error);
      }
    }

    if (emailType === "reservation") {
      const [bookName, take_at, deposit_at] = emailContent
      try {
        const takeAt = formatDate(take_at).split(" ");
        const depositAt = formatDate(deposit_at).split(" ")

        attachments.push(
          {
            filename: `${bookName}.jpg`,
            path: `./uploads/book/${bookName}.jpg`, // chemin local vers ton image
            cid: 'bookImage' // identifiant utilisé dans le src
          }
        )

        subject = "BiblioNico, comfirmation de reservation "
        html = reservation(bookName, takeAt, depositAt)
      } catch (error) {
        console.log(error);
      }
    }

    const info = await transporter.sendMail({
      from: 'bibliotheque de Nico',
      to: emailUser,
      subject,
      attachments,
      html,
    });

  }
  export default sendMail