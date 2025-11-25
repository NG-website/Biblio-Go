import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  IconButton,
} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { API_URL } from "../../config"

export default function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const characterRegex = /[<>'";\/\\\(\)\{\}\[\]=\+\`~!@#$%^&*]/
  const postalCodeRegex = /^[0-9]{5}$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    const inputValid = [
      ["nom", !characterRegex.test(name)],
      ["email", emailRegex.test(email)],
      ["address", !characterRegex.test(address)],
      ["code postal", postalCodeRegex.test(postalCode)],
      ["ville", !characterRegex.test(country)],
      ["mot de passe", !characterRegex.test(password)],
    ]

    const FormValid =
      inputValid[0][1] &&
      inputValid[1][1] &&
      inputValid[2][1] &&
      inputValid[3][1] &&
      inputValid[4][1] &&
      inputValid[5][1]

    if (!FormValid) {
      inputValid.forEach((element) => {
        if (element[1] === false) {
          setError(
            element[0] === "email"
              ? "Votre email n'est pas valide"
              : `Votre ${element[0]} contient des caractères interdits`
          )
        }
      })
    }

    if (!name || !email || !address || !postalCode || !country || !password) {
      setError("Veuillez remplir tous les champs")
      return
    }

    if (FormValid) {
      try {
        const res = await fetch(`${API_URL}api/user/create`, {
          method: "POST",
          credentials:"include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, address, postalCode, country }),
        })

        if (!res.ok) {
          setError("Impossible de créer le compte.")
          return
        }

        const data = await res.json()
        if (data) {
          setSuccess(
            "Compte créé avec succès ! Un e-mail de confirmation a été envoyé à votre adresse mail pour activer votre compte."
          )
          setName("")
          setEmail("")
          setPassword("")
          setAddress("")
          setPostalCode("")
          setCountry("")
        }
      } catch {
        setError("Une erreur est survenue. Réessayez plus tard.")
      }
    }
  }

  const inputStyle = {
    "& label": { color: "#777" },
    "& label.Mui-focused": { color: "primary.main" },
     "& .MuiOutlinedInput-root": {
      color:"black",
      "& fieldset": { borderColor: "#ccc" },
      "&:hover fieldset": { borderColor: "primary.main" },
      "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: 2 },
    },
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        px: 2,
        py: 4,
        width: "100%",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 380,
          borderRadius: 3,
          p: { xs: 2, sm: 3 },
          backgroundColor: "rgba(255,255,255,0.8)",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
          mt: { xs: 2, sm: 0 },
          mb: { xs: 4, sm: 0 },
        }}
      >
        <Stack spacing={2}>
          <Box textAlign="center">
            <Typography variant="h2" color="primary.main">
              Inscription
            </Typography>
            <Typography variant="body2">
              Créez votre compte pour continuer
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert sx={{ textAlign: "center" }} severity="success">{success}</Alert>}

          <Box component="form" onSubmit={handleRegister} noValidate>
            <Stack spacing={1.5}>
              <TextField
                label="Nom"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                sx={inputStyle}
                aria-label="Nom complet"
              />

              <TextField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                sx={inputStyle}
                aria-label="Adresse email"
              />

              <TextField
                label="Adresse"
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                fullWidth
                sx={inputStyle}
                aria-label="Adresse postale"
              />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <TextField
                  label="Code Postal"
                  type="text"
                  name="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                  style={{ width: "48%" }}
                  sx={inputStyle}
                  aria-label="Code postal"
                  inputProps={{
                    maxLength: 5,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                />
                <TextField
                  label="Ville"
                  type="text"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  style={{ width: "48%" }}
                  sx={inputStyle}
                  aria-label="Ville"
                />
              </Box>

              <Box sx={{ position: "relative" }}>
                <TextField
                  label="Mot de passe"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  sx={inputStyle}
                  aria-label="Mot de passe"
                />
                <IconButton
                  sx={{ position: "absolute", top: 9, right: 10 }}
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.3,
                  borderRadius: 2,
                  textTransform: "none",
                  bgcolor: "primary.main",
                  "&:hover": { bgcolor: "#primary.main" },
                  fontWeight: 600,
                  fontSize: "0.95rem",
                }}
                aria-label="Créer le compte"
              >
                Créer le compte
              </Button>
            </Stack>
          </Box>

          <Box textAlign="center" mt={1}>
            <Typography variant="body2">
              Vous avez déjà un compte ?
              <Link
                to="/login"
                style={{
                  color: "black",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  marginLeft: 10,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "primary.main")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
                aria-label="Aller à la page de connexion"
              >
                Connectez-vous
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}
