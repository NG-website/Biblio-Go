import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import theme from "../../theme";

const emailValid = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgot = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("Veuillez entrer votre email");
      return;
    }

    if (!emailValid(email)) {
      setMessage("Veuillez entrer un email valide");
      return;
    }

    try {
      setLoading(true);

      fetch("http://localhost:3000/api/user/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      .then((res)=>{
        if(!res.ok){
          setMessage("Erreur coter serveur")
        }
        setLoading(false)
        return res.json()
      })
      .then((data)=>{
        setMessage(data)
        setEmail("")
      })

     } catch (err) {
      setMessage("Une erreur est survenue. Réessayez plus tard.");
    } 
  };


  return (
    <Box
      sx={{
        height:"100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:'url("/client/public/George-peabody-library.jpg")',
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 380,
          borderRadius: 3,
          p: { xs: 2, sm: 3 },
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <Stack spacing={2}>
          <Box textAlign="center">
            <Typography variant="h5" fontWeight={700} color="orange">
              Mot de passe oublié
            </Typography>
            <Typography variant="body2">
              Entrez votre email pour recevoir un nouveau mot de passe
            </Typography>
          </Box>

          {message && <Alert 
          sx={{textAlign:"center", backgroundColor:theme.palette.background.default}} 
          severity={message.includes("envoyé")? "success" : "error"}
          >
            {message.split(":")[0]}
            {message.split(":")[1]}
            </Alert>
            }

          <Box component="form" onSubmit={handleForgot} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                autoFocus
             
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth

                disabled={loading}
              >
                {loading ? "Envoi en cours..." : "Envoyer le lien"}
              </Button>
            </Stack>
          </Box>

          <Box textAlign="center" mt={1}>
            <Typography variant="body2">
              <Link
                to="/login"
                style={{
                  color: "text.primary",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}

              >
                Retour à la connexion
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
