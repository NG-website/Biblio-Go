import nodemailer from 'nodemailer'
import dotenv from "dotenv"
import { formatDate } from '../functions/login.js'
import reservation from '../mail/reservation.js'
import comfirmation from '../mail/comfirmation.js'
import contact from '../mail/contact.js'
dotenv.config()

const sendMail = async (emailUser, emailType, emailContent) => {

  if(!emailUser || !emailType || !emailContent){
    return false
  }

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

  try {

    if (emailType === "contact") {
      const [userFirstname, userLastname, userEmail, userMessage] = emailContent;
      subject = "Contact Biblio'Go"
      html = contact(userFirstname, userLastname, userEmail, userMessage)
    }

    if (emailType === "inscription") {
      const [userName, link] = emailContent;

      attachments.push({
        filename: `logo.png`,
        path: `./uploads/logo.png`,
        cid: 'logo'
      })

      subject = "BiblioNico, confirmation de votre compte"
      html = comfirmation(userName, link)
    }

    if (emailType === "reservation") {
      const [bookName, take_at, deposit_at] = emailContent

      const takeAt = formatDate(take_at).split(" ");
      const depositAt = formatDate(deposit_at).split(" ")

      attachments.push({
        filename: `${bookName}.jpg`,
        path: `./uploads/book/${bookName}.jpg`,
        cid: 'bookImage'
      })

      subject = "BiblioNico, confirmation de réservation"
      html = reservation(bookName, takeAt, depositAt)
    }

  const info =  await transporter.sendMail({
      from: 'bibliotheque de Nico',
      to: emailUser,
      subject,
      attachments,
      html,
    })
   
    if (!info || !info.accepted || info.rejected.length !=0 ) {
      return false
    }

    return true

  } catch (error) {
    console.error("Erreur d'envoi d'email :", error)
    return false
  }
}

export default sendMail
