import {
  useState,
  useRef,
  useEffect
} from "react";
import SearchBar from "./SearchBar";
import Connexion from "./Connexion";
import {
  Avatar,
  MenuItem,
  IconButton,
  Typography,
  Divider,
  Box,
  ListItemIcon
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthContext } from "../Context/AuthContext";
import theme from "../../theme";

function Header() {
  const { user, setUser } = useAuthContext()
  const login = user ? user.token : false
  const userName = user ? user.userName : null

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate()
  const toggleMenu = () => setOpenMenu((prev) => !prev);

  const logout = () => {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(res => res.json())
      .then((data) => {
        console.log("datalogout", data)
        setUser(null);
        return
      });
    navigate('/')
  };

  useEffect(() => {
    const clickOutsideMenu = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", clickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", clickOutsideMenu);
    }
  }, []);

  return (
    <header
      style={{
        gridRowStart: "1",
        gridRowEnd: "2",
        gridColumnStart: "2",
        gridColumnEnd: "4",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 0",
        position: "relative",
        zIndex: 10,
        marginBottom:"10px"
      }}
      aria-label="En-tête du site"
    >
      <SearchBar />

      {login ? (
        <Box
          sx={{
            position: "relative"
          }}
          ref={menuRef}
          aria-label="Menu utilisateur"
        >
          <IconButton
            onClick={toggleMenu}
            size="small"
            aria-label="Ouvrir le menu utilisateur"
            // aria-haspopup="true"
            // aria-expanded={openMenu}
            // aria-controls="menu-utilisateur"
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 40,
                height: 40,
                fontWeight: "bold",
                color: "text.primary",
                cursor: "pointer",
                border: "2px solid primary.main",
              }}
              aria-label={user ? `Avatar de ${userName}` : "phot de profil utilisateur"}
            >
              {userName[0]?.toUpperCase()}
            </Avatar>
          </IconButton>

          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: "50px",
              minWidth: 180,
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: "background.default",
              backdropFilter: "blur(6px)",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              transformOrigin: "top right",
              transform: openMenu ? "scale(1)" : "scale(0.95)",
              opacity: openMenu ? 1 : 0,
              visibility: openMenu ? "visible" : "hidden",
              transition: "all 0.25s ease-in-out",
              color:"text.primary"
            }}
            aria-label="Options du menu utilisateur"
          >
            <Typography
              sx={{
                px: 2,
                py: 1,
                fontWeight: 600,
                color: "primary.main",
                textAlign: "center",
              }}
            >
              {userName}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <MenuItem
              component={Link}
              to="/profile"
              onClick={() => setOpenMenu(false)}
              aria-label="Aller au profil"
            >
              <ListItemIcon>
                <AccountCircleIcon sx={{fill:theme.palette.text.primary}} fontSize="small" />
              </ListItemIcon>
              Profil
            </MenuItem>

            <MenuItem
              component={Link}
              to="/settings"
              onClick={() => setOpenMenu(false)}
              aria-label="Aller aux paramètres"
            >
              <ListItemIcon>
                <SettingsIcon sx={{fill:theme.palette.text.primary}} fontSize="small" />
              </ListItemIcon>
              Paramètres
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={logout}
              sx={{
                color: "error.main"
              }}
              aria-label="Se déconnecter"
            >
              <ListItemIcon>
                <LogoutIcon
                  fontSize="small"
                  sx={{
                    fill: theme.palette.error.main
                  }}
                />
              </ListItemIcon>
              Déconnexion
            </MenuItem>
          </Box>
        </Box>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "10px"
          }}
          aria-label="Zone de connexion"
        >
          <Connexion />
        </div>
      )}
    </header>
  );
}

export default Header;
