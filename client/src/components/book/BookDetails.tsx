import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Typography,
  Stack,
  Box,
  Divider,
  Alert,
} from "@mui/material";

import Calendar from "./Calendar";
import Rating from "./Rating";
import DigitalClockValue from './Hours';
import { useAuthContext } from "../Context/AuthContext";

import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import theme from "../../theme";
import { API_URL } from "../../config";


function BookDetails() {
  const navigate = useNavigate();

  
  const { user } = useAuthContext()
  const userId = user ? user.userId : null;
  const abonnement = user ? user.abonnementType : null
  const [openBorrow, setOpenBorrow] = useState<boolean>(false)
  const [takeAt, setTakeAt] = useState<Date | null>(null);
  const [depositAt, setDepositAt] = useState<Date | null>(null);
  const [booking, setBooking] = useState(0);
  const [book, setBook] = useState<any>({});
  const [back, setBack] = useState()
  const [like, setLike] = useState(false);
  const [message, setMessage] = useState("");
  const [alreadyBorrow, setAlreadyBorrow] = useState(false);
  const param = useParams()
  const [bookId, setBookId] = useState(param.id);


  useEffect(() => {
    setBookId(param.id)
    fetch(`${API_URL}api/book/id`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: bookId }),
    })
      .then((res) => { return res.json() })
      .then((data) => { setBook(data); })
      .catch(console.error);

    if (userId) {
      fetch(`${API_URL}api/bookuser/id`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => { return res.json() })
        .then((data) => {
          if (data.filter((d) => d.bookId === book.id)[0]) {
            setAlreadyBorrow(true)
          }
          setBooking(data.length);
        })
        .catch(console.error);

      fetch(`${API_URL}api/like/id`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id:userId, bookId: bookId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setLike(data);
          }
        })
        .catch(console.error);
    }
  }, [booking, userId, bookId]);

  const incrementHour = (date: Date, setDate: (d: Date) => void) => {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + 30);
    setDate(newDate);
  };

  const decrementHour = (date: Date, setDate: (d: Date) => void) => {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() - 30);
    setDate(newDate);
  };

  const soonAvailable = (bookId) => {

    fetch(`${API_URL}api/bookuser/dispo`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId: bookId })
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((data) => {
        console.log(!data)
        if (data[0]) {
          const nextBack = (data.sort((a, b) => new Date(a.deposit_at) - new Date(b.deposit_at))[0].deposit_at)
          const incrementeDate = new Date(nextBack)
          const resultDate = incrementeDate.setDate(incrementeDate.getDate() + 1)
          setBack(resultDate)
        }
      })
    return new Date(back!).toLocaleDateString("fr")
  }

  const registerBorrow = (e: React.FormEvent) => {
    e.preventDefault();

    if (!takeAt || !depositAt) {
      setMessage("Vous n'avez pas sélectionné une date de retrait et une date de dépôt.");
      return;
    }

    const dateMin = new Date();
    dateMin.setHours(dateMin.getHours() + 2);
    if (takeAt < dateMin) {
      setMessage("Le livre ne sera pas disponible avant 2h.");
      setTimeout(() => {
        setMessage("")
      }, 3000)
      return;
    }

    if (depositAt < new Date()) {
      setMessage("La date de dépôt ne peut pas être aujourd'hui.");
      setTimeout(() => {
        setMessage("")
      }, 3000)
      return;
    }

    const dateMax = new Date(takeAt);
    dateMax.setDate(dateMax.getDate() + 31);

    if (depositAt > dateMax) {
      setMessage("La date de dépôt ne peut pas dépasser 31 jours après le retrait.");
      setTimeout(() => {
        setMessage("")
      }, 3000)
      return;
    }
    if (depositAt < takeAt) {
      setMessage("La date de retrait ne peut pas être antérieure à la date de dépôt.");
      setTimeout(() => {
        setMessage("")
      }, 3000)
      return;
    }

    const createBooking = () => {
      fetch(`${API_URL}api/bookuser/create`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          take_at: takeAt,
          deposit_at: depositAt,
          bookId: bookId,
          bookName: book.name,
        }),
      })
        .then((res) => {
          if (res.status === 401) {
            res.json()
            setMessage("vous avez déjà réservé ce livre et vous ne l'avez pas encore rendu")
            setTimeout(() => {
              setMessage("")
            }, 3000)
          }
          if (res.status === 201) {

            fetch(`${API_URL}api/book/update`, {
              method: "PUT",
              credentials: "include",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({ data: { stock: book.stock - 1, emprunt: book.emprunt + 1 }, id: { id: bookId } }),
            })
              .then((res) => {
                return res.json()
              })
              .then((data) => {
                console.log(data)
                if (data[0] == 1) {

                  setMessage("Votre réservation est confirmée.");
                  setTimeout(() => {
                    setMessage("")
                    setBooking(0)
                    setOpenBorrow(false)
                    setAlreadyBorrow(true)
                  }, 3000)
                }
              })
          }
          if (res.status === 500) {
            setMessage("Votre réservation ne peut pas aboutir. Réessayez plus tard !");
            setTimeout(() => {
              setMessage("")
            }, 3000)
          }
        })
        .catch(console.error);
    };

    if (abonnement === "Découverte") {
      booking < 3 ?
        createBooking()
        :
        setMessage("Vous ne pouvez pas réserver plus de livres");
      setTimeout(() => {
        setMessage("")
      }, 3000);
    } else if (abonnement === "Passion") {
      booking < 9 ?
        createBooking()
        :
        setMessage("Vous ne pouvez pas réserver plus de livres");
      setTimeout(() => {
        setMessage("")
      }, 3000)
    }
  };

  const Like = () => {
    fetch(`${API_URL}api/like/create`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id:userId, bookId: bookId }),
    })
      .then((res) => { return res.json() })
      .then((data) => {
        if (data === true) {
          setLike(true)
        }
      })
  };

  const UnLike = () => {
    setLike(false);
    fetch(`${API_URL}api/like/delete`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id:userId, bookId: bookId }),
    })
      .then((res) => { return res.json() })
      .then((data) => {
        if (data === true) {
          setLike(false)
        }
      })
  };

  return (
    <Box
      sx={{
        width: "90%",
        height: { xs: "auto", md: "auto" },
        mx: "auto",
        pb: 5,
        mt: 5,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 3
      }}
      role="main"
      aria-label={`Détails du livre ${book.name}`}
    >
      <Card
        sx={{
          minHeight: { xs: "300px", md: "100%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        aria-label={`Image du livre ${book.name}`}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundImage: `url("${API_URL}api/uploads/book/${book.name}.jpg")`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      </Card>

      <Card
        sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        {
          userId && like ? (
            <FavoriteIcon
              onClick={UnLike}
              aria-label="Retirer des favoris"
              sx={{ cursor: "pointer" , fill:theme.palette.primary.main}}
            />
          ) : userId && !like ? (
            <FavoriteBorderIcon
              onClick={Like}
              aria-label="Ajouter aux favoris"
              sx={{ cursor: "pointer" , fill:theme.palette.primary.main}}
            />
          ) : null}


        <Typography
          variant="h2"
          textAlign="center"
          id="book-title"
          color="text.primary"
        >
          {book.name}
        </Typography>

        <Link
          to={`/author/${book.Author?.id}`}
          aria-label={`Voir la page de l'auteur ${book.Author?.firstname} ${book.Author?.lastname}`}
        >
          <Typography
            variant="h3"
            color="text.secondary"
            textAlign="center"
          >
            Auteur : {book.Author?.firstname + " " + book.Author?.lastname || "Inconnu"}
          </Typography>
        </Link>

        <Box sx={{ display: "flex", justifyContent: "center", "& .MuiSvgIcon-root":{fill: theme.palette.primary.main}}}>
          <Rating
            value={book.note || 5}
            aria-label={`Note du livre ${book.note || 5}`}
            
          />
        </Box>

        <Divider />

        {user == null ? (
          <Button
            onClick={() => navigate("/login")}
            variant="contained"
            aria-label="Réserver ce livre"
          >
            Réserver votre livre en ligne
          </Button>
        ) : userId && !abonnement ? (
          <Button
            onClick={() => navigate("/subscription")}
            variant="contained"
            aria-label="Réserver ce livre"
          >
            Réserver votre livre en ligne
          </Button>
        ) : alreadyBorrow ? (
          <Button
            variant="contained"
            color="primary"
            aria-label="Réserver ce livre"
          >
            Vous avez réservé ce livre
          </Button>)
          : !openBorrow && userId && abonnement && book.stock === 0 ? (
            <Button
              variant="contained"
              color="primary"
              aria-label="Livre indisponible"
            >
              Actuellement indisponible avant le {soonAvailable(book.id)}
            </Button>

          ) : !openBorrow && userId && abonnement ? (
            <Button
              onClick={() => setOpenBorrow(true)}
              variant="contained"
              color="primary"
              endIcon={<AddIcon  />}
              aria-label="Réserver ce livre"
            >
              Réserver ce livre
            </Button>) : ""
        }
        {openBorrow ?
          <form style={{ width: "100%" }}
            onSubmit={registerBorrow}
            aria-label="Formulaire de réservation du livre"
          >
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack sx={{ width: "45%" }}>
                <Typography color="text.primary">Date de retrait</Typography>
                <Calendar
                  aria-label="Sélectionner la date de retrait"
                  onChange={(e) => { 
                    setMessage(""); 
                    setTakeAt(new Date(e.$y, e.$M, e.$D, new Date().getHours() + 2)) }} 
                    />
              </Stack>

              <Stack sx={{ width: "45%" }}>
                <Typography color="text.primary">Date de dépôt</Typography>
                <Calendar
                  aria-label="Sélectionner la date de dépôt"
                  onChange={(e) => { 
                    setMessage(""); 
                    setDepositAt(new Date(e.$y, e.$M, e.$D, new Date().getHours())) }}
                />
              </Stack>
            </Stack>

            {takeAt && (
              <Box
                mt={2}
                sx={{ display: "flex" }}>
                <Box
                  sx={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <KeyboardArrowUpIcon
                    onClick={() => decrementHour(takeAt!, setTakeAt)}
                    aria-label="Décrémenter l'heure de retrait"
                    sx={{fill:theme.palette.text.primary}}
                  />
                  <DigitalClockValue
                    date={takeAt!} setDate={setTakeAt}
                    aria-label="Heure de retrait"
                  />
                  <KeyboardArrowDownIcon
                    onClick={() => incrementHour(takeAt!, setTakeAt)}
                    aria-label="Incrémenter l'heure de retrait"
                    sx={{fill:theme.palette.text.primary}}
                  />
                </Box>
                {depositAt && (
                  <Box
                    sx={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <KeyboardArrowUpIcon
                      onClick={() => decrementHour(depositAt!, setDepositAt)}
                      aria-label="Décrémenter l'heure de dépôt"
                      sx={{fill:theme.palette.text.primary}}
                    />
                    <DigitalClockValue
                      date={depositAt!}
                      setDate={setDepositAt}
                      aria-label="Heure de dépôt"
                    />
                    <KeyboardArrowDownIcon
                      onClick={() => incrementHour(depositAt!, setDepositAt)}
                      aria-label="Incrémenter l'heure de dépôt"
                      sx={{fill:theme.palette.text.primary}}
                    />
                  </Box>
                )}
              </Box>
            )}
            {message && (
              <Alert
                sx={{
                  mt: message === "Votre réservation est confirmée." ? 5 : 2,
                  justifyContent: "center"
                }}
                severity={!message.includes("pas") ? "success" : "warning"}
                role="alert"
              >
                {message}
              </Alert>
            )}
            <Box
              textAlign="center"
              mt={3}
              sx={{ display: message === "Votre réservation est confirmée." ? "none" : "" }}
            >
              <Button
                onClick={(e) => registerBorrow(e)}
                variant="contained"
                color="primary"
                endIcon={<AddIcon />}
                aria-label="Comfirmer la reservation de ce livre"
              >
                Réserver ce livre
              </Button>
            </Box>
          </form> : null
        }

        <Divider />

        <Box
          minHeight={"auto"}
          mt={2}
          aria-label="Description du livre">
          <Typography
            variant="h4"
            fontWeight={500}
             color="text.primary"
          >
            Description
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {book.description ? book.description : "Aucune description pour le moment"}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

export default BookDetails;
