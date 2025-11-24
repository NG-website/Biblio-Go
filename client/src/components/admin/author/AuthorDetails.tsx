// import { useEffect, useState } from "react";
// import {
//   Avatar,
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   IconButton,
//   Stack,
//   Button,
//   Alert,
// } from "@mui/material";
// import { Edit } from "@mui/icons-material";
// import AddIcon from '@mui/icons-material/Add';
// import CheckIcon from '@mui/icons-material/Check';
// import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
// import { useParams } from "react-router-dom";

// const UserDetails = () => {
//   const [user, setUser] = useState()
//   const [imageUser, setImageUser] = useState(false)
//   const [prevImage, setPrevImage] = useState("")
//   const [updateDataUser, setUpdateDataUser] = useState(false)
//   const [error, setError] = useState("");
//     const userId = useParams().id
//     console.log(userId)

//   useEffect(() => {



//     fetch("http://localhost:3000/user/id", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json"
//       },
//       body: JSON.stringify({id: userId})
//     })
//       .then((res) => {
//         if (!res.ok) {
//           return null
//         }
//         return res.json()
//       })
//       .then((data) => {
//         console.log(data)
//         setUser(data)

//         fetch(`http://localhost:3000/uploads/user/${data.userName + userId}.jpg`)
//           .then((res) => {
//             console.log(res)
//             if (!res.ok) {
//               setImageUser(false)
//             } else {
//               setImageUser(true)
//             }
//           })
//       })
//   }, [])

//   const [editing, setEditing] = useState({
//     email: false,
//     address: false,
//     country: false,
//     postalCode: false,
//     phone: false,
//     photo: false,
//   });

//   const handleEdit = (field) => {
//     setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
//     setUpdateDataUser(false)
//   };

//   const handleChange = (field, value) => {
//     setUser((prev) => ({ ...prev, [field]: value }));

//   };

//   const handlePhotoChange = (event) => {

//     const formData = new FormData(event.target.form)
//     if (formData) {
//       fetch("http://localhost:3000/image/user", {
//         method: "POST",
//         body: formData
//       })
//       setPrevImage(`${Date.now()}`)
//       //setImageUser(true)
//     }
//   };

//   const updateUser = () => {
//     fetch("http://localhost:3000/user/update", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ userData: user, userId: localStorage.getItem("Id") })
//     })
//       .then((res) => {
//         if (!res.ok) {
//           console.log(res)
//         }
//         return res.json()
//       })
//       .then((data) => {
//         if (data[0] === 1) {
//           setUpdateDataUser(true)
//           setEditing({ email: false, address: false, country: false, postalCode: false, phone: false, photo: false })
//           setError("modification enregister")
//         }else{
//           setError("les modification n ont pas etais enregistrer. Ressayer plus tard")
//         }

//       })
//   }
//   return (
//     <Box
//       sx={{
//         width: "70%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         p: 2,
//         margin: "auto"
//       }}
//     >
//       <Card
//         sx={{
//           width: "100%",
//           p: 3,
//           boxShadow: 3,
//           borderRadius: 3,
//           bgcolor: "white",
//         }}
//       >
//         <CardContent>
//           <Stack
//             spacing={3}
//             alignItems="center"
//           >
//             <Box
//               sx={{
//                 position: "relative",
//                 display: "inline-block"
//               }}
//             >
//               <Avatar
//                 alt={user?.userName}
//                 src={imageUser ? user && `http://localhost:3000/uploads/user/${user.userName + localStorage.getItem("Id")}.jpg?${prevImage}` : ""}

//                 sx={{
//                   width: 100,
//                   height: 100,
//                   bgcolor: "grey.300",
//                   objectFit: "cover",
//                   cursor: editing.photo ? "default" : "pointer",
//                   transition: "0.2s",
//                   "&:hover": {
//                     opacity: editing.photo ? 1 : 0.85,
//                   },
//                 }}
//                 onClick={
//                   editing.photo
//                     ? undefined
//                     : () => document.getElementById("photo-upload")!.click()
//                 }
//               />
//               {!editing.photo && (
//                 <IconButton
//                   sx={{
//                     position: "absolute",
//                     bottom: 0,
//                     right: 0,
//                     bgcolor: "white",
//                     boxShadow: 2,
//                   }}
//                   onClick={() =>
//                     document.getElementById("photo-upload")!.click()
//                   }
//                 >

//                   {imageUser ? <Edit fontSize="small" onClick={(e) => { e.stopPropagation(); document.getElementById("photo-upload")!.click() }} /> : <AddIcon />}
//                 </IconButton>
//               )}
//               <form>
//                 <input
//                   name="name"
//                   defaultValue={user && user.userName + localStorage.getItem("Id")}
//                   type="text"
//                   style={{ display: "none" }}
//                 />
//                 <input
//                   name="image"
//                   id="photo-upload"
//                   type="file"
//                   accept="image/*"
//                   style={{ display: "none" }}
//                   onChange={handlePhotoChange}
//                 />
//               </form>
//             </Box>

//             <Typography variant="h5">{user && user.userName}</Typography>

//             <Box sx={{ width: "100%" }}>
//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 spacing={1}
//               >
//                 {editing.email ? (
//                   <TextField
//                     label="Email"
//                     variant="outlined"
//                     size="small"
//                     fullWidth
//                     value={user?.userEmail}
//                     onChange={(e) => handleChange("userEmail", e.target.value)}
//                   />
//                 ) : (
//                   <Typography
//                     variant="body1"
//                     sx={{ flexGrow: 1 }}
//                   >
//                     <strong>Email :</strong>
//                     {user && user.userEmail}
//                   </Typography>
//                 )}
//                 {!editing.email && (
//                   <IconButton
//                     onClick={() => handleEdit("email")}
//                   >
//                     <Edit />
//                   </IconButton>
//                 )}
//               </Stack>
//             </Box>

//             <Box sx={{ width: "100%" }}>
//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 spacing={1}
//               >
//                 {editing.address ? (
//                   <TextField
//                     label="Adresse"
//                     variant="outlined"
//                     size="small"
//                     fullWidth
//                     value={user && user.userAddress || ""}
//                     onChange={(e) => handleChange("userAddress", e.target.value)}
//                   />
//                 ) : (
//                   <Typography
//                     variant="body1"
//                     sx={{ flexGrow: 1 }}
//                   >
//                     <strong>Adresse :</strong>
//                     {user && user.userAddress}
//                   </Typography>
//                 )}
//                 {!editing.address && (
//                   <IconButton
//                     onClick={() => handleEdit("address")}
//                   >
//                     <Edit />
//                   </IconButton>
//                 )}
//               </Stack>
//             </Box>
//             <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>

//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 spacing={1}
//               >
//                 {editing.country ? (
//                   <TextField
//                     label="Ville"
//                     variant="outlined"
//                     size="small"
//                     fullWidth
//                     value={user && user.userCountry || ""}
//                     onChange={(e) => handleChange("userCountry", e.target.value)}
//                   />
//                 ) : (
//                   <Typography variant="body1" sx={{ flexGrow: 1 }}>
//                     <strong>Ville :</strong>
//                     {user && user.userCountry}
//                   </Typography>
//                 )}
//                 {!editing.country && (
//                   <IconButton
//                     onClick={() => handleEdit("country")}
//                   >
//                     <Edit />
//                   </IconButton>
//                 )}
//               </Stack>

//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 spacing={1}
//               >
//                 {editing.postalCode ? (
//                   <TextField
//                     label="Code postal"
//                     variant="outlined"
//                     size="small"
//                     fullWidth
//                     value={user && user.userPostal || ""}
//                     onChange={(e) => handleChange("userPostal", e.target.value)}
//                   />
//                 ) : (
//                   <Typography variant="body1" sx={{ flexGrow: 1 }}>
//                     <strong>Code postal :</strong>
//                     {user && user.userPostal}
//                   </Typography>
//                 )}
//                 {!editing.postalCode && (
//                   <IconButton
//                     onClick={() => handleEdit("postalCode")}
//                   >
//                     <Edit />
//                   </IconButton>
//                 )}
//               </Stack>
//             </Box>

//             <Box sx={{ width: "100%" }}>
//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 spacing={1}
//               >
//                 {editing.phone ? (
//                   <TextField
//                     label="Téléphone"
//                     variant="outlined"
//                     size="small"
//                     fullWidth
//                     value={user && user.userPhone || ""}
//                     onChange={(e) => handleChange("userPhone", e.target.value)}
//                   />
//                 ) : (
//                   <Typography variant="body1" sx={{ flexGrow: 1 }}>
//                     <strong>Téléphone :</strong>
//                     {user?.userPhone ? user?.userPhone : "non rensignée"}
//                   </Typography>
//                 )}
//                 {!editing.phone && (
//                   <IconButton
//                     onClick={() => handleEdit("phone")}
//                   >
//                     <Edit />
//                   </IconButton>
//                 )}
//               </Stack>
//               {error ? <Alert icon={<CheckIcon fontSize="inherit" />} severity="success"> Moddification enregistrer avec succés</Alert> :null}
//             </Box>
//                 ban?
//                 actif?
//                 livre?
//             {!updateDataUser ? <Button
//               onClick={updateUser}
//               variant="contained"
//               color="primary"
//               sx={{ mt: 2 }}
             
//             >
//               Enregistrer les modifications
//             </Button> : <Button
//               onClick={()=>{window.location.href = '/'}}
//               variant="contained"
//               sx={{ mt: 2, backgroundColor: "green" }}
//                endIcon={<KeyboardReturnIcon sx={{fill:"white"}}/>}
//             >
//               Retour à la page d acceuil
//             </Button>}
//           </Stack>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default UserDetails;
