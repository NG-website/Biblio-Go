import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import Paper from '@mui/material/Paper';

import {
  Alert,
  Button,
  Checkbox,
  Divider,
  MenuItem,
  TextField,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { DeleteForever } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddUser from './AddUser';
import theme from '../../../theme';
import PopUPDelete from '../PopUpDelete';
import { useAuthContext } from '../../Context/AuthContext';
import { API_URL } from '../../../config';


export default function ListUser() {
  const {user}= useAuthContext()
  const [editId, setEditId] = React.useState(null);
  const [openUserAdd, setOpenUserAdd] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(null);
  const [reload, setReload] = React.useState(false);
  const [alerte, setAlerte] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [name, setName] = React.useState("");
  const [actif, setActif] = React.useState("");
  const [abonnementType, setAbonnementType] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [phone, setPhone] = React.useState("");

  React.useEffect(() => {
    fetch(`${API_URL}api/user/all`, {
      credentials: "include",
      headers:{ "Authorization": `Bearer ${user?.token}`}
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          return []
        }
      })
      .then((data) => {
        setUsers(data)
      })
      .catch((err) => {
        console.error(err)
      });
  }, [reload]);

  const startEdit = (user) => {
    setEditId(user.id);
    setName(user.name);
    setActif(user.actif);
    setAbonnementType(user.abonnementType || " " );
    setEmail(user.email);
    setAddress(user.address);
    setPostalCode(user.postalCode);
    setCountry(user.country);
    setPhone(user.phone || " ");
  };


  const saveEdit = () => {

    const data = {
      name,
      actif,
      abonnementType,
      abonnement:abonnementType? new Date() : " ",
      email,
      address,
      postalCode,
      country,
      phone,
    };

    fetch(`${API_URL}api/admin/user/update`, {
      method: "PUT",
      credentials: "include",
      headers: { 
        "Content-Type": "application/json",
         "Authorization": `Bearer ${user?.token}`
       },
      body: JSON.stringify({ data, id: editId }),
    })
      .then((res) => res.ok && res.json())
      .then((data) => {
        if (data[0] === 1) {
          setReload(true);
          setAlerte("modification enregistrée avec sucsée");
        } else {
          setAlerte("attention, une erreur et survenue, merci de recommencer ");
        }
        setTimeout(() => { setAlerte(""); setReload(false) }, 2000);
      });

    setEditId(null);
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  const deleteForever = () => {
    fetch(`${API_URL}api/user/delete`, {
      method: "DELETE",
      credentials: "include",
      headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${user?.token}`
         },
      body: JSON.stringify({ id: confirmDelete?.id }),
    })
      .then((res) => {
        if (res.ok) {
          setReload(true);
          setAlerte("Utilisateur supprimé avec succès");
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

      {alerte && (
        <Alert severity={alerte.includes("attention") ? "error" : "success"}
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

        <h2 >Les Utilisateurs</h2>
        <Button
          onClick={() => { setOpenUserAdd(true) }}
          sx={{
            bgcolor: "secondary.main",
            color: "text.primary",
            "&:hover": {
              bgcolor: "secondary.main",
              color: "primary.main"
            },
            "&:hover *": { fill: theme.palette.primary.main }
          }}
          variant="contained"
          startIcon={<GroupAddIcon sx={{ fill: theme.palette.text.primary }} aria-hidden="true" />}
        >
          Ajouter un user
        </Button>
        {openUserAdd && <AddUser open={openUserAdd} close={setOpenUserAdd} />}


      </Box>

      <PopUPDelete confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} deleteForever={deleteForever} />

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>

              <TableCell>Nom </TableCell>
              <TableCell align="center">Actif</TableCell>
              <TableCell align="center">Abonnement</TableCell>
              <TableCell align="center">Contact</TableCell>
              <TableCell align="center">Adresse</TableCell>
              <TableCell align="center">Code Postal</TableCell>
              <TableCell align="center">Ville</TableCell>
              <TableCell align="center">Téléphone</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const isEditing = user.id === editId
              return (
                <TableRow id={user.id} key={user.id}>
                  <TableCell>
                    {isEditing ?
                      <TextField
                        sx={{ minWidth: "150px" }}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        size="small"
                        aria-label="Nom utilisateur"
                      />
                      :
                      user.name
                    }
                  </TableCell>

                  <TableCell align="center">
                    {isEditing ? (
                      <Checkbox
                        checked={actif}
                        onChange={(e) => setActif(e.target.checked)}
                        icon={<DoNotDisturbAltIcon sx={{ fill: theme.palette.error.main }} />}
                        checkedIcon={<CheckCircleIcon sx={{ fill: theme.palette.success.main }} />}

                      />
                    ) : user.actif ? (
                      <CheckCircleIcon sx={{ fill: theme.palette.success.main }} aria-label="Actif" />
                    ) : (
                      <DoNotDisturbAltIcon sx={{ fill: theme.palette.error.main }} aria-label="Inactif" />
                    )}
                  </TableCell>

                  <TableCell align="center">
                    {isEditing ? (
                      <TextField
                        select
                        value={abonnementType}
                        onChange={(e) => setAbonnementType(e.target.value)}
                        size="small"
                        sx={{ minWidth: 140 }}
                        aria-label="Type d'abonnement"
                      >
                        <Divider />
                        <MenuItem value={" "} sx={{ color: "gray" }}>Aucun</MenuItem>
                        <MenuItem value="Découverte">Découverte</MenuItem>
                        <MenuItem value="Passion">Passion</MenuItem>
                      </TextField>
                    ) : user.abonnementType ? (
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        sx={{
                          bgcolor: "primary.main",
                        }}
                        aria-label={`Abonnement ${user.abonnementType}`}
                      >
                        {user.abonnementType}
                      </Button>
                    ) : (
                      <DoNotDisturbAltIcon sx={{ fill: theme.palette.error.main }}
                        aria-label="Aucun abonnement" />
                    )}
                  </TableCell>

                  <TableCell align="center">
                    {isEditing ?
                      <TextField
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        size="small"
                        aria-label="Email"
                      />
                      :
                      user.email
                    }
                  </TableCell>

                  <TableCell sx={{ minWidth: "150px" }}>
                    {isEditing ? <TextField
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      size="small" aria-label="Adresse" />
                      :
                      user.address
                    }
                  </TableCell>
                  <TableCell sx={{ minWidth: "110px" }}>
                    {isEditing ? <TextField
                      value={postalCode}
                      onChange={e => setPostalCode(e.target.value)} size="small"
                      aria-label="Code Postal"
                    />
                      :
                      user.postalCode
                    }
                  </TableCell>
                  <TableCell sx={{ minWidth: "150px" }}>
                    {isEditing ? <TextField
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      size="small"
                      aria-label="Ville"
                    />
                      :
                      user.country}
                  </TableCell>
                  <TableCell sx={{ minWidth: "150px" }}>
                    {isEditing ?
                      <TextField
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        size="small"
                        aria-label="Téléphone"
                      />
                      :
                      user.phone
                    }
                  </TableCell>
                  <TableCell align="center">
                    {isEditing ? (
                      <Box display={"flex"} gap={"20px"}>
                        <CheckCircleIcon
                          onClick={() => saveEdit(user)}
                          sx={{ cursor: "pointer", fill: theme.palette.success.main }}
                          aria-label="Enregistrer les modifications"
                        />
                        <CancelIcon
                          onClick={cancelEdit}
                          sx={{ cursor: "pointer", fill: theme.palette.error.main }}
                          aria-label="Annuler la modification"
                        />
                      </Box>
                    ) : (
                      <Box display={"flex"} gap={"20px"}>
                        <ModeEditIcon
                          onClick={() => startEdit(user)}
                          sx={{ cursor: "pointer", fill: theme.palette.primary.main }}
                          aria-label={`Modifier ${user.name}`}
                        />
                        <DeleteForever
                          onClick={(e) => setConfirmDelete(user)}
                          sx={{ cursor: "pointer", fill: theme.palette.error.main }}
                          aria-label={`Supprimer ${user.name}`}
                        />
                      </Box>
                    )}
                  </TableCell>


                </TableRow>
              )
            }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

