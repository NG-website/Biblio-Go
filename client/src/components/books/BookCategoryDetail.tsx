import { useEffect, useState } from "react"
import Book from "../acceuil/Book"
import { useParams } from "react-router-dom"
import theme from "../../theme"
import { Box, Typography } from "@mui/material";
import { API_URL } from "../../config";


function CategoryDetails() {
    const url = useParams()
    console.log(url)
    const [data, setData] = useState()
    useEffect(() => {
        fetch(`${API_URL}api/book/${url.cat}`)
            .then((res) => {return res.json() })
            .then((data) => {setData(data) })
    }, [])
    return (
<>
  <Typography 
    variant="h2" 
    sx={{ mt: 2, color: theme.palette.primary.main }}
  >
    {url.cat}
  </Typography>

  <Box
    sx={{
      display: "flex",
      gap: 2,        
      flexWrap: "wrap",
      p: 2,           
      justifyContent: "center",
    }}
  >
    {data && data.map((d, i) => (
      <Book 
        id={d.id} 
        seeTitle={true} 
        click={true} 
        key={i} 
        name={d.name} 
      />
    ))}
  </Box>
</>

    )
}
export default CategoryDetails