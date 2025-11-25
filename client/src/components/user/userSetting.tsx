import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Stack,
  Divider,
  Button,
  TextField,
  Alert,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthContext } from "../Context/AuthContext";


const UserSettings = () => {

  const { user } = useAuthContext()
  const [theme, setTheme] = useState(false)
   const [reload, setReload] = useState(false)
  useEffect(() => {
    
    const light = (localStorage.getItem('Theme') === 'light')
    const dark = (localStorage.getItem('Theme') === 'dark')
    if(!light && !dark){
      localStorage.setItem("Theme", "light")
      setTheme(localStorage.getItem('Theme') === 'dark')
    }
    if(light){
      setTheme(false)
    }else{
      setTheme(true)
    }


  }, [reload])



  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwordMessage, setPasswordMessage] = useState("");


  const PasswordChange = (field, value) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const ShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };


  const handleUpdatePassword = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage("Veuillez remplir tous les champs.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    if (newPassword.length < 7) {
      setPasswordMessage("Le mot de passe doit contenir au moins 7 caractères.");
      return;
    }

    fetch("http://localhost:3000/api/user/update-password", {
      method: "PUT",
      credentials:"include",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({  data: passwordData })
    })
      .then((res) => {
        if (!res.ok) {
          console.log(res)
        }
        if (res.status === 400) {
          setPasswordMessage("Mot de passe actuel incorrect");
        }
        return res.json()
      })
      .then((data) => {
        if (data[0] === 1) {
          setPasswordMessage("Mot de passe mis à jour avec succès !");
          setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
          setShowPassword({ current: false, new: false, confirm: false })
          setReload(true)
        }
      })
  };

  return (
    <Box
      sx={{
        width: "70%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          p: 3,
          boxShadow: 3,
          borderRadius: 3,
          bgcolor: "background.default",
        }}
      >
        <CardContent>
          <Stack spacing={3}>
            <Typography
            variant="h2" 
            textAlign="center"
            color="text.primary"
            >
              Paramètres du compte
            </Typography>

            <Box>
              <Typography
               variant="subtitle1"
               color="text.primary"
                fontWeight={600}>
                Apparence
              </Typography>
              <FormControlLabel
              label="Mode sombre"
              sx={{"& .MuiFormControlLabel-label":{color:"text.primary"}}}
                control={
                  <Switch
                    checked={theme}
                    onChange={() => { 
                      setTheme(!theme);
                       !theme ? (localStorage.setItem("Theme", `dark`)) 
                       :
                        localStorage.setItem("Theme", `light`);
                         setReload(!reload)
                         window.location.reload()
                         }}
                  />
                }
                
              />
            </Box>

            <Divider />

            <Box>
              <Typography 
              variant="subtitle1"
               fontWeight={600}
               color="text.primary"
               >
                Modifier mon mot de passe
              </Typography>
              <Stack spacing={2} mt={1}>
                <Box
                  sx={{ position: "relative" }}
                >
                  <TextField
                    type={showPassword.current ? "text" : "password"}
                    label="Mot de passe actuel"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={passwordData.currentPassword}
                    onChange={(e) => PasswordChange("currentPassword", e.target.value)}
                  />
                  <IconButton
                    onClick={() => ShowPassword("current")}
                    edge="end"
                    sx={{
                      position: "absolute",
                      zIndex: "25",
                      top: 0,
                      right: 10
                    }}
                  >
                    {showPassword.current ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </Box>
                <Box
                  sx={{ position: "relative" }}
                >
                  <TextField
                    type={showPassword.new ? "text" : "password"}
                    label="Nouveau mot de passe"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={passwordData.newPassword}
                    onChange={(e) => PasswordChange("newPassword", e.target.value)}
                  />
                  <IconButton
                    onClick={() => ShowPassword("new")}
                    edge="end"
                    sx={{
                      position: "absolute",
                      zIndex: "25",
                      top: 0,
                      right: 10
                    }}
                  >
                    {showPassword.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </Box>
                <Box
                  sx={{ position: "relative" }}
                >
                  <TextField
                    type={showPassword.confirm ? "text" : "password"}
                    label="Confirmer le mot de passe"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={passwordData.confirmPassword}
                    onChange={(e) => PasswordChange("confirmPassword", e.target.value)}
                  />
                  <IconButton
                    onClick={() => ShowPassword("confirm")}
                    edge="end"
                    sx={{
                      position: "absolute",
                      zIndex: "25",
                      top: 0,
                      right: 10
                    }}
                  >
                    {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </Box>

                {passwordMessage && (
                  <Alert
                    severity={
                      passwordMessage.includes("succès")
                        ? "success"
                        : "warning"
                    }
                    sx={{ mt: 1 , backgroundColor:"primary.main", justifyContent:"center"}}
                  >
                    {passwordMessage}
                  </Alert>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdatePassword}
                >
                  Mettre à jour le mot de passe
                </Button>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserSettings;
