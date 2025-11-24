import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Stack,
  Avatar,
  MenuItem,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";


import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import theme from "../../../theme";
import InputDate from "../../date/InputDate";

interface AddBorrowProps {
  open: boolean;
  close: (value: boolean) => void;
}

function AddBorrow({ open, close }: AddBorrowProps) {
  const [bookList, setBookList] = useState<any[]>([]);
  const [userList, setUserList] = useState<any[]>([]);
  const [bookSelected, setBookSelected] = useState<string>("");
  const [userSelected, setUserSelected] = useState<string>("");
  const [takeAt, setTakeAt] = useState<Date | null>(new Date());
  const [depositAt, setDepositAt] = useState<Date | null>(new Date());
  const [alerte, setAlerte] = useState("");
  const [preview, setPreview] = useState("");


  useEffect(() => {
    fetch("http://localhost:3000/api/book/all")
      .then((res) => res.ok && res.json())
      .then((data) => setBookList(data))
      .catch(console.error);

    fetch("http://localhost:3000/api/user/all")
      .then((res) => res.ok && res.json())
      .then((data) => {
        console.log(data)
        setUserList(data)
      })
      .catch(console.error);
  }, []);


  useEffect(() => {
    if (bookSelected) {
      setPreview(`http://localhost:3000/api/uploads/book/${bookSelected.name}.jpg`);
    } else {
      setPreview("");
    }
  }, [bookSelected, userSelected]);

  const registerBorrow = () => {


    if (!bookSelected || !userSelected || !takeAt || !depositAt) {
      setAlerte("Merci de remplir tous les champs");
      return;
    }


    fetch("http://localhost:3000/api/bookuser/id", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userSelected.id }),
    })
      .then((res) => { if (res.ok) { return res.json() } })
      .then((data) => {
        if (data) {
          console.log(typeof data.length)
          if (userSelected.abonementType === "Passion" && data.length > 9) {
            console.log("a")
            return setAlerte("l utilisateur ne peut pas reserver plus de livre")
          }
          if (userSelected.abonementType === "Découverte" && data.length > 3) {
            return setAlerte("l utilisateur ne peut pas reserver plus de livre")
          }
        } else {
          setAlerte("Erreur lors de l'enregistrement");
        }
      })



    const now = new Date();
    const minDate = new Date(now);
    minDate.setHours(minDate.getHours() + 2);

    if (takeAt < minDate) {
      setAlerte("La date de retrait doit être au moins dans 2 heures");
      return;
    }

    if (depositAt < takeAt) {
      setAlerte("La date de dépôt doit être postérieure à la date de retrait");
      return;
    }

    const maxDeposit = new Date(takeAt);
    maxDeposit.setDate(maxDeposit.getDate() + 31);
    if (depositAt > maxDeposit) {
      setAlerte("La durée d'emprunt ne peut pas dépasser 31 jours");
      return;
    }

    const data = {
      bookName: bookSelected.name,
      bookId: bookSelected.id,
      userId: userSelected.id,
      userEmail: userSelected.email,
      take_at: takeAt,
      deposit_at: depositAt,
    };

    fetch("http://localhost:3000/api/bookuser/create", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {

        if (res.status === 401) { return setAlerte("ce livre est déjà emprunter par cette utilisateur"); }
        if (res.ok && res.status === 201) { return res.json() }
      })
      .then((data) => {
        console.log(data)
        if (data) {
          setAlerte("Emprunt enregistré avec succès");
          setBookSelected("");
          setUserSelected("");
          setTakeAt(new Date());
          setDepositAt(new Date());
          setTimeout(() => {
            setAlerte("");
            close(false);
          }, 2500);
        }
      })
      .catch(() => setAlerte("Erreur de connexion au serveur"));
  };

  return (
    <Dialog open={open} sx={{
      "& .MuiDialog-paper": {
        width: { xs: "80%", md: "50%" },
        maxWidth: "none",
      }
    }}>
      <DialogTitle sx={{ backgroundColor: "primary.main" }}>
        Ajouter un emprunt
        <IconButton
          aria-label="Fermer la fenêtre d'ajout d'emprunt"
          onClick={() => close(false)}
          sx={{ position: "absolute", right: 8, top: 8 }}
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
          <Stack alignItems="center" mt={2} width={"100%"}>
            <Avatar
              src={preview}
              alt="Aperçu du livre sélectionné"
              sx={{ width: 120, height: 120, mb: 1 }}

            />
          </Stack>

          <TextField
            select
            label="Livre"
            aria-label="Sélection du livre à emprunter"
            value={bookSelected ? bookSelected.id : ""}
            fullWidth
            onChange={(e) => {
              setBookSelected(bookList.filter((b) => b.id === e.target.value)[0]);
              setAlerte("");
            }}
            required
            sx={{ maxWidth: { xs: "100%", md: "48%" } }}
            SelectProps={{
              MenuProps: {
                sx: { "& .MuiList-root": { color: "text.primary" } },
                PaperProps: {
                  sx: { maxHeight: 200, maxWidth: 300 }
                }
              }
            }}
          >
            {bookList.map((book, i) => (
              <MenuItem key={i}
                value={i + 1}>
                {book.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Utilisateur"
            aria-label="Sélection de l'utilisateur emprunteur"
            value={userSelected ? userSelected?.id : ""}
            fullWidth
            onChange={(e) => {
              setUserSelected(userList.filter((d) => d.id === (e.target.value))[0]);
              setAlerte("");
            }}
            required
            sx={{ maxWidth: { xs: "100%", md: "48%" }, }}
            SelectProps={{
              MenuProps: {
                sx: { "& .MuiList-root": { color: "text.primary" } },
                PaperProps: {
                  sx: { maxHeight: 200, maxWidth: 300 }
                }
              }
            }}
          >
            {userList.map((user, i) => (
              <MenuItem
                key={i}
                value={i + 1}
              >
                {user.name}
              </MenuItem>
            ))}
          </TextField>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              color: "red"
            }}
          >
            <Box
              sx={{ width: { xs: "100%", md: "48%" } }}>
              <Typography
                color="text.primary"
                fontWeight="bold"
              >Date de retrait
              </Typography>
              <InputDate
                date={takeAt}
                setDate={setTakeAt}
                width={"100%"}
              />
            </Box>

            <Box sx={{ width: { xs: "100%", md: "48%" } }}>
              <Typography
                fontWeight="bold"
                color="text.primary"
              >
                Date de dépôt
              </Typography>
              <InputDate
                date={depositAt}
                setDate={setDepositAt}
                width={"100%"}
              />
            </Box>
          </Box>

          {alerte && (
            <Alert

              severity={
                alerte.includes("succès") || alerte.includes("enregistré")
                  ? "success"
                  : "warning"
              }
              sx={{
                minWidth: "100%",
                justifyContent: "center",
                backgroundColor: theme.palette.primary.main
              }}
            >
              {alerte}
            </Alert>
          )}

          <Button
            aria-label="Enregistrer l'emprunt"
            sx={{ maxWidth: { xs: "100%", md: "40%" } }}
            onClick={registerBorrow}
            variant="contained"
            color="primary"
          >
            Enregistrer <DoneIcon sx={{ ml: 1 }} />
          </Button>

        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddBorrow;
