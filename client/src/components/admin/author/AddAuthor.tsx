import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../../../theme";
import { useAuthContext } from "../../Context/AuthContext";
import { API_URL } from "../../../config";

interface AddAuthorProps {
  open: boolean;
  close: (value: boolean) => void;
}

function AddAuthor({ open, close }: AddAuthorProps) {
  const {user} =useAuthContext()
  
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");


  const registerAuthor = () => {
    if (!firstname || !lastname || !description) {
      return setMessage("Merci de remplir tous les champs");
    }

    if (firstname.length < 2 || lastname.length < 2) {
      return setMessage("Le Nom et le Prénom doivent faire  au minumun 2 caracteres")
    }

    if (description.length < 20) {
      return setMessage("La description doit faire au minumun 20 caracteres")
    }

    try {
      const data = {
        firstname,
        lastname,
        description
      }

      fetch(`${API_URL}api/author/create`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`
         },
        body: JSON.stringify({ data }),
      })
        .then((res) => {
          if (res.status === 400) {
            setMessage("Veuillez vérifier le formulaire, certains champs sont incorrects.");
            return null
          }

          if (res.status === 409) {
            setMessage("Cet auteur existe déjà");
            return null;
          }

          if (!res.ok) {
            setMessage("Erreur serveur");
            return null;
          }

          return res.json()
        })

        .then((data) => {
          if (data) {
            setFirstname("");
            setLastname("");
            setDescription("");
            setMessage(data);
            setTimeout(() => {
              setMessage("");
              close(false);
            }, 3000)
          }
        })
    } catch (error) {
      setMessage("Erreur serveur")
    }
  }

  return (
    <Dialog open={open} sx={{
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
        Ajouter un Auteur
        <IconButton
          aria-label="Fermer"
          onClick={() => close(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            "&: hover *":{fill:theme.palette.text.primary}
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 2,
            width: "100%",
            mx: "auto",
            mt: 2,
            mb: 2,
          }}
        >
          <TextField
            required
            label="Nom"
            name="lastname"
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
              setMessage("");
            }}
            sx={{
              minWidth: { xs: "100%", md: "48%" },
              maxWidth: { xs: "100%", md: "48%" }
            }}

            inputProps={{ maxLength: 40, minLength: 2 }}
            FormHelperTextProps={{ sx: { position: "absolute", right: 0, bottom: 0 } }}
            helperText={`${lastname.length}/40`}
          />

          <TextField
            label="Prénom"
            name="firstname"
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
              setMessage("");
            }}
            sx={{
              minWidth: { xs: "100%", md: "48%" },
              maxWidth: { xs: "100%", md: "48%" }
            }}
            inputProps={{ maxLength: 40, minLength: 2 }}
            FormHelperTextProps={{ sx: { position: "absolute", right: 0, bottom: 0 } }}
            helperText={`${firstname.length}/40`}
            required
          />

          <TextField
            label="Description"
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setMessage("");
            }}
            fullWidth
            multiline
            rows={4}
            required
            inputProps={{ maxLength: 1000, minLength: 20 }}
            FormHelperTextProps={{ sx: { position: "absolute", right: 0, bottom: 0 } }}
            helperText={`${description.length}/1000`}
          />

          {message && (
            <Alert
              severity={message.includes("enregistrer") ? "success" : "error"}
              sx={{ minWidth: "100%", backgroundColor:theme.palette.primary.main, justifyContent:"center" }}
            >
              {message}
            </Alert>
          )}

          {message.includes("enregistrer") ? (
            <Button
              sx={{ maxWidth: { xs: "100%", md: "40%", backgroundColor:theme.palette.primary.main } }}
              variant="contained"
              
            >
              Enregistrer
              <DoneIcon
                sx={{ ml: 1 , fill:"white"}}
              />
            </Button>
          ) : message !== "" ? (
            <Button
              sx={{ maxWidth: { xs: "100%", md: "40%" } }}
              variant="contained"
            >
              <DangerousIcon sx={{ mx: 5 , fill:"white"}} />
            </Button>
          ) : (
            <Button
              sx={{ maxWidth: { xs: "100%", md: "40%", backgroundColor:"primary.main" } }}
              onClick={registerAuthor}
              variant="contained"
              color="primary"
            >
              Enregistrer
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddAuthor