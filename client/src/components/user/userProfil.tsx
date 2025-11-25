import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Stack,
  Button,
  Alert,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import theme from "../../theme";
import { API_URL } from "../../config";

const UserProfile = () => {
  const [userData, setUserData] = useState<any>();
  const [imageUser, setImageUser] = useState(false);
  const [prevImage, setPrevImage] = useState("");
  const [updateDataUser, setUpdateDataUser] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const userId = user ? user?.userId : null;

  useEffect(() => {



    fetch(`${API_URL}api/user/id`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id: userId }),
    })
      .then((res) => (!res.ok ? null : res.json()))
      .then((data) => {
        setUserData(data);

        fetch(`${API_URL}api/uploads/user/${data.name + userId}.jpg`)
          .then((res) => {
            if (!res.ok) setImageUser(false);
            else setImageUser(true);
          });
      });
  }, [user]);

  const [editing, setEditing] = useState({
    email: false,
    address: false,
    country: false,
    postalCode: false,
    phone: false,
    photo: false,
  });

  const handleEdit = (field: string) => {
    setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
    setUpdateDataUser(false);
  };

  const handleChange = (field: string, value: string) => {
    setUserData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0]);

    const previewUrl = URL.createObjectURL(event.target.files?.[0]);
    setPrevImage(previewUrl);




  };

  const updateUser = () => {
    const formData = new FormData();
    formData.append("name", userData.name + userId);
    formData.append("image", file);
    console.log(formData.get("name"))
    fetch(`${API_URL}api/image/user`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de l'upload");
        return res.json();
      })
      .then((data) => { console.log("Image uploadée", data); setImageUser(true); })
      .catch((err) => console.error(err));
    fetch(`${API_URL}api/user/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: userData, id: userId }),
    })
      .then((res) => (!res.ok ? null : res.json()))
      .then((data) => {
        if (data?.[0] === 1) {
          setUpdateDataUser(true);
          setEditing({ email: false, address: false, country: false, postalCode: false, phone: false, photo: false });
          setMessage("modification enregister");
          setTimeout(() => {
            setMessage("")
            navigate('/')
          }, 3000)
        } else {
          setMessage("les modification n ont pas etais  Ressayer plus tard");
        }
      });
  };

  return (
    <Box
      sx={{
        width: "70%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        margin: "auto",

      }}
    >
      <Card sx={{ width: "100%", p: 3, boxShadow: 3, borderRadius: 3, bgcolor: "background.default" }}>
        <CardContent>
          <Stack spacing={3} alignItems="center">
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Avatar
                alt={userData?.name}
                src={prevImage || (imageUser ? `${API_URL}api/uploads/user/${userData.name + userId}.jpg` : "")}
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "grey.300",
                  objectFit: "cover",
                  cursor: editing.photo ? "default" : "pointer",
                  transition: "0.2s",
                  "&:hover": { opacity: editing.photo ? 1 : 0.85 },
                }}
                onClick={editing.photo ? undefined : () => document.getElementById("photo-upload")!.click()}
              />
              {!editing.photo && (
                <IconButton
                  sx={{ position: "absolute", bottom: 0, right: 0, bgcolor: "white", boxShadow: 2 }}
                  onClick={() => document.getElementById("photo-upload")!.click()}
                >
                  {imageUser ?
                    <Edit
                      fontSize="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById("photo-upload")!.click();
                      }} />
                    :
                    <AddIcon />
                  }
                </IconButton>
              )}
              <form>
                <input
                  name="name"
                  defaultValue={userData && userData.name + userId}
                  type="text"
                  style={{ display: "none" }}
                />
                <input
                  name="image"
                  id="photo-upload"
                  type="file"
                  accept=" .jpg, .jpeg, .png, .webp"
                  style={{ display: "none" }}
                  onChange={handlePhotoChange}
                />
              </form>
            </Box>

            <Typography sx={{  color:"text.primary" }} variant="h2">{userData?.name}</Typography>

            <Box sx={{ width: "100%" }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                {editing.email ? (
                  <TextField
                    label="Email"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={userData?.email || ""}
                    onChange={(e) => { handleChange("email", e.target.value) }}
                  />
                ) : (
                  <Typography  sx={{ flexGrow: 1,  color:"text.primary" }}>
                    <strong style={{ color: theme.palette.text.primary }}>Email :</strong> {userData?.email}
                  </Typography>
                )}
                {!editing.email &&
                <IconButton
                 onClick={() => handleEdit("email")}
                 >
                  <Edit sx={{ fill: theme.palette.primary.main }}/>
                  </IconButton>}
              </Stack>
            </Box>

            <Box sx={{ width: "100%" }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                {editing.address ? (
                  <TextField
                    label="Adresse"
                    size="small"
                    fullWidth
                    value={userData?.address || ""}
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                ) : (
                  <Typography sx={{ flexGrow: 1,  color:"text.primary" }}>
                    <strong style={{ color: theme.palette.text.primary }}>Adresse :</strong> {userData?.address}
                  </Typography>
                )}
                {!editing.address &&
                 <IconButton 
                 onClick={() => handleEdit("address")}
                 >
                  <Edit sx={{ fill: theme.palette.primary.main }}/>
                  </IconButton>}
              </Stack>
            </Box>

            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ flex: 1, mr: 1 }}>
                {editing.country ? (
                  <TextField
                    label="Ville"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={userData?.country || ""}
                    onChange={(e) => handleChange("country", e.target.value)}
                  />
                ) : (
                  <Typography
                    color="text.primary"
                    sx={{ flexGrow: 1 }}
                  >
                    <strong style={{ color: theme.palette.text.primary }}>Ville :</strong> {userData?.country}
                  </Typography>
                )}
                {!editing.country &&
                 <IconButton
                  onClick={() => handleEdit("country")}
                  >
                    <Edit sx={{ fill: theme.palette.primary.main }} />
                    </IconButton>}
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1} sx={{ flex: 1, ml: 1 }}>
                {editing.postalCode ? (
                  <TextField
                    label="Code postal"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={userData?.postalCode || ""}
                    onChange={(e) => handleChange("postalCode", e.target.value)}
                  />
                ) : (
                  <Typography
                    color="text.primary"
                    sx={{ flexGrow: 1 }}>
                    <strong style={{ color: theme.palette.text.primary }}>Code postal :</strong> {userData?.postalCode}
                  </Typography>
                )}
                {!editing.postalCode && 
                <IconButton
                 onClick={() => handleEdit("postalCode")}
                 >
                  <Edit sx={{ fill: theme.palette.primary.main }} />
                  </IconButton>}
              </Stack>
            </Box>

            <Box sx={{ width: "100%" }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                {editing.phone ? (
                  <TextField
                    label="Téléphone"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={userData?.phone || ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                ) : (
                  <Typography
                    color="text.primary"
                    sx={{ flexGrow: 1 }}
                  >
                    <strong style={{ color: theme.palette.text.primary }}>Téléphone :</strong> {userData?.phone || "non rensignée"}
                  </Typography>
                )}
                {!editing.phone &&
                  <IconButton
                    onClick={() => handleEdit("phone")}>
                    <Edit sx={{ fill: theme.palette.primary.main }} />
                  </IconButton>}
              </Stack>

              {message && <Alert
                icon={<CheckIcon fontSize="inherit" />}
                sx={{backgroundColor: "primary.main"}}
                severity="success">Modification enregistrée avec succès
                </Alert>
              }
            </Box>

            {!updateDataUser ? (
              <Button
                onClick={updateUser}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}>
                Enregistrer les modifications
              </Button>
            ) : (
              <Button
                onClick={() => navigate('/')}
                variant="contained"
                sx={{ mt: 2 }}
                endIcon={<KeyboardReturnIcon />}>
                Retour à la page d'accueil
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;
