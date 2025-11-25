import { useState } from "react";
import {
  TextField,
  Button,
  Alert,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

export default function ContactForm() {

  const [firstname, setFirstame] = useState("")
  const [lastname, setLastame] = useState("")
  const [email, setEmail] = useState("")
  const [contentEmail, setContentEmail] = useState("")
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const sendMail = () => {

    if (!firstname || !lastname || !email || !contentEmail) {
      setMessage("Merci de remplir tous les champs.");
      return;
    }

    const data = { firstname, lastname, email, contentEmail }
    setLoading(true)
    fetch("http://localhost:3000/api/user/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => { return res.json() })
      .then((data) => {
        console.log(data)

        if (data === true) {
          setFirstame("")
          setLastame("")
          setEmail("")
          setContentEmail("")
          setLoading(false)
          setMessage("Votre message a été envoyé avec succès!");
          setTimeout(() => {
            setMessage("")
          }, 3000)
        } else {
          setMessage("Veuillez vérifier le formulaire, certains champs sont incorrects.")
          setTimeout(() => {
            setLoading(false)
            setMessage("")
          }, 3000)
        }

      })


  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: { xs: "center", md: "normal" },
        width: "90%",
        height: "auto",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          height: "90%",
          textAlign: "center",
          p: 3,
          maxWidth: { sx: "80%", md: "450px" },
          my: "auto",
        }}
      >
        <Typography
          variant="h2"
          color="text.primary"
          fontWeight="bold"
          gutterBottom
        >
          Vous avez une question, une suggestion ou besoin d’aide ?
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          maxWidth="600px"
          mx="auto"
          whiteSpace={"normal"}
        >
          Notre équipe est à votre écoute ! <br />
          <br />
          Par téléphone au : <br /> 05 45 00 00 00 <br /> Ou <br />
          remplissez le formulaire et nous vous répondrons dans les plus brefs délais.
        </Typography>
      </Box>

      <Box
        component="form"
        aria-label="Formulaire de contact"
        sx={{
          pt: { sx: 2 },
          minWidth: "300px",
          maxWidth: 500,
          my: { xs: 2, md: 2 },
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography
          sx={{ color: "text.primary" }}
          variant="h3"
          textAlign="center"
          gutterBottom
        >
          Formulaire de contact
        </Typography>

        {message && (
          <Alert severity={message.includes("succès") ? "success" : "warning"}>
            {message}
          </Alert>
        )}

        <Stack spacing={2}>
          <TextField
            label="Nom"
            name="nom"
            value={firstname}
            onChange={(e) => setFirstame(e.target.value)}
            fullWidth
            required
            aria-label="Nom"
          />
          <TextField
            label="Prénom"
            name="prenom"
            value={lastname}
            onChange={(e) => setLastame(e.target.value)}
            fullWidth
            required
            aria-label="Prénom"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            aria-label="Email"
          />
          <TextField
            label="Message"
            name="message"
            value={contentEmail}
            onChange={(e) => setContentEmail(e.target.value)}
            fullWidth
            multiline
            rows={4}
            required
            aria-label="Message"
          />
        </Stack>

        <Button
          onClick={loading ? null : sendMail}
          variant="contained"
          sx={{ mt: 2, fontWeight: "bold", textTransform: "none" }}
          aria-label="Envoyer le formulaire de contact"
        >
          {loading ? <CircularProgress /> : "Envoyer"}
        </Button>
      </Box>
    </Box>
  );
}
