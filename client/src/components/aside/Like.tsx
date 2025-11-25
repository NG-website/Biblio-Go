import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,

} from "@mui/material";
import Book from "../acceuil/Book";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

interface Author {
  id: number;
  firstname: string;
  lastname: string;
}

interface BookType {
  id: number;
  name: string;
  stock: number;
  Author: Author;
}

interface LikeBook {
  id: number;
  Book: BookType;
}

function Like() {
  const { user } = useAuthContext()
  const userId = user? user?.userId : null;
  const [likeBooks, setLikeBooks] = useState<LikeBook[]>([]);
  const [back, setBack] = useState()
  const navigate = useNavigate()

  useEffect(() => {

    fetch(`http://localhost:3000/api/like/all`, {
      credentials: "include",
    })
      .then((res) => { return res.json() })
      .then((data) => {
        setLikeBooks(data)

      })
      .catch((err) => console.error("Erreur récupération historique :", err));

  }, []);


  const soonAvailable = (bookId) => {

    if (bookId) {
      fetch("http://localhost:3000/api/bookuser/dispo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: bookId })
      })
        .then((res) => { return res.json() })
        .then((data) => {
          const nextBack = (data.sort((a, b) => new Date(a.deposit_at) - new Date(b.deposit_at))[0].deposit_at)
          const incrementeDate = new Date(nextBack)
          const resultBack = incrementeDate.setDate(incrementeDate.getDate() + 1)
          setBack(resultBack)

        })
      return new Date(back!).toLocaleDateString("fr")
    }

  }

  return (
    <>
      <Typography
        variant="h2"
        textAlign="center"
        gutterBottom>
        Mes envies
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 3,
          p: 2,
          justifyContent: "center"
        }}
      >
        {likeBooks.length === 0 ? (
          <Typography
            color="text.primary"
            textAlign="center">
            Aucun livre ajouté à vos envies
          </Typography>
        ) : (
          likeBooks.map((d, i) => (
            <Card
              aria-label="Voir les détails du livre"
              onClick={() => navigate(`/book/${d.Book?.id}`)}
              key={i}
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                overflow: "hidden",
                bgcolor: d.Book.stock === 0 ? "rgba(255, 255, 255, 0.5)" : "white",
                minHeight: "340px",
                width: "180px"
              }}
            >
              <CardContent>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                >

                  <Stack
                    direction="column"
                    alignItems="center"
                    spacing={2}
                    sx={{ maxWidth: "150px", height: "300px" }}
                  >
                    <Book
                      aria-label={`Couverture du livre ${d.Book.name}`}
                      name={d.Book!.name} />
                    <Box
                      height={"100%"}
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"space-between"}
                      alignItems={"center"}

                    >

                      <Link to={`/author/${d.Book.Author.id}`}>
                        <Typography
                          aria-label={`Voir la page de l'auteur ${d.Book.Author.firstname} ${d.Book.Author.lastname}`}
                          textAlign={"center"}
                          onClick={(e) => { e.stopPropagation(); navigate(`/author/${d.Book.Author.id}`) }}
                          variant="body2"
                        >
                          Auteur : {d.Book.Author.firstname + " " + d.Book.Author.lastname}
                        </Typography>
                      </Link>


                      <Box
                        sx={{
                          textAlign: "center",
                          bgcolor: d.Book.stock === 0 ? "warning.light" : "primary.main",
                          px: 1, py: 0.5,
                          borderRadius: 1
                        }}
                      >
                        <Typography
                          variant="caption"
                          aria-label={
                            d.Book.stock === 0
                              ? `Livre indisponible`
                              : `Livre disponible`
                          }

                        >
                          {d.Book.stock === 0 ? `Retour le ${soonAvailable(d.Book.id)}` : `Stock disponible : ${d.Book.stock}`}
                        </Typography>

                      </Box>
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </>
  );
}

export default Like;
