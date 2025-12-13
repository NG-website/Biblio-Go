import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import Book from "../acceuil/Book";
import { useAuthContext } from "../Context/AuthContext";
import theme from "../../theme";
import { API_URL } from "../../config";

function Historical() {
  const { user } = useAuthContext()
  const userId = user ?user?.userId : null;
  const token = user?.user?.token
  const [historical, setHistorical] = useState([]);
  const [livreSelected, setLivreSelected] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const abonnement = user ? user?.abonnementType : null
  const [isBack, setIsBack] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    if (userId) {
      fetch(`${API_URL}api/bookuser/id`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({id:userId})
      })
        .then((res) => res.json())
        .then((data) => {
          const sort = data.sort((a, b) => new Date(b.deposit_at) - new Date(a.deposit_at))
          const historised = sort.map(element => ({
            isReturned: element.deposit === true,
            isLate: new Date(element.deposit_at) < new Date()
          }));
          console.log(historised)
          setIsBack(historised)
          setHistorical(sort)
        })
        .catch((err) => console.error("Erreur récupération historique :", err));
    }
  }, [userId, reload]);

  const alreadyExtendBorrow = []
  historical.forEach(element => {
    alreadyExtendBorrow.push(element.updateDeposit === true)
  });

  const extendBorrow = (e) => {
    const newDate =
      e.currentTarget.parentElement.querySelector("input[type=date]")?.value;
    setMessage("");

    if (!newDate) {
      setMessage("Merci de renseigner une date.");
      setTimeout(() => {
        setMessage("")
      }, 3000)
      return;
    }

    const dateNow = new Date();
    const dateMax = new Date(dateNow);
    dateMax.setDate(dateNow.getDate() + 31);
    const newDepositAt = new Date(newDate);

    if (newDepositAt > dateMax) {
      setMessage("La prolongation ne peut pas dépasser 31 jours.");
      setTimeout(() => {
        setMessage("")
      }, 3000)
      return;
    }


    const id = { bookId: e.currentTarget.dataset.id };
    const data = { deposit_at: newDepositAt, updateDeposit: true };

    fetch(`${API_URL}api/bookuser/update`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
       },
      body: JSON.stringify({  data, id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data[0] === 1) {
          setLivreSelected(null)
          setReload(true)
        }
      });
  };

  const changeDateDeposit = (e) => {
    setLivreSelected(Number(e.currentTarget.dataset.index));
    setMessage("");
  };

  // const soonBorrow = (e) => {
  //   console.log(e.target.dataset.id)
  //   console.log("soonBorrow")
  //   console.log(e.currentTarget.parentElement.querySelector("input[type=date]")?.value)
  //   console.log(livreSelected)
  //   console.log(historical[livreSelected!].deposit_at)
  //   console.log(e.currentTarget.parentElement.querySelector("input[type=date]")?.value <= historical[livreSelected!].deposit_at)
  //   fetch(`${API_URL}api/bookuser/update`,{
  //     method:"PUT",
  //     credentials:"include",
  //     headers:{"Content_Type":"application/json"},
  //     body:JSON.stringify({data :{deposit_at: "2025-12-27T17:00:00.000Z"},id:{bookId : e.target.dataset.id }})
  //   })
  // }
  return (
    <Box
      sx={{
        width: { xs: "90%", md: "70%" },
        mx: "auto",
        mt: 5,
        display: "flex",
        flexDirection: "column",
        gap: 3,

      }}
    >
      <Typography
        variant="h2"
        textAlign="center"
        gutterBottom
      >
        Historique de mes emprunts
      </Typography>

      {historical.length === 0 ? (
        <Typography
          color="text.secondary"
          textAlign="center"
        >
          Aucun livre emprunté pour le moment
        </Typography>
      ) : (
        historical.map((d, i) => (
          <Card
            key={i}
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              overflow: "hidden",
              bgcolor:
                isBack[i].isReturned ?
                  "rgba(111, 111, 111, 0.22)"
                  :
                  isBack[i].isLate ?
                    "error.main"
                    :
                    "secondary.main",
            }}
          >
            <CardContent>

              <Typography
                textAlign={"center"}
                variant="h3">
                {isBack[i].isLate ? "En Retard" : ""}
              </Typography>

              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
              >

                <Stack
                  direction={{ xs: "column", md: "row" }}
                  alignItems="center"
                  spacing={2}
                >
                  <Book
                    seeTitle={false}
                    name={d.Book!.name}
                  />
                  <Box>
                    <Typography
                      aria-label={`titre du livre ${d.Book.name}`}
                      textAlign={{ xs: "center", md: "left" }}
                      variant="h3"
                      color="text.primary"
                      >
                        {d.Book.name}
                      
                    </Typography>
                    <Typography
                      aria-label={`nom de l'auteur ${d.Book.Author.firstname + " " + d.Book.Author.lastname}`}
                      textAlign={{ xs: "center", md: "left" }}
                      variant="body2"
                      color="text.secondary">
                      Auteur : {d.Book.Author.firstname + " " + d.Book.Author.lastname}
                    </Typography>
                  </Box>
                </Stack>

                <Stack
                  spacing={1}
                  textAlign={{ xs: "center", md: "right" }}
                  alignItems={{ xs: "", md: "flex-start" }}
                  minWidth={"37%"}
                >

                  {isBack[i].isReturned ?
                    <Typography
                      variant="body2"
                    color="text.primary"
                    >
                      Retrait fait le: {" "}
                      <strong style={{color:theme.palette.text.primary}}>
                        {new Date(d.take_at).toLocaleDateString("fr-FR")}
                      </strong>
                    </Typography>
                    :
                    <Typography 
                    color="text.primary" 
                    variant="body2"
                    >
                      Retrait prévu :{" "}
                      <strong style={{color:theme.palette.text.primary}}>
                        {new Date(d.take_at).toLocaleDateString("fr-FR")}
                      </strong>
                    </Typography>}
                  {isBack[i].isReturned ? 
                  <Typography 
                  color="text.primary"
                  variant="body2">
                    Retour fait le : {" "}
                    <strong style={{color:theme.palette.text.primary}}>
                      {new Date(d.deposit_at).toLocaleDateString("fr-FR")}
                    </strong>
                  </Typography>
                  : 
                  <Typography
                  color="text.primary"
                   variant="body2"
                   >
                    Retour prévu :{" "}
                    <strong style={{color:theme.palette.text.primary}}>
                      {new Date(d.deposit_at).toLocaleDateString("fr-FR")}
                    </strong>
                  </Typography>}

                  {livreSelected === i && (
                    <>
                      <TextField
                        aria-label="Sélection de la nouvelle date de retour"
                        type="date"
                        size="small"
                        sx={{ mt: 1 }}
                        inputProps={{
                          min: new Date().toISOString().split("T")[0],
                        }}
                      />
                      {message && (
                        <Typography
                          aria-label={`message d'erreur ${message}`}
                          variant="body2"
                          color="error"
                          sx={{ mt: 1 }}
                        >
                          {message}
                        </Typography>
                      )}
                    </>
                  )}
                  {abonnement === "Passion" ? (
                    isBack[i].isLate ? (
                      null
                    ) :
                      !alreadyExtendBorrow[i] ? (
                        <Button
                          aria-label="prolonger la date d'emprunt du livre"
                          variant={livreSelected === i ? "contained" : "outlined"}
                          color="primary"
                          data-index={i}
                          data-id={d.Book.id}
                          onClick={livreSelected === i ? extendBorrow : changeDateDeposit}
                          sx={{ mt: 1 }}
                        >
                          {livreSelected === i
                            ? "Valider la prolongation"
                            : "Prolonger l'emprunt"}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mt: 1, cursor: "auto", mx: "auto" }}
                          aria-label="Date déjà prolongée, action impossible"
                        >
                          Livre déjà prolongé
                        </Button>
                      )
                  ) : null}
                  {/* <Button
                    aria-label="rendre plus tot"
                    variant={livreSelected === i ? "contained" : "outlined"}
                    color="primary"
                    data-index={i}
                    data-id={d.Book.id}
                    onClick={livreSelected === i ? soonBorrow : changeDateDeposit}
                    sx={{ mt: 1 }}
                  >
                    {livreSelected === i
                      ? "Valider"
                      : "rendre plus tot"}
                  </Button> */}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

export default Historical;