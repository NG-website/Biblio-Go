import * as React from "react";
import "dayjs/locale/fr";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Paper,
    Alert,
    Box,
    Button,
    Avatar,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { DeleteForever } from "@mui/icons-material";
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import AddBorrow from "./AddBorrow";
import InputDate from "../../date/InputDate";
import theme from "../../../theme";
import PopUPDelete from "../PopUpDelete";
import { useAuthContext } from "../../Context/AuthContext";
import { API_URL } from "../../../config";

export default function UserBook({ filter }) {
    const {user}=useAuthContext()
    const [bookUser, setBookUser] = React.useState([]);
    const [editId, setEditId] = React.useState(null);
    const [bookName, setBookName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [takeAt, setTakeAt] = React.useState("");
    const [depositAt, setDespositAt] = React.useState("");
    const [reload, setReload] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [confirmDelete, setConfirmDelete] = React.useState(null);
    const [openAddBorrow, setOpenAddBorrow] = React.useState(false);
    const [take, setTake] = React.useState(false)
    const [deposit, setDeposit] = React.useState(false)

    React.useEffect(() => {
        setReload(false);
        fetch(`${API_URL}api/bookuser/all`,{
            credentials:"include",
            headers:{ "Authorization": `Bearer ${user?.token}`}
        })
            .then((res) => { return res.json() })
            .then((data) => {
                console.log(data)
                if (filter == 'take') {
                    setBookUser(data.filter((d) => d.take === false));
                } else if (filter == 'deposit') {
                    setBookUser(data.filter((d) => d.take === true && d.deposit === false))
                } else {
                    setBookUser(data)
                }
            })
            .catch(err => console.error(err));
    }, [reload, location.pathname]);

    const startEdit = (borrow) => {
        setEditId(borrow.id);
        setBookName(borrow.Book.name);
        setUserName(borrow.User.name);
        setTakeAt(new Date(borrow.take_at).toJSON());
        setDespositAt(new Date(borrow.deposit_at).toJSON());
        setTake(borrow.take)
        setDeposit(borrow.deposit)
    };

    const cancelEdit = () => {
        setEditId(null);
    };

    const saveEdit = (borrowId: number) => {
        const data = {
            take_at: takeAt,
            deposit_at: depositAt,
        };
        fetch(`${API_URL}api/bookuser/update`, {
            method: "PUT",
            credentials: "include",
            headers: {
                 "Content-Type": "application/json",
                 "Authorization": `Bearer ${user?.token}`
                 },
            body: JSON.stringify({ data, id: { id: borrowId } }),
        })
            .then((res) => { return res.json() })
            .then((data) => {
                if (data && data[0] === 1) {
                    setReload(true);
                    setMessage("Modification enregistrée avec succès");
                } else {
                    setMessage("Attention, une erreur est survenue, merci de recommencer");
                }
                setTimeout(() => setMessage(""), 2000);
            });

        setEditId(null);
    };

    const saveNow = (borrow) => {
        let data
        if (filter === 'take') {
            data = {
                take_at: new Date(),
                deposit_at: borrow.deposit_at,
                take: true,
            };
        } else {
            data = {
                take_at: borrow.take_at,
                deposit_at: new Date(),
                deposit: true
            };
        }
        fetch(`${API_URL}api/bookuser/update`, {
            method: "PUT",
            credentials: "include",
            headers: { 
                "Content-Type": "application/json" ,
             "Authorization": `Bearer ${user?.token}`
            },
            body: JSON.stringify({ data, id: { id: borrow.id } }),
        })
            .then((res) => res.ok && res.json())
            .then((data) => {
                if (data && data[0] === 1) {
                    setReload(true);
                    setMessage("Modification enregistrée avec succès");
                } else {
                    setMessage("Attention, une erreur est survenue, merci de recommencer");
                }
                setTimeout(() => setMessage(""), 2000);
            });
        setEditId(null);
    };

    const deleteForever = () => {
        fetch(`${API_URL}api/bookuser/delete`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                 "Content-Type": "application/json",
                 "Authorization": `Bearer ${user?.token}`
                 },
            body: JSON.stringify({ id: confirmDelete }),
        })
            .then((res) => {
                if (res.ok) {
                    setReload(true);
                    setMessage("Livre supprimé avec succès");
                } else {
                    setMessage("Erreur lors de la suppression");
                }
                setTimeout(() => setMessage(""), 2000);
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
                minHeight={{ xs: "140.15px", md: "84.16px" }}
            >
                {filter === 'take' ?
                <h2 aria-label="Section des départs">Les Départs</h2>
                :
                <h2 aria-label="Section des retours">Les Retours</h2>}

                {filter === 'take' ?
                    <Button
                        onClick={() => setOpenAddBorrow(true)}
                        aria-label="Ajouter un emprunt"
                        sx={{
                            bgcolor: "secondary.main",
                            color: "text.primary",
                            "&:hover": { bgcolor: "secondary.main", color: "primary.main" },
                            "&:hover *": { fill: theme.palette.primary.main }
                        }}
                        startIcon={<BookmarkAddedIcon sx={{ fill: theme.palette.text.primary }} aria-hidden="true" />}
                        variant="contained"
                    >
                        Ajouter un emprunt
                    </Button>
                    :
                    null}
                {openAddBorrow && <AddBorrow open={openAddBorrow} close={setOpenAddBorrow} />}
            </Box>

          <PopUPDelete confirmDelete={confirmDelete? confirmDelete : null} setConfirmDelete={setConfirmDelete} deleteForever={deleteForever}/>

            {message && (
                <Alert severity={message.includes("Attention") ? "error" : "success"} 
                sx={{ position: "absolute",
                     top: "25%", 
                     left: "25%", 
                     width: "50%",
                      height: "50%",
                       alignItems: "center",
                        justifyContent: "center",
                        bgcolor:"primary.main"
                     }}>{message}</Alert>
            )}

            <TableContainer component={Paper}>
                <Table aria-label="Tableau des emprunts">
                    <TableHead sx={{ position: "sticky", top: 0, zIndex: 2, bgcolor:"background.default" }}>
                        <TableRow>
                            <TableCell>Photo</TableCell>
                            <TableCell sx={{ minWidth: "240px" }} align="center">Nom</TableCell>
                            <TableCell sx={{ minWidth: "240px" }} align="center">Retrait</TableCell>
                            <TableCell sx={{ minWidth: "240px" }} align="center">Dépôt</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody >
                        {bookUser.map((borrow) => {
                            const isEditing = editId === borrow.id;
                            const late = new Date() > new Date(borrow[filter + "_at"])
                            return (
                                <TableRow 
                                sx={{width: { xs: "70%", md: "100%" }}}
                                key={borrow.id}
                                aria-label={`Ligne emprunt ${borrow?.Book?.name}`}
                              >
                                    <TableCell>
                                        <Avatar
                                           alt={`image de ${borrow?.Book?.name}`}
                                            aria-label={`Photo du livre ${borrow?.Book?.name}`}
                                            src={`${API_URL}api/uploads/book/${borrow?.Book?.name}.jpg`}
                                        />
                                    </TableCell>

                                    <TableCell sx={{ textAlign: "center" }}>
                                        {borrow?.Book?.name}
                                        <hr style={{ margin: "10px" }} />
                                        {borrow.User.name}
                                    </TableCell>

                                    <TableCell sx={{ maxWidth: "200px" }} align="center">
                                        {isEditing && filter === 'take' ? (
                                            <InputDate aria-label="Date de retrait" date={takeAt ? new Date(takeAt) : null} setDate={setTakeAt} />
                                        ) : late && filter === 'take' ? ("en retard") :
                                            (
                                                new Date(borrow.take_at).toLocaleDateString()
                                                + " à " +
                                                new Date(borrow.take_at).toLocaleTimeString("fr-FR", {
                                                hour: "2-digit",
                                                minute: "2-digit", 
                                                })
                                            )}
                                    </TableCell>

                                    <TableCell sx={{ maxWidth: "200px" }} align="center">
                                        {isEditing ? (
                                            <InputDate aria-label="Date de dépôt" date={depositAt} setDate={setDespositAt} />
                                        ) : late && filter === 'deposit' ? (
                                            "en retard"
                                        ) : (
                                            new Date(borrow.deposit_at).toLocaleDateString() +
                                            " à " +
                                            new Date(borrow.deposit_at).toLocaleTimeString("fr-FR", {
                                                hour: "2-digit",
                                                minute: "2-digit", 
                                            })
                                        )}
                                    </TableCell>

                                    <TableCell align="center">
                                        {isEditing ? (
                                            <Box display={"flex"} justifyContent={"space-around"}>
                                                <CheckCircleIcon
                                                    onClick={() => saveEdit(borrow.id)}
                                                    aria-label="Enregistrer les modifications"
                                                    sx={{ cursor: "pointer", fill: theme.palette.success.main }}
                                                />
                                                <CancelIcon
                                                    onClick={cancelEdit}
                                                    aria-label="Annuler les modifications"
                                                    sx={{ cursor: "pointer", fill: theme.palette.error.main }}
                                                />
                                            </Box>
                                        ) : (
                                            <Box display={"flex"} gap={"20px"}>
                                                <ModeEditIcon
                                                    onClick={() => startEdit(borrow)}
                                                    aria-label="Modifier cet emprunt"
                                                    sx={{ cursor: "pointer", fill: theme.palette.primary.main }}
                                                />
                                                <DeleteForever
                                                    onClick={() => setConfirmDelete(borrow.id)}
                                                    aria-label="Supprimer définitivement"
                                                    sx={{ cursor: "pointer", fill: theme.palette.error.main }}
                                                />
                                                <TaskAltIcon
                                                    onClick={() => { saveNow(borrow) }}
                                                    aria-label="Valider maintenant"
                                                    sx={{ cursor: "pointer", fill: theme.palette.success.main }}
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
