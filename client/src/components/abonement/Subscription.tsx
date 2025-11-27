import { useEffect, useState } from "react";
//import Button from "../layout/Button";
import { Box, Typography, Stack, Divider, Alert, ListItem } from "@mui/material";
import Button from '@mui/material/Button';
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
interface SubscriptionProps {
  title: string;
  price: number;
  duration: string;
  subtitle: string;
  descriptions: string[];
  animation: boolean;
  onClick: () => void;
}

function Subscription({
  title,
  price,
  duration,
  subtitle,
  descriptions,
  animation,
  onClick,
}: SubscriptionProps) {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const abonner = user ? user.abonnement : null
  const userId = user ? user.userId : null
  const [idProduct, setIdProduct] = useState();
  const [alerte, setAlerte] = useState(false)

  useEffect(() => {

    try {
      fetch(`${API_URL}api/subscription/search-product`, {
        method: "POST",
        credentials:"include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName: subtitle })
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((data) => {
          // console.log(data)
          setIdProduct(data.default_price)
        })
        .catch((error) => {
          console.error("Erreur fetch search-product :", error)
        }
        )
    } catch (error) {
      console.error("Erreur useEffect search-product :", error)
    }
  }, [])

  const subscription = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    if (userId === null) {
      navigate('/login')
    }
    const user: { name: string; email: string }[] = []

    if (animation) e.stopPropagation();

    try {
      if (userId) {
        fetch(`${API_URL}api/user/id`, {
          method: "POST",
          credentials:"include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ id: userId })
        })
          .then((res) => {
            if (res.ok) {
              return res.json()
            }
          })
          .then((data) => {
            user.push({ name: data.userName, email: data.userEmail })

            fetch(`${API_URL}api/subscription/search-customer`, {
              method: "POST",
              credentials:"include",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({ name: data.userName, email: data.userEmail })
            })
              .then((res) => {
                if (res.ok) return res.json()
              })
              .then((data) => {
                // console.log(data)
                if (data.data[0]) {
                  fetch(`${API_URL}api/subscription/create-checkout-session`, {
                    method: "POST",
                    credentials:"include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ customerId: data.data[0].id, priceId: idProduct, userId: userId, abonementType: subtitle })
                  })
                    .then((res) => {
                      if (res.ok) return res.json()
                    })
                    .then((data) => {
                      console.log(data)
                     // window.location.href = data
                    })
                    .catch((error) => { console.error("Erreur fetch create-checkout-session :", error) })
                }

                if (data.data.length === 0) {
                  fetch(`${API_URL}api/subscription/create-customer`, {
                    method: "POST",
                    credentials:"include",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ name: user[0].name, email: user[0].email })
                  })
                    .then((res) => {
                      if (res.ok) return res.json()
                    })
                    .then((data) => {
                      console.log(data)
                      if (data.id.length != 0) {
                        fetch(`${API_URL}api/subscription/create-checkout-session`, {
                          method: "POST",
                          credentials:"include",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ customerId: data.id, priceId: idProduct, userId: userId, abonementType: subtitle })
                        })
                          .then((res) => {
                            if (res.ok) {
                              return res.json()
                            }
                          })
                          .then((data) => {
                            console.log(data)
                           // window.location.href = data
                           navigate(data)

                          }
                          )
                          .catch((error) => { console.error("Erreur fetch create-checkout-session après création client :", error) })
                      }
                    })
                    .catch((error) => { console.error("Erreur fetch create-customer :", error) })
                }
              })
              .catch((error) => { console.error("Erreur fetch search-customer :", error) })
          })
          .catch((error) => { console.error("Erreur fetch user/id :", error) })
      }
    } catch (error) {
      console.error("Erreur générale subscription :", error)
    }
  };

  return (
    <>
      {/* {alerte ? 
      <Alert severity="warning" sx={{ mb: 2, position: "absolute", top: 10, zIndex: "5", backgroundColor: "red" }}>
        Veuillez vous connecter pour vous abonner.
      </Alert> : ""} */}

      <Box
        onClick={onClick}
        sx={{
          width: abonner && abonner != "null" ? null : animation ? "35%" : "30%",
          border: "2px solid black",
          borderRadius: 3,
          p: abonner && abonner != "null" ? 8 : animation ? 5 : 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          position: "absolute",
          left: abonner && abonner != "null" ? null : animation ? "18.5%" : "53%",
          backgroundColor: "white",
          zIndex: abonner && abonner != "null" ? null : animation ? 2 : 1,
          opacity: abonner && abonner != "null" ? null : animation ? 1 : 0.35,
          transition: "all 0.5s ease",
          cursor: abonner && abonner != "null" ? "default" : "pointer",
          fontSize: "clamp(14px, 1vw, 30px)",
          boxShadow: abonner && abonner != "null" ? null : animation
            ? "0px 10px 20px rgba(0,0,0,0.2)"
            : "0px 2px 5px rgba(0,0,0,0.1)",
          "&:hover": {
            transform: abonner && abonner != "null" ? null : animation ? "scale(1.05)" : "none",
            boxShadow: abonner && abonner != "null" ? null : animation
              ? "0px 15px 25px rgba(0,0,0,0.3)"
              : "0px 2px 5px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Typography 
        variant="h2" 
        fontSize={"clamp(12px, 2vw, 18px)"} 
        textAlign="center" 
        sx={{ textWrap: "nowrap", alignSelf: "center" }}
        >
          {title}
        </Typography>
        <Typography 
        variant="body2" 
        color="text.secondary" 
        textAlign="center"
        >
          {subtitle}
        </Typography>
        <Stack 
        direction="row" 
        justifyContent="center" 
        alignItems="flex-end" 
        spacing={1} 
        sx={{ textWrap: "nowrap" }}
        >
          <Typography 
          variant="h3" 
          fontSize={"clamp(30px, 4vw, 72px)"}
          >
            {price} €
          </Typography>
          <Typography 
          variant="body1" 
          fontSize={"clamp(10px, 1vw, 18px)"} 
          color="text.secondary"
          >
            {duration}
          </Typography>
        </Stack>

        <Divider sx={{ my: 1 }} />

        <Box 
        component="ul" 
        sx={{ pl: 2 }}>
          {descriptions.map((desc, index) => (
            <ListItem 
            key={index} 
            style={{ minHeight: "30px", padding: "0", width: "100%", marginBottom: 10 }}
            >
              {desc}
            </ListItem>
          ))}
        </Box>

        <Box
          textAlign="center"
          mt={2}
          sx={{ textWrap: "nowrap", alignSelf: "center" }}
        >
          {abonner && abonner != "null" ?
            <Button
              sx={{ cursor: "default" }}
              variant="contained"
            >
              valable jusqu 'au : {new Date(abonner).toLocaleDateString("fr")}
            </Button>
            :
            <Button
              variant="contained"
              onClick={subscription}
              sx={{ fontSize: "clamp(10px, 1vw, 25px)" }}
            >
              S'abonner maintenant
            </Button>
          }
        </Box>
      </Box>
    </>
  );
}

export default Subscription;
