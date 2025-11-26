import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import GavelIcon from "@mui/icons-material/Gavel";
import MenuBookIcon from "@mui/icons-material/MenuBook"; // pour livres
import GroupIcon from "@mui/icons-material/Group"; // pour utilisateurs
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"; // pour paiements
import PersonIcon from "@mui/icons-material/Person"; // pour auteur
import { useAuthContext } from "../Context/AuthContext";

function Aside() {
  const { user } = useAuthContext()
  const location = useLocation().pathname;
  const isAdmin = user ? user.role : false
  const isUser = user ? user.role === false : false;
  const [active, setActive] = useState<string>(location);

  const buttonActive = (path: string) => {
    setActive(path);
  };

  const buttonStyle = (isActive: boolean) => ({
    width: "83%",
    height: "40px",
    marginBottom: "10px",
    borderRadius: "10px",
    justifyContent: "flex-start",
    textTransform: "none",
    color: "text.primary",
    backgroundColor: isActive ? "primary.main" : "secondary.main",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "clamp(10px, 1vw, 16px)",
  });

  return (
    <aside
      aria-label="Barre latérale de navigation"
      style={{
        height: "100%",
        gridRowStart: "1",
        gridRowEnd: "4",
        gridColumnStart: "1",
        gridColumnEnd: "2",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "20px",
        overflowY: "auto",
        overflowX: "hidden"
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        aria-label="Navigation principale"
      >
        <Typography
          variant="h1"
          fontSize={"clamp(10px, 3vw, 46px)"}
          sx={{color:"text.primary"}}
          aria-label="Titre du site"
        >
          Biblio'Go
        </Typography>
        <Button
          component={Link}
          to={"/"}
          onClick={() => buttonActive("/")}
          aria-label="Retour à l'accueil"
          sx={{
            mb: 5,
            border: "none",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
              transform: "none",
              boxShadow: "none",
            },
            "&:active": {
              backgroundColor: "transparent",
            },
            cursor: active === '/' ? "default" : "pointer"
          }}
        >
          <img
            src="/client/public/logo.png"
            alt="Logo de la bibliothèque"
            title="Accueil"
            style={{ height: 90, width: 90 }}
          />
        </Button>

        <Button
          component={Link}
          to={"/"}
          onClick={() => buttonActive("/")}
          aria-label="Accéder à la page d'accueil"
          sx={buttonStyle(active === "/")}
        >
          <HomeIcon sx={{ fill: active === '/' ? "white" : "black" }} aria-hidden="true" />
          Accueil
        </Button>

        {isAdmin ? null : isUser && !isAdmin ? (
          <Button
            component={Link}
            to="/like"
            onClick={() => buttonActive("/like")}
            aria-label="Accéder à mes livres favoris"
            sx={buttonStyle(active === "/like")}
          >
            <FavoriteIcon sx={{ fill: active === '/like' ? "white" : "black" }} aria-hidden="true" />
            Mes envies
          </Button>
        ) : null}

        {isAdmin ? null : isUser && !isAdmin ? (
          <Button
            component={Link}
            to="/historical"
            onClick={() => buttonActive("/historical")}
            aria-label="Voir mon historique d'emprunts"
            sx={buttonStyle(active === "/historical")}
          >
            <HistoryIcon sx={{ fill: active === '/historical' ? "white" : "black" }} aria-hidden="true" />
            Mon historique
          </Button>
        ) : null}

        {isAdmin ? null : (
          <Button
            component={Link}
            to="/info"
            onClick={() => buttonActive("/info")}
            aria-label="Découvrir la bibliothèque et son histoire"
            sx={buttonStyle(active === "/info")}
          >
            <InfoIcon sx={{ fill: active === '/info' ? "white" : "black" }} aria-hidden="true" />
            Découvrez-nous
          </Button>
        )}

        {isAdmin ? null : (
          <Button
            component={Link}
            to="/subscription"
            onClick={() => buttonActive("/subscription")}
            aria-label="Découvrir nos offres d'abonnement"
            sx={buttonStyle(active === "/subscription")}
          >
            <SubscriptionsIcon sx={{ fill: active === '/subscription' ? "white" : "black" }} aria-hidden="true" />
            Nos offres
          </Button>
        )}

        {isAdmin ? null : (
          <Button
            component={Link}
            to="/contact"
            onClick={() => buttonActive("/contact")}
            aria-label="Contacter la bibliothèque"
            sx={buttonStyle(active === "/contact")}
          >
            <ContactMailIcon sx={{ fill: active === '/contact' ? "white" : "black" }} aria-hidden="true" />
            Nous contacter
          </Button>
        )}

        {isAdmin && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="100%"
            aria-label="Navigation isAdministrateur"
          >
            <Button
              component={Link}
              to="/admin/userbook/take"
              onClick={() => buttonActive("/admin/userbook/take")}
              aria-label="Gérer les départs de livres"
              sx={buttonStyle(active === "/admin/userbook/take")}
            >
              <MenuBookIcon sx={{ fill: active === '/admin/userbook/take' ? "white" : "black" }} aria-hidden="true" />
              Départs
            </Button>

            <Button
              component={Link}
              to="/admin/userbook/deposit"
              onClick={() => buttonActive("/admin/userbook/deposit")}
              aria-label="Gérer les retours de livres"
              sx={buttonStyle(active === "/admin/userbook/deposit")}
            >
              <MenuBookIcon sx={{ fill: active === '/admin/userbook/deposit' ? "white" : "black" }} aria-hidden="true" />
              Retours
            </Button>

            <Button
              component={Link}
              to="/admin/author"
              onClick={() => buttonActive("/admin/author")}
              aria-label="Gérer les auteurs"
              sx={buttonStyle(active === "/admin/author")}
            >
              <PersonIcon sx={{ fill: active === '/admin/author' ? "white" : "black" }} aria-hidden="true" />
              Auteurs
            </Button>

            <Button
              component={Link}
              to="/admin/book"
              onClick={() => buttonActive("/admin/book")}
              aria-label="Gérer les livres du catalogue"
              sx={buttonStyle(active === "/admin/book")}
            >
              <MenuBookIcon sx={{ fill: active === '/admin/book' ? "white" : "black" }} aria-hidden="true" />
              Livres
            </Button>

            <Button
              component={Link}
              to="/admin/user"
              onClick={() => buttonActive("/admin/user")}
              aria-label="Gérer les utilisateurs"
              sx={buttonStyle(active === "/admin/user")}
            >
              <GroupIcon sx={{ fill: active === '/admin/user' ? "white" : "black" }} aria-hidden="true" />
              Utilisateurs
            </Button>

            <Button
              component={Link}
              to="/admin/stripe"
              onClick={() => buttonActive("/admin/stripe")}
              aria-label="Gérer les paiements et abonnements"
              sx={buttonStyle(active === "/admin/stripe")}
            >
              <MonetizationOnIcon sx={{ fill: active === '/admin/stripe' ? "white" : "black" }} aria-hidden="true" />
              Paiements
            </Button>
          </Box>
        )}
      </Box>

      {isAdmin === "true" ? null : (
        <Button
          component={Link}
          to="/footer"
          onClick={() => buttonActive("/footer")}
          aria-label="Accéder aux ressources et mentions légales"
          sx={buttonStyle(active === "/footer")}
        >
          <GavelIcon sx={{ fill: active === '/footer' ? "white" : "black" }} aria-hidden="true" /> Ressources légales
        </Button>
      )}
    </aside>
  );
}

export default Aside;
