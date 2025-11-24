import Header from "../header/Header";
import Aside from "../aside/Aside";
import Main from "./Main";
import NavBar from "../acceuil/NavFilter/NavBar";
import { FilterProvider } from "../acceuil/NavFilter/Context";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import BurgerMenu from "../menuBurger";


function Layout() {
   const theme = useTheme(); 
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); 

  return (
    <Box id="body"
    bgcolor={"background.default"}
      style={{
        display: "grid",
        gridTemplateColumns: "0.4fr 1fr 1fr 0.05fr",
        gridTemplateRows: "0.8fr 0.7fr 7.5fr 0.5fr",
        height: "96vh",
        width: "96vw",
        borderRadius: "15px"
      }}
    >
      <FilterProvider>
        <NavBar/>
       
        {isMobile? <BurgerMenu/>  :<Aside />} 
        <Main><Outlet/></Main>
      </FilterProvider>
      <Header />
    </Box>
  );
}

export default Layout;
