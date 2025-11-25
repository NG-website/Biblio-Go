import * as React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Alert,
    Box,
    Button,
    Avatar,
    MenuItem
} from "@mui/material";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { DeleteForever } from "@mui/icons-material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import AddBook from "./AddBook";
import theme from "../../../theme";
import PopUPDelete from "../PopUpDelete";
import { useAuthContext } from "../../Context/AuthContext";
import { API_URL } from "../../../config";

export default function ListBook() {
    const { user } = useAuthContext()
    const [books, setBooks] = React.useState([]);
    const [editId, setEditId] = React.useState(null);
    const [file, setFile] = React.useState(null);
    const [name, setName] = React.useState("");
    const [stock, setStock] = React.useState("");
    const [note, setNote] = React.useState("");
    const [categoryId, setCategoryId] = React.useState("");
    const [authorId, setAuthorId] = React.useState("");
    const [reload, setReload] = React.useState(false);
    const [alerte, setAlerte] = React.useState("");
    const [categoriesList, setCategoriesList] = React.useState([]);
    const [authorsList, setAuthorsList] = React.useState([]);
    const [confirmDelete, setConfirmDelete] = React.useState(null);
    const [openAddBook, setOpenAddBook] = React.useState(false);

    React.useEffect(() => {
        setReload(false);
        fetch(`${API_URL}api/book/all`)
            .then((res) => { return res.json() })
            .then((data) => { setBooks(data) })
            .catch((err) => console.error(err));
    }, [reload]);

    const startEdit = (book) => {
        fetch(`${API_URL}api/book/categories`)
            .then((res) => { return res.json() })
            .then((data) => setCategoriesList(data));

        fetch(`${API_URL}api/author/all`)
            .then((res) => { return res.json() })
            .then((data) => { setAuthorsList(data) });

        setEditId(book.id);
        setName(book.name);
        setStock(book.stock);
        setNote(book.note);
        setCategoryId(book.Category.id);
        setAuthorId(book.Author.id);
    };

    const cancelEdit = () => {
        setEditId(null);
    };

    const pictureChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const saveEdit = (bookName) => {
        const data = {
            name,
            stock,
            note,
            categoryId,
            authorId,
        };
        const formData = new FormData();
        formData.append("name", bookName);
        formData.append("image", file!);
        if (file && name) {
            fetch(`${API_URL}api/image/book`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user?.token}`
                },
                body: formData,
            });
        }
        fetch(`${API_URL}api/book/update`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user?.token}`
            },
            body: JSON.stringify({ data, id: { id: editId } }),
        })
            .then((res) => res.ok && res.json())
            .then((data) => {
                if (data && data[0] === 1) {
                    setReload(true);
                    setAlerte("modification enregistrée avec sucsée");
                } else {
                    setAlerte("attention, une erreur et survenue, merci de recommencer ");
                }
                setTimeout(() => setAlerte(""), 2000);
            });
        setEditId(null);
    };

    const deleteForever = () => {
        fetch(`${API_URL}api/book/delete`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user?.token}`
            },
            body: JSON.stringify({ id: confirmDelete!.id }),
        })
            .then((res) => {
                if (res.ok) {
                    setReload(true);
                    setAlerte("Livre supprimé avec succès");
                } else {
                    setAlerte("Erreur lors de la suppression");
                }
                setTimeout(() => setAlerte(""), 2000);
                setConfirmDelete(null);
            })
            .catch(() => {
                setAlerte("Erreur réseau");
                setTimeout(() => setAlerte(""), 2000);
                setConfirmDelete(null);
            });
    }

    return (
        <>
            <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                p="20px"
                gap={"20px"}
                position="sticky"
                top={0}
                zIndex={3}
                bgcolor="primary.main"
            >
                <h2 >Les Livres</h2>
                <Button
                    onClick={() => setOpenAddBook(true)}
                    variant="contained"
                    sx={{
                        bgcolor: "secondary.main",
                        color: "text.primary",
                        "&:hover": {
                            bgcolor: "secondary.main",
                            color: "primary.main",
                        },
                        "&:hover *": { fill: theme.palette.primary.main }
                    }}
                    startIcon={<LibraryAddIcon sx={{ fill: theme.palette.text.primary }} aria-hidden="true" />}
                >
                    Ajouter un livre
                </Button>
                {openAddBook && (
                    <AddBook open={openAddBook} close={setOpenAddBook} />
                )}
            </Box>

            <PopUPDelete confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} deleteForever={deleteForever} />

            {alerte && (
                <Alert
                    severity={alerte.includes("attention") ? "error" : "success"}
                    sx={{
                        position: "absolute",
                        top: "25%",
                        left: "25%",
                        width: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: theme.palette.primary.main
                    }}
                >
                    {alerte}
                </Alert>
            )}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ position: "sticky", top: 0, zIndex: 2, bgcolor: "background.default" }}>
                        <TableRow>
                            <TableCell>Photo</TableCell>
                            <TableCell align="center" sx={{ minWidth: "200px" }}>Nom</TableCell>
                            <TableCell align="center">Stock</TableCell>
                            <TableCell align="center">Note</TableCell>
                            <TableCell align="center" >Categorie</TableCell>
                            <TableCell align="center">Author</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {books.map((book) => {
                            const isEditing = editId === book.id;
                            return (
                                <TableRow key={book.id}>
                                    <TableCell >
                                        {isEditing ? (
                                            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                                <Avatar
                                                    alt={`image de ${book.name}`}
                                                    src={file ?
                                                        URL.createObjectURL(file)
                                                        :
                                                        `${API_URL}apiuploads/book/${book.name}.jpg`}
                                                />
                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                    sx={{ mt: 1 }}
                                                >
                                                    <ModeEditIcon />
                                                    <input hidden
                                                        type="file"
                                                        name="image"
                                                        accept="image/*"
                                                        onChange={pictureChange}
                                                    />
                                                </Button>
                                            </Box>
                                        ) : (
                                            <Avatar alt={`image de ${book.name}`} src={`${API_URL}api/uploads/book/${book.name}.jpg`} />
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {isEditing ? (
                                            <TextField
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                size="small"
                                            />
                                        ) : book.name}
                                    </TableCell>

                                    <TableCell align="center">
                                        {isEditing ? (
                                            <TextField
                                                type="number"
                                                value={stock}
                                                onChange={e => setStock(e.target.value)}
                                                size="small"
                                                sx={{ width: 60 }}
                                            />
                                        ) : (book.stock || <DoNotDisturbAltIcon sx={{ fill: "red" }} />)}
                                    </TableCell>

                                    <TableCell align="center">
                                        {isEditing ? (
                                            <TextField
                                                type="number"
                                                value={note}
                                                onChange={e => setNote(e.target.value)}
                                                size="small"
                                                sx={{ width: 80 }}
                                                inputProps={{ step: 0.1, min: 0, max: 5 }}
                                            />
                                        ) : (book.note || <DoNotDisturbAltIcon sx={{ fill: "red" }} />)}
                                    </TableCell>

                                    <TableCell align="center">
                                        {isEditing ? (
                                            <TextField
                                                select
                                                label="Categorie"
                                                aria-label="Sélection de la catégorie"
                                                value={categoryId}
                                                fullWidth
                                                size="small"
                                                onChange={(e) => { setCategoryId(e.target.value) }}
                                                required
                                                SelectProps={{
                                                    MenuProps: {
                                                        sx: { "& .MuiList-root": { color: "text.primary" } },
                                                        PaperProps: {
                                                            sx: { maxHeight: 200, maxWidth: 300 }
                                                        }
                                                    }
                                                }}
                                            >
                                                {categoriesList.map((cat, i) => (
                                                    <MenuItem
                                                        key={i}
                                                        value={i + 1}
                                                    >
                                                        {cat.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        ) : book.Category.name}
                                    </TableCell>

                                    <TableCell align="center">
                                        {isEditing ? (
                                            <TextField
                                                select
                                                label="Auteur"
                                                aria-label="Sélection de l auteur"
                                                value={authorId}
                                                fullWidth
                                                size="small"
                                                onChange={(e) => { setAuthorId(e.target.value) }}
                                                required
                                                SelectProps={{
                                                    MenuProps: {
                                                        sx: {
                                                            "& .MuiList-root": {
                                                                color: "text.primary"
                                                            }
                                                        },
                                                        PaperProps: {
                                                            sx: { maxHeight: 200, maxWidth: 300 }
                                                        }
                                                    }
                                                }}
                                            >
                                                {authorsList.map((auth, i) => (
                                                    <MenuItem
                                                        key={i}
                                                        value={i + 1}
                                                    >
                                                        {auth.firstname + " " + auth.lastname}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        ) : book?.Author?.firstname + " " + book?.Author?.lastname}
                                    </TableCell>

                                    <TableCell align="center">
                                        {isEditing ? (
                                            <Box display={"flex"} gap={"20px"}>
                                                <CheckCircleIcon
                                                    onClick={() => saveEdit(book.name)}
                                                    sx={{ cursor: "pointer", fill: theme.palette.success.main }} />
                                                <CancelIcon
                                                    onClick={cancelEdit}
                                                    sx={{ cursor: "pointer", fill: theme.palette.error.main }}
                                                />
                                            </Box>
                                        ) : (
                                            <Box display={"flex"} gap={"20px"}>
                                                <ModeEditIcon
                                                    onClick={() => startEdit(book)}
                                                    sx={{ cursor: "pointer", fill: theme.palette.primary.main }}
                                                />
                                                <DeleteForever
                                                    onClick={() => setConfirmDelete({ id: book.id, visible: true })}
                                                    sx={{ cursor: "pointer", fill: theme.palette.error.main }}
                                                />
                                            </Box>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
