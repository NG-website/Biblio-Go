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
import theme from "../../../theme"
import { useAuthContext } from "../../Context/AuthContext"
import { API_URL } from "../../../config"

interface AddUserDialogProps {
  open: boolean
  close: (value: boolean) => void
}

export default function AddUserDialog({ open, close }: AddUserDialogProps) {
  const { user } = useAuthContext()
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

    // const inputValid = [
    //   ["nom", !characterRegex.test(name)],
    //   ["email", emailRegex.test(email)],
    //   ["address", !characterRegex.test(address)],
    //   ["code postal", postalCodeRegex.test(postalCode)],
    //   ["ville", !characterRegex.test(country)],
    //   ["mot de passe", !characterRegex.test(password)],
    // ]

    // const FormValid = inputValid.every((x) => x[1])

    // if (!FormValid) {
    //   inputValid.forEach(element => {
    //     if (element[1] === false) {
    //       setError("Votre " + `${element[0]}` + " contient des caractères interdits")
    //     }
    //     if (element[0] === "email" && element[1] === false) {
    //       setError("Votre email n’est pas valide")
    //     }
    //   })
    // }

    // if (!name || !email || !address || !postalCode || !country || !password || role === null) {
    //   setError("Veuillez remplir tous les champs")
    //   return
    // }

   // if (FormValid) {
      try {
        const res = await fetch(`${API_URL}api/admin/user/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user?.token}`
          },
          body: JSON.stringify({ name, email, password, address, postalCode, country, role }),
        })

        if (!res.ok) {
          setError("Impossible de créer le compte.")
          return
        }

        const data = await res.json()
        if (data) {
          setSuccess(
            "Compte créé avec succès ! Un e-mail de confirmation a été envoyé à par mail pour activer le compte."
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
 // }

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
            "&: hover *": { fill: theme.palette.text.primary }
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
            sx={{ minWidth: "100%", backgroundColor: theme.palette.primary.main, textAlign: "center" }}
          >
            {error}
          </Alert>}
          {success && <Alert
            severity="success"
            sx={{ minWidth: "100%", backgroundColor: theme.palette.primary.main, textAlign: "center" }}
          >
            {success}
          </Alert>}

          <Box display={"flex"} gap={2} justifyContent={"center"}>
            <Button
              onClick={() => setRole(false)}
              variant={role === false ? "contained" : "outlined"}
              sx={{ color: role === false ? "" : "text.primary" }}
            >
              User
            </Button>
            <Button
              onClick={() => setRole(true)}
              variant={role === true ? "contained" : "outlined"}
              sx={{ color: role === true ? "" : "text.primary" }}
            >
              Admin
            </Button>
          </Box>

          <Box component="form" onSubmit={handleRegister} noValidate>
            <Stack spacing={1.5}>
              <TextField
                label="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Adresse"
                value={address} onChange={(e) => setAddress(e.target.value)}
                required
                fullWidth
              />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <TextField
                  label="Code Postal"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
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
