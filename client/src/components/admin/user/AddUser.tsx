import React, { useState } from "react"
import {
  Box,
  TextField,
  Button,
  Stack,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import CloseIcon from "@mui/icons-material/Close"

interface AddUserDialogProps {
  open: boolean
  close: (value: boolean) => void
}

export default function AddUserDialog({ open, close }: AddUserDialogProps) {

  const [role, setRole] = useState(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const characterRegex = /[<>'";\/\\\(\)\{\}\[\]=\+\`~!@#$%^&*]/;
  const postalCodeRegex = /^[0-9]{5}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    const FormValid = inputValid.every((x) => x[1])

    if (!FormValid) {
      inputValid.forEach(element => {
        if (element[1] === false) {
          setError("Votre " + `${element[0]}` + " contient des caractères interdits")
        }
        if (element[0] === "email" && element[1] === false) {
          setError("Votre email n’est pas valide")
        }
      })
    }

    if (!name || !email || !address || !postalCode || !country || !password) {
      setError("Veuillez remplir tous les champs")
      return
    }

    if (FormValid) {
      try {
        const res = await fetch("http://localhost:3000/api/user/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, address, postalCode, country, role }),
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
          setRole(null)
        }
      } catch {
        setError("Une erreur est survenue. Réessayez plus tard.")
      }
    }
  }

  const inputStyle = {
    "& label": { color: "#777" },
    "& label.Mui-focused": { color: "orange" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#ccc" },
      "&:hover fieldset": { borderColor: "orange" },
      "&.Mui-focused fieldset": { borderColor: "orange", borderWidth: 2 },
    },
  }

  return (
    <Dialog
      open={open}
      onClose={() => close(false)}
      sx={{
        "& .MuiDialog-paper": {
          width: { xs: "80%", md: "50%" },
          maxWidth: "none",
        }
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "primary.main",
        }}>

        Créer un compte
        <IconButton
          aria-label="Fermer"
          onClick={() => close(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            mt: 2,
          }}
        >
          {error && <Alert
            severity="error"
            sx={{ minWidth: "100%", backgroundColor: theme.palette.primary.main, justifyContent: "center" }}
          >
            {error}
          </Alert>}
          {success && <Alert
            severity="success"
            sx={{ minWidth: "100%", backgroundColor: theme.palette.primary.main, justifyContent: "center" }}
          >
            {success}
          </Alert>}

          <Box display={"flex"} gap={2} justifyContent={"center"}>
            <Button onClick={() => setRole(false)} color={role === false ? "primary" : "inherit"} variant="contained">User</Button>
            <Button onClick={() => setRole(true)} color={role === true ? "primary" : "inherit"} variant="contained">Admin</Button>
          </Box>

          <Box component="form" onSubmit={handleRegister} noValidate>
            <Stack spacing={1.5}>
              <TextField label="Nom" value={name} onChange={(e) => setName(e.target.value)} required fullWidth sx={inputStyle} />
              <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth sx={inputStyle} />
              <TextField label="Adresse" value={address} onChange={(e) => setAddress(e.target.value)} required fullWidth sx={inputStyle} />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <TextField
                  label="Code Postal"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                  sx={inputStyle}
                  inputProps={{
                    maxLength: 5,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  style={{ width: "48%" }}
                />
                <TextField
                  label="Ville"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  sx={inputStyle}
                  style={{ width: "48%" }}
                />
              </Box>

              <Box sx={{ position: "relative" }}>
                <TextField
                  label="Mot de passe"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  sx={inputStyle}
                />
                <IconButton
                  sx={{ position: "absolute", top: 9, right: 10 }}
                  onClick={() => setShowPassword((prev) => !prev)}
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
                  fontWeight: 600,
                  fontSize: "0.95rem",
                }}
              >
                Créer le compte
              </Button>
            </Stack>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
