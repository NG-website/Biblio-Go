import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  IconButton,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import GavelIcon from "@mui/icons-material/Gavel";
import theme from "../theme";
import { useAuthContext } from "./Context/AuthContext";

function BurgerMenu() {
  const {user} = useAuthContext()
  const admin = user?.role === true;
  const isConnected = user?.id;
  const location = useLocation().pathname;
  const [active, setActive] = useState<string>(location);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const buttonStyle = (isActive: boolean) => ({
    color: isActive ? "secondary.main" : "black",
    backgroundColor: isActive ? "primary.main" : "secondary.main",
    marginBottom:"20px",
    "&:hover": {
      backgroundColor: "primary.main",
      color: "secondary.main",
    },
    borderRadius: "10px",
    textTransform: "none",
  });

  return (
    <>
<IconButton
  onClick={toggleDrawer(true)}
  sx={{
    position: "fixed",
    top: 25,
    left: 25,
    zIndex: 1300,
    width: 60,
    height: 60,
    borderRadius:5,
    bgcolor: "primary.main", 
    "&:hover": { 
      bgcolor: "secondary.main",
      fill:"white"
     },
  }}
  aria-label="Ouvrir le menu"
>
  <MenuIcon
   sx={{ fontSize: 40,
     fill:"secondary.main" ,
     "&:hover": { 
      fill: theme.palette.primary.main
     },}} />
</IconButton>


      <Drawer  anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, p: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box textAlign="center" mb={2} mt={10}>
            <Button
              component={Link}
              to= "/"
              sx={{border:"none", "&:hover":{backgroundColor:"transparent"}}}
              onClick={() => setActive("/")}
            >
              <img
                src="/logo.png"
                alt="Logo"
                style={{ height: 80, width: 80 }}
              />
            </Button>
          </Box>

          <List >
            {/* Accueil */}
            <ListItemButton
              component={Link}
              to= "/"
              onClick={() => setActive("/")}
              sx={buttonStyle(active === "/")}
            >
              <ListItemIcon>
                <HomeIcon sx={{ fill: active === "/" ? theme.palette.secondary.main : "black" }} />
              </ListItemIcon>
              <ListItemText primary="Accueil" />
            </ListItemButton>

            {/* User */}
            {!admin ? (
              <>
                {isConnected && (
                  <ListItemButton
                    component={Link}
                    to="/like"
                    onClick={() => setActive("/like")}
                    sx={buttonStyle(active === "/like")}
                  >
                    <ListItemIcon>
                      <FavoriteIcon
                        sx={{ color: active === "/like" ? theme.palette.secondary.main : "black" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Mes Envies" />
                  </ListItemButton>
                )}

                {isConnected && (
                  <ListItemButton
                    component={Link}
                    to="/historical"
                    onClick={() => setActive("/historical")}
                    sx={buttonStyle(active === "/historical")}
                  >
                    <ListItemIcon>
                      <HistoryIcon
                        sx={{
                          color: active === "/historical" ? theme.palette.secondary.main : "black",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Historique" />
                  </ListItemButton>
                )}

                <ListItemButton
                  component={Link}
                  to="/info"
                  onClick={() => setActive("/info")}
                  sx={buttonStyle(active === "/info")}
                >
                  <ListItemIcon>
                    <InfoIcon sx={{ color: active === "/info" ? theme.palette.secondary.main : "black" }} />
                  </ListItemIcon>
                  <ListItemText primary="Découvrez-nous" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/subscription"
                  onClick={() => setActive("/subscription")}
                  sx={buttonStyle(active === "/subscription")}
                >
                  <ListItemIcon>
                    <SubscriptionsIcon
                      sx={{
                        color: active === "/subscription" ? theme.palette.secondary.main : "black",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Nos Offres" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/contact"
                  onClick={() => setActive("/contact")}
                  sx={buttonStyle(active === "/contact")}
                >
                  <ListItemIcon>
                    <ContactMailIcon
                      sx={{ color: active === "/contact" ? theme.palette.secondary.main : "black" }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Nous Contacter" />
                </ListItemButton>

                <Divider sx={{ my: 1 }} />

                <ListItemButton
                  component={Link}
                  to="/footer"
                  onClick={() => setActive("/footer")}
                  sx={buttonStyle(active === "/footer")}
                >
                  <ListItemIcon>
                    <GavelIcon sx={{ fill: active === "/footer" ? theme.palette.secondary.main : theme.palette.text.primary }} />
                  </ListItemIcon>
                  <ListItemText primary="Ressources légales" />
                </ListItemButton>
              </>
            ) : (
              <>
        
                <ListItemButton
                  component={Link}
                  to="/admin/userbook/take"
                  onClick={() => setActive("/admin/userbook/take")}
                  sx={buttonStyle(active === "/admin/userbook/take")}
                >
                  <ListItemIcon>
                    <ContactMailIcon sx={{ color: active === "/admin/userbook/take" ? theme.palette.secondary.main : theme.palette.text.primary }} />
                  </ListItemIcon>
                  <ListItemText primary="Départs" />
                </ListItemButton>

                                <ListItemButton
                  component={Link}
                  to="/admin/userbook/deposit"
                  onClick={() => setActive("/admin/userbook/deposit")}
                  sx={buttonStyle(active === "/admin/userbook/deposit")}
                >
                  <ListItemIcon>
                    <ContactMailIcon sx={{ fill: active === "/admin/userbook/deposit" ? theme.palette.secondary.main : theme.palette.text.primary }} />
                  </ListItemIcon>
                  <ListItemText primary="Retours" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/admin/book"
                  onClick={() => setActive("/admin/book")}
                  sx={buttonStyle(active === "/admin/book")}
                >
                  <ListItemIcon>
                    <ContactMailIcon sx={{ fill: active === "/admin/book" ? theme.palette.secondary.main : theme.palette.text.primary }} />
                  </ListItemIcon>
                  <ListItemText primary="Book" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/admin/user"
                  onClick={() => setActive("/admin/user")}
                  sx={buttonStyle(active === "/admin/user")}
                >
                  <ListItemIcon>
                    <ContactMailIcon sx={{ fill: active === "/admin/user" ? theme.palette.secondary.main : theme.palette.text.primary }} />
                  </ListItemIcon>
                  <ListItemText primary="User" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/admin/stripe"
                  onClick={() => setActive("/admin/stripe")}
                  sx={buttonStyle(active === "/admin/stripe")}
                >
                  <ListItemIcon>
                    <ContactMailIcon
                      sx={{ fill: active === "/admin/stripe" ? theme.palette.secondary.main : theme.palette.text.primary }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Stripe" />
                </ListItemButton>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default BurgerMenu;
