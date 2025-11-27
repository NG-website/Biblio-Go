import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Book from "../acceuil/Book.js"
import { Box, Divider, Stack, Typography } from "@mui/material"
import { API_URL } from "../../config.js"

function AuthorDetails() {
  const authorId = useParams()
  console.log("author",authorId)
  const [authorDetails, setAuthorDetails] = useState([])
  const [authorBook, setAuthorBook] = useState([])

  useEffect(() => {
    fetch(`${API_URL}api/author/id`, {
      method: "POST",
      credentials:"include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: parseInt(authorId.id) })
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => { setAuthorDetails(data) })

    fetch(`${API_URL}api/book/author`, {
      method: "POST",
      credentials:"include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(authorId)
    })
      .then((res) => { return res.json() })
      .then((data) => { setAuthorBook(data) })
  }, [authorId])
  return (
    <Box
      sx={{
        my: "auto",
        p: { xs: 2, md: 4 },
        width: "90%",
        mx: "auto",
        bgcolor: "background.paper",
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h2"
        color="text.primary"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
      >
       rferfref
      </Typography>

      {authorDetails.description && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, textAlign: "center", lineHeight: 1.6 }}
        >
        efefzefez
        </Typography>
      )}

      <Divider sx={{ mb: 3 }} />

      <Typography
        variant="h3"
        color="text.primary"
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
        {/* {authorBook &&
          authorBook.map((data, index) => (
            <Book click={true} key={index} id={data.id} name={data.name} />
          ))} */}
      </Stack>
    </Box>
  )
}
export default AuthorDetails