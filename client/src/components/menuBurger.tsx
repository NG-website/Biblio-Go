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

function BurgerMenu() {
  const admin = localStorage.getItem("role");
  const isConnected = localStorage.getItem("Token");
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
    bgcolor: "primary.main", // optionnel : fond pour mieux voir
    "&:hover": { 
      bgcolor: "secondary.main",
      fill:"white"
     },
  }}
  aria-label="Ouvrir le menu"
>
  <MenuIcon sx={{ fontSize: 40, fill:"secondary.main" ,     "&:hover": { 
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
              to={admin === "true" ? "/admin/dashboard" : "/"}
              onClick={() => setActive("/")}
            >
              <img
                src="/public/logo.png"
                alt="Logo"
                style={{ height: 80, width: 80 }}
              />
            </Button>
          </Box>

          <List >
            {/* Accueil */}
            <ListItemButton
              component={Link}
              to={admin === "true" ? "/admin/dashboard" : "/"}
              onClick={() => setActive("/")}
              sx={buttonStyle(active === "/")}
            >
              <ListItemIcon>
                <HomeIcon sx={{ fill: active === "/" ? theme.palette.secondary.main : "black" }} />
              </ListItemIcon>
              <ListItemText primary="Accueil" />
            </ListItemButton>

            {/* User */}
            {!admin || admin === "false" ? (
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
                {/* Admin */}
                <ListItemButton
                  component={Link}
                  to="/back"
                  onClick={() => setActive("/back")}
                  sx={buttonStyle(active === "/back")}
                >
                  <ListItemIcon>
                    <ContactMailIcon sx={{ color: active === "/back" ? theme.palette.secondary.main : theme.palette.text.primary }} />
                  </ListItemIcon>
                  <ListItemText primary="Retour" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/admin/book"
                  onClick={() => setActive("/book")}
                  sx={buttonStyle(active === "/book")}
                >
                  <ListItemIcon>
                    <ContactMailIcon sx={{ color: active === "/book" ? "white" : "black" }} />
                  </ListItemIcon>
                  <ListItemText primary="Book" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/admin/user"
                  onClick={() => setActive("/user")}
                  sx={buttonStyle(active === "/user")}
                >
                  <ListItemIcon>
                    <ContactMailIcon sx={{ color: active === "/user" ? "white" : "black" }} />
                  </ListItemIcon>
                  <ListItemText primary="User" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/admin/adminbook"
                  onClick={() => setActive("/adminbook")}
                  sx={buttonStyle(active === "/adminbook")}
                >
                  <ListItemIcon>
                    <ContactMailIcon
                      sx={{ color: active === "/adminbook" ? "white" : "black" }}
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
