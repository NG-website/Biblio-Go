import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Book from "../acceuil/Book.js"
import { Box, Divider, Stack, Typography } from "@mui/material"

function AuthorDetails() {
    const authorId = useParams()
    const [authorDetails, setAuthorDetails] = useState([])
    const [authorBook, setAuthorBook] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3000/author/id`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(authorId)
        })
            .then((res) => {
                if (!res.ok) {
                    console.log("then", res)
                }
                return res.json()
            })
            .then((data) => {
                setAuthorDetails(data)
            })

        fetch(`http://localhost:3000/book/author`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(authorId)
        })
            .then((res) => {
                if (!res.ok) {
                    console.log("then", res)
                }
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setAuthorBook(data)
            })
    }, [])
    return (
    <Box
      sx={{
        my:"auto",
        p: { xs: 2, md: 4 },
        width: "90%",
        mx: "auto",
        bgcolor: "background.paper",
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
        
      {/* Nom de l'auteur */}
      <Typography
        variant="h3"
        color="primary"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
      >
        {authorDetails.name}
      </Typography>

      {/* Description */}
      {authorDetails.description && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, textAlign: "center", lineHeight: 1.6 }}
        >
          {authorDetails.description}
        </Typography>
      )}

      <Divider sx={{ mb: 3 }} />

      {/* Bibliographie */}
      <Typography
        variant="h5"
        color="primary"
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        Bibliographie
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}

        flexWrap="wrap"
        justifyContent="center"
        gap={2}
        mx={"auto"}
      >
        {authorBook &&
          authorBook.map((data, index) => (
            <Book click={true} key={index} id={data.id} name={data.name} />
          ))}
      </Stack>
    </Box>

    )
}
export default AuthorDetails