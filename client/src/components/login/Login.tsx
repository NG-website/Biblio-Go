import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { API_URL } from "../../config";


const emailValid = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);


    if (!email && !password) {
      setMessage("Veuillez entrer email et mot de passe");
      setLoading(false);
      return;
    }

    if (!email) {
      setMessage("Veuillez entrer votre email");
      setLoading(false);
      return;
    }

    if (!emailValid(email)) {
      setMessage("Veuillez entrer un email valide");
      setLoading(false);
      return;
    }

    if (!password) {
      setMessage("Veuillez entrer votre mot de passe");
      setLoading(false);
      return;
    }

    try {
      fetch(`${API_URL}login`, {
        method: "POST",
        credentials:"include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      })
        .then((res) => {return res.json()})
        .then((data) => {

          if(data.error){
             setMessage(data.error)
          }
          if (data.token) {
             window.location.href = "https://biblio-go.vercel.app/";
          }

        })
        .catch(() => {
          setMessage("Une erreur est survenue. Réessayez plus tard.");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      setMessage("Une erreur est survenue. Réessayez plus tard.");
      setLoading(false);
    }
  };

  const inputStyle = {
    "& label": { color: "#777" },
    "& label.Mui-focused": { color: "primary.main" },
    "& .MuiOutlinedInput-root": {
      color:"black",
      "& fieldset": { borderColor: "#ccc" },
      "&:hover fieldset": { borderColor: "primary.main" },
      "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: 2 },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, rgba(255,140,0,0.15), rgba(255,200,0,0.1))",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          
          borderRadius: 3,
          p: { xs: 2, sm: 3 },
          backgroundColor: "rgba(255,255,255,0.8)",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <Stack spacing={2}>
          <Box textAlign="center">
            <Typography variant="h2" fontWeight={700} color="primary.main">
              Connexion
            </Typography>
            <Typography variant="body2">Connectez-vous pour continuer</Typography>
          </Box>

          {message && <Alert severity="error">{message}</Alert>}

          <Box component="form" onSubmit={handleLogin} noValidate>
            <Stack spacing={1.5}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value); setMessage("")}}
                required
                fullWidth
                autoFocus
                sx={inputStyle}
                disabled={loading}
              />
              <Box sx={{ position: "relative" }}>
                <TextField
                  label="Mot de passe"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {setPassword(e.target.value); setMessage("")}}
                  required
                  fullWidth
                  sx={inputStyle}
                  disabled={loading}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    zIndex: "25",
                    top: 9,
                    right: 10,
                  }}
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                  disabled={loading}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={1}
                sx={{ gap: "8px" }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      disabled={loading}
                    />
                  }
                  label="Se souvenir de moi"
                  sx={{ mr: 1 }}
                />

                <Link
                  to="/forgot"
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    color: "black",
                    transition: "color 0.2s ease",
                    marginLeft: "10px",
                  }}
           
                >
                  Mot de passe oublié ?
                </Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.3,
                  borderRadius: 2,
                  textTransform: "none",
                  bgcolor: "oprimary.mainrange",
                  "&:hover": { bgcolor: "#primary.main" },
                  fontWeight: 600,
                  fontSize: "0.95rem",
                }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Se Connecter"
                )}
              </Button>
            </Stack>
          </Box>

          <Box textAlign="center" mt={1}>
            <Typography variant="body2">
              Pas encore de compte ?
              <Link
                to="/register"
                style={{
                  color: "black",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  marginLeft: 10,
                }}

              >
                Créez-en un !
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
