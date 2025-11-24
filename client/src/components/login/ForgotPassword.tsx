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

      fetch("http://localhost:3000/user/forgot-password", {
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

  const inputStyle = {
    "& label": { color: "#777" },
    "& label.Mui-focused": { color: "orange" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#ccc" },
      "&:hover fieldset": { borderColor: "orange" },
      "&.Mui-focused fieldset": { borderColor: "orange", borderWidth: 2 },
    },
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
              Entrez votre email pour recevoir un lien de réinitialisation
            </Typography>
          </Box>

          {message && <Alert sx={{textAlign:"center"}} severity={message.includes("envoyé")? "success" : "error"}>{message}</Alert>}

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
                sx={inputStyle}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.3,
                  borderRadius: 2,
                  textTransform: "none",
                  bgcolor: "orange",
                  "&:hover": { bgcolor: "#f57c00" },
                  fontWeight: 600,
                  fontSize: "0.95rem",
                }}
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
                  color: "black",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "orange")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
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
