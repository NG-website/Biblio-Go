import { Link } from "react-router-dom";
import { Box, Typography, Button, useTheme } from "@mui/material";

const NotFound=()=>{
  const theme = useTheme()
return (
    <Box
    component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width:"100vw",
        textAlign: "center",
        bgcolor: "background.default",
        color: "text.primary",
        p: 3,
      }}
    >
      <Typography 
      variant="h1" 
      color="black" 
      sx={{ fontWeight: 700, fontSize: { xs: "6rem", md: "80px" } }}>
        404
      </Typography>
      <Typography 
      variant="h2" 
      sx={{ mb: 2 }}>
        Oups ! La page que vous recherchez est introuvable.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        Elle a peut-être été supprimée ou le lien est erroné.
      </Typography>

      <Button
        variant="contained"
        component={Link}
        
        to="/"
        sx={{ borderRadius: 3, px: 4, py: 1.2 ,color:"black"}}
      >
        Retour à l’accueil
      </Button>
    </Box>
  );
}
export default NotFound