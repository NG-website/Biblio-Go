import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Stack,
  Avatar,
  MenuItem,
  Alert,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import DangerousIcon from '@mui/icons-material/Dangerous';
import CloseIcon from '@mui/icons-material/Close';

import theme from "../../../theme";
import { useAuthContext } from "../../Context/AuthContext";
import { API_URL } from "../../../config";


interface AddBookProps {
  open: boolean;
  close: (value: boolean) => void;
}

function AddBook({ open, close }: AddBookProps) {
  const { user } = useAuthContext()
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState([]);
  const [categorySelected, setCategorySelected] = useState<any>([]);
  const [categories, setCategories] = useState([]);
  const [stock, setStock] = useState("");
  const [authorSelected, setAuthorSelected] = useState("");
  const [message, setMessage] = useState("");
  const [note, setNote] = useState<number | null>(null);
  const [resultOcr, setResultOcr] = useState("");

  useEffect(() => {
    try {
      fetch(`${API_URL}api/author/all`)
        .then((res) => { return res.json() })
        .then((data) => setAuthor(data));

      fetch(`${API_URL}api/book/categories`)
        .then((res) => { return res.json() })
        .then((data) => setCategories(data));
    } catch (error) {
      console.log(error)
    }

  }, []);

  const pictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const picturePreview = URL.createObjectURL(selectedFile);
      setPreview(picturePreview);
    } else {
      setPreview("");
    }
  };

  const registerBook = () => {
    if (name !== "" && author.length !== 0 && categories.length !== 0 && stock !== "" && note !== null && preview !== "") {

      const formData = new FormData();
      formData.append("name", name);
      if (file) formData.append("image", file);

      fetch(`${API_URL}api/image/book`, {
        method: "POST",
        body: formData
      })
        .then((res) => res.ok && res.json())
        .then((data) => {
          console.log(data)
          console.log(authorSelected)
          console.log(categorySelected)
          fetch(`${API_URL}api/book/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${user?.token}`
            },
            body: JSON.stringify({
              name: name,
              authorId: authorSelected,
              stock: stock,
              categoryId: categorySelected,
              note: note,
              description: resultOcr || null
            })
          })
            .then((res) => res.ok && res.json())
            .then((data) => {
              if (data) {
                setMessage("livre enregistrer");
                setName("");
                setCategorySelected("");
                setAuthorSelected("");
                setFile(null);
                setStock("");
                setNote(null);
                setPreview("");
                setTimeout(() => {
                  setMessage("");
                  close(false);
                }, 3000);
              }
            });
        });

    } else {
      setMessage("Merci de remplir tous les champs");
    }
  };

  const OCR = (e) => {
    const formData = new FormData();
    formData.append("name", e.target.files[0].name.split(".")[0]);
    formData.append("image", e.target.files[0]);

    try {
      fetch(`${API_URL}api/image/ocr`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${user?.token}` },
        body: formData,
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            throw new Error("Erreur serveur")
          }
        })
        .then((data) => {
          if (data.path) {
            fetch(`${API_URL}api/ocr`, {
              method: 'POST',
              credentials: "include",
              headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user?.token}`
              },
              body: JSON.stringify({ path: data.path.split(".")[0] + ".jpg" }),
            })
              .then((res) => {
                if (res.ok) {
                  return res.json()
                } else {
                  throw new Error("Erreur serveur")
                }
              })
              .then((data) => {
                setResultOcr(data.text)
              })
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Dialog open={open} sx={{
      "& .MuiDialog-paper": {
        width: { xs: "80%", md: "53%" },
        maxWidth: "none",
      }
    }}
    >
      <DialogTitle sx={{ backgroundColor: "primary.main" }}>
        Ajouter un livre
        <IconButton
          aria-label="Fermer"
          onClick={() => close(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            "&:hover *": { fill: theme.palette.text.primary }
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
            mt: 2,
            mb: 2,
          }}
        >

          <Stack alignItems="center" mt={2} width={"100%"}>
            <Avatar
              src={preview}
              alt="Aperçu"
              sx={{
                width: 120,
                height: 120,
                mb: 1,
                bgcolor: "primary.main",
              }}
            />
          </Stack>
          <Box
            display={"flex"}
            flexDirection={{ xs: "column", md: "row" }}
            width={"100%"}
            justifyContent={"space-around"}
            gap={{ xs: "20px" }}
          >
            <TextField
              label="Nom du livre"
              name="name"
              value={name}
              onChange={(e) => { setName(e.target.value); setMessage(""); }}
              sx={{ width: { xs: "100%", md: "40%" } }}
              required
            />

            <TextField
              select
              label="Auteur"
              value={authorSelected || ""}
              fullWidth
              onChange={(e) => {
                setAuthorSelected(e.target.value);
                setMessage("");
              }}
              required
              sx={{ width: { xs: "100%", md: "40%" } }}
              SelectProps={{
                MenuProps: {
                  sx: { "& .MuiList-root": { color: "text.primary" } },
                  PaperProps: {
                    sx: { maxHeight: 200, maxWidth: 300 }
                  }
                }
              }}
            >
              {author.map((auth: any, index) => (
                <MenuItem
                  key={index}
                  value={index + 1}
                >
                  {auth.firstname + " " + auth.lastname}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box
            display={"flex"}
            flexDirection={{ xs: "column", md: "row" }}
            width={"100%"}
            justifyContent={"space-around"}
            gap={{ xs: "20px" }}
          >
            <TextField
              select
              label="catégories"
              value={categorySelected || ""}
              fullWidth
              onChange={(e) => {
                setCategorySelected(e.target.value);
                setMessage("");
              }}
              required
              sx={{ width: { xs: "100%", md: "40%" } }}
              SelectProps={{
                MenuProps: {
                  sx: { "& .MuiList-root": { color: "text.primary" } },
                  PaperProps: {
                    sx: { maxHeight: 200, maxWidth: 300 }
                  }
                }
              }}
            >
              {
                categories.map((cat, index) => (
                  <MenuItem
                    key={index}
                    value={index + 1}
                  >
                    {cat.name}
                  </MenuItem>
                ))
              }
            </TextField>

            <TextField
              label="quantité"
              name="quantity"
              value={stock}
              required
              onChange={(e) => { setStock(e.target.value); setMessage(""); }}
              sx={{ width: { xs: "100%", md: "40%" } }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", minWidth: "100%" }}>
            <Rating
              name="simple-controlled"
              value={note}
              precision={0.5}
              onChange={(e) => { setNote(Number(e.target.value)); setMessage(""); }}
              sx={{
                "& .MuiSvgIcon-root": {
                  fill: theme.palette.primary.main,
                }
              }}
            />
          </Box>

          <TextField
            multiline
            fullWidth
            sx={{
              display: resultOcr ? "block" : "none",
              height: "auto"
            }}
            value={resultOcr}
            onChange={(e) => setResultOcr(e.target.value)}
            variant="outlined"
            aria-label="Zone de texte de la description OCR"
          />

          {message && (
            <Alert
              severity={message.includes("enregistrer") ? "success" : "error"}
              sx={{ minWidth: "100%", bgcolor: "primary.main", justifyContent: "center" }}
            >
              {message}
            </Alert>
          )}

          <Button
            variant={file ? "outlined" : "contained"}
            component="label"
            sx={{ maxWidth: { xs: "100%", md: "25%" } }}
          >
            <input
              hidden
              accept="image/*"
              type="file"
              name="image"
              onChange={(e) => { pictureChange(e); setMessage(""); }}
            />
            {file ?
              <>
                <p style={{ color: theme.palette.text.primary, marginLeft: "10px" }}>
                  {"Ajouter "}
                </p>
                <DoneIcon sx={{ fill: "white" }} />
              </>
              :
              "Image Livre "}
          </Button>

          <label
            htmlFor="image">
            <Button
              fullWidth
              variant={resultOcr ? "outlined" : "contained"}
              component="span"
              aria-label="Bouton pour choisir une image pour l ocr"
            >
              {resultOcr ?
                <>
                  <p style={{ color: theme.palette.text.primary, marginLeft: "10px" }}>
                    {"Ajouter"}
                  </p>
                  <DoneIcon sx={{ fill: "white" }} />
                </>
                :
                "Description"
              }
            </Button>
          </label>

          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={OCR}
            style={{ display: "none" }}
            aria-label="Input fichier image pour OCR"
          />

          {message.includes("enregistrer") ? (
            <Button
              sx={{ maxWidth: { xs: "100%", md: "40%" } }}
              variant="contained"
              color="success"
            >
              Enregistrer <DoneIcon sx={{ ml: 1 }} />
            </Button>
          ) : message !== "" ? (
            <Button
              sx={{ maxWidth: { xs: "100%", md: "40%" } }}
              variant="contained"
            >
              <DangerousIcon sx={{ mx: 5 }} />
            </Button>
          ) : (
            <Button
              sx={{ maxWidth: { xs: "100%", md: "40%" } }}
              onClick={registerBook}
              variant="contained"
              color="primary"
            >
              Enregistrer
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog >
  );
}

export default AddBook;



// // ✅ Résumé des erreurs les plus graves

// // ❌ Mauvaise validation des champs (tu vérifies les LISTES au lieu des selections).

// // ❌ parse totalement incorrect des IDs via split('"id":').

// // ❌ absence de preventDefault() dans un form.

// // ❌ setInterval au lieu de setTimeout.

// // ❌ incohérence des types (categorySelected tableau alors que TextField attend une string).

// // ❌ Rating incorrect (e.target.value ne fonctionne pas).

// // ❌ bouton success et error inutiles (aucune action).

// // ❌ logique d’message basée sur un texte.