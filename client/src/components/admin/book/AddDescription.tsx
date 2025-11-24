import { useState } from "react";
import {
    Alert,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    TextField
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface Book {
    id: number;
    name: string;
}

interface AddDescriptionProps {
    open: boolean;
    close: (value: boolean) => void;
    book: Book[];
}

function AddDescription({ open, close, book }: AddDescriptionProps) {
console.log(book)
    const [resultOcr, setResultOcr] = useState("");
    const [Alerte, setAlerte] = useState("");
    const [bookId, setBookId] = useState("");
    const [description, setDescription] = useState(book.id === bookId);
    console.log(description)
    const registerDescription = () => {
        if (!bookId) {
            setAlerte("Une erreur : Veuillez selectionner un livre")
            setTimeout(() => {
                setAlerte("")
            }, 3000)
        }
        if (!resultOcr) {
            setAlerte("Une erreur : Veuillez selectionner une image")
            setTimeout(() => {
                setAlerte("")
            }, 3000)
        }
        if (resultOcr && bookId) {
            try {
                fetch(`http://localhost:3000/book/update`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ data: { description: resultOcr }, id: bookId }),
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json()
                        } else {
                            throw new Error("Erreur serveur")
                        }
                    })
                    .then((data) => {
                        if (data[0] === 1) {
                            setAlerte("Nouvelle description enregistrée")
                            setTimeout(() => {
                                close(false)
                            }, 3000)

                        } else {
                            setAlerte("Une erreur est survenue lors de l'enregistrement")
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        }

    }

    const OCR = (e) => {

        const formData = new FormData();
        formData.set("name", e.target.files[0].name.split(".")[0]);
        formData.set("image", e.target.files[0]);

        try {
            fetch(`http://localhost:3000/image/ocr`, {
                method: "POST",
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
                        fetch('http://localhost:3000/ocr', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
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
        <Dialog
            open={open}
            maxWidth="sm" fullWidth>
            <DialogTitle
                aria-label="Titre de la fenêtre"
                sx={{
                    bgcolor: "orange",
                    padding: 1,
                    mb: "20px"
                }}>
                Ajouter une Description
                <IconButton
                    onClick={() => close(false)}
                    aria-label="Fermer la fenêtre"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 5
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <TextField
                select
                label="Choisir un livre"
                value={bookId}
                onChange={(e) => { setBookId(e.target.value); setDescription((book.filter((b)=>b.id === parseInt(e.target.value))[0].description)) }}
                aria-label="Sélectionner un livre"
                sx={{
                    width: "50%",
                    mx: "auto"
                }}
            >
                {book.map((b) => (
                    <MenuItem
                        key={b.id}
                        value={b.id}
                        aria-label={`Livre ${b.name}`}
                    >
                        {b.name}
                    </MenuItem>
                ))}
            </TextField>

            <DialogContent>
                <label htmlFor="image">
                    <Button
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "50%",
                            mx: "auto",
                            my: 2
                        }}
                        variant="contained"
                        component="span"
                        aria-label="Bouton pour choisir une image"
                    >
                        Choisir l’image
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

                <TextField
                    multiline
                    minRows={10}
                    fullWidth
                    value={resultOcr? resultOcr : description? description : "veuiller choisir un livre"}
                    onChange={(e) => setResultOcr(e.target.value)}
                    variant="outlined"
                    aria-label="Zone de texte de la description OCR"
                />

            </DialogContent>

            {Alerte &&
                <Alert
                    aria-label={`Message d'alerte : ${Alerte}`}
                    severity={Alerte.includes("erreur") ? "error" : "success"}
                >
                    {Alerte}
                </Alert>}

            <Button 
            aria-label="Valider l'ajout de la description"
            onClick={() => registerDescription()}
            variant="contained"
                sx={{ 
                    width: "auto", 
                    mx: "auto", 
                    my: 2 
                }}
                
            >
                Enregistrer en base de données
            </Button>

        </Dialog>
    );
}

export default AddDescription