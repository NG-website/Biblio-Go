import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Box,
  Button,
  TextField,
} from "@mui/material";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { DeleteForever } from "@mui/icons-material";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import AddAuthor from "./AddAuthor"; 
import theme from "../../../theme";
import PopUPDelete from "../PopUpDelete";
import { useAuthContext } from "../../Context/AuthContext";
import { API_URL } from "../../../config";

export default function ListAuthor() {
  const {user} = useAuthContext()
  const [authors, setAuthors] = React.useState([]);
  const [editId, setEditId] = React.useState(null);
  const [lastname, setLastname] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [reload, setReload] = React.useState(false);
  const [alerte, setAlerte] = React.useState("");
  const [confirmDelete, setConfirmDelete] = React.useState(null);
  const [openAddAuthor, setOpenAddAuthor] = React.useState(false);


  React.useEffect(() => {
    setReload(false);
    fetch(`${API_URL}api/author/all`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setAuthors(data))
      .catch((err) => console.error(err));
  }, [reload]);

  const startEdit = (author) => {
    setEditId(author.id);
    setLastname(author.lastname);
    setFirstname(author.firstname);
    setDescription(author.description);
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  const saveEdit = (id) => {
    const data = { lastname, firstname, description };

    fetch(`${API_URL}api/author/update`, {
      method: "PUT",
      credentials: "include",
      headers: { 
        "Content-Type": "application/json",
         "Authorization": `Bearer ${user?.token}`
       },
      body: JSON.stringify({ data, id }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data[0] === 1) {
          setReload(true);
          setAlerte("Auteur modifié avec succès");
        } else {
          setAlerte("Erreur lors de la modification");
        }
        setTimeout(() => setAlerte(""), 2000);
      })
      .catch(() => {
        setAlerte("Erreur réseau");
        setTimeout(() => setAlerte(""), 2000);
      });

    setEditId(null);
  };

  const deleteForever = () => {
    fetch(`${API_URL}api/author/delete`, {
      method: "DELETE",
      credentials:"include",
      headers: { 
        "Content-Type": "application/json",
         "Authorization": `Bearer ${user?.token}`
       },
      body: JSON.stringify({ id: confirmDelete!.id }),
    })
      .then((res) => {
        if (res.ok) {
          setReload(true);
          setAlerte("Auteur supprimé avec succès");
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
        <h2 >Les Auteurs</h2>
        <Button
          onClick={() => setOpenAddAuthor(true)}
          variant="contained"
          sx={{
            bgcolor: "secondary.main",
            color: "text.primary",
            "&:hover": {
              bgcolor: "secondary.main",
              color: "primary.main", fill: "red"
            },
            "&:hover *": { fill: theme.palette.primary.main }
          }}
          startIcon={<PersonAddIcon sx={{ fill: theme.palette.text.primary }} aria-hidden="true" />}
        >
          Ajouter un auteur
        </Button>
        {openAddAuthor && (
          <AddAuthor open={openAddAuthor} close={setOpenAddAuthor} />
        )}
      </Box>

      <PopUPDelete confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} deleteForever={deleteForever} />

      {alerte && (
        <Alert
          severity={alerte.includes("Erreur") ? "error" : "success"}
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
        <Table aria-label="collapsible table">
          <TableHead sx={{ position: "sticky", top: 0, zIndex: 2, bgcolor:"background.default"}}>
            <TableRow >
              <TableCell>Nom</TableCell>
              <TableCell align="center">Prénom</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {authors.map((auth) => {
              const isEditing = editId === auth.id;

              return (
                <TableRow key={auth.id}>
                  <TableCell>
                    {isEditing ? (
                      <TextField
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        size="small"
                      />
                    ) : (
                      auth.lastname || "----"
                    )}
                  </TableCell>

                  <TableCell align="center">
                    {isEditing ? (
                      <TextField
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        size="small"
                      />
                    ) : (
                      auth.firstname
                    )}
                  </TableCell>

                  <TableCell align="center">
                    {isEditing ? (
                      <TextField
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        size="small"
                        multiline
                        maxRows={3}
                        sx={{ width: "90%" }}
                      />
                    ) : (
                      auth.description || (
                        <DoNotDisturbAltIcon sx={{ fill: "red" }} />
                      )
                    )}
                  </TableCell>

                  <TableCell align="center">
                    {isEditing ? (
                      <Box display={"flex"} gap={"20px"}>
                        <CheckCircleIcon
                          onClick={() => saveEdit(auth.id)}
                          sx={{ cursor: "pointer",fill: theme.palette.success.main }}
                        />
                        <CancelIcon
                          onClick={cancelEdit}
                          sx={{ cursor: "pointer", fill: theme.palette.error.main }}
                        />
                       </Box>
                    ) : (
                      <Box display={"flex"} gap={"20px"}>
                        <ModeEditIcon
                          onClick={() => startEdit(auth)}
                          sx={{ cursor: "pointer",  fill: theme.palette.primary.main }}
                        />
                        <DeleteForever
                          onClick={() => setConfirmDelete(auth)}
                          sx={{ cursor: "pointer",fill: theme.palette.error.main  }}
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
