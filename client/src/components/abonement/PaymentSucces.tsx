import { Container, Box, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthContext } from '../Context/AuthContext';
import { API_URL } from '../../config';


const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext()
  console.log(user?.userId)
 // const userId = user?user?.userId : null


  useEffect(() => {
    if (!user?.userId) return;
    console.log(document.cookie)
  //       fetch(`${API_URL}api/user/id`, {
  //     method: "POST",
  //     credentials: "include",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ id: user?.userId })
  //   })
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then((data) => {
  //       console.log(data)
  //       setUser(prev => ({...prev,abonnementType: data.abonnementType, abonnement: data.abonnement}));
  //       //       if (data.abonement) {
  //       //         localStorage.setItem("Abonement", data.abonement);
  //       //         localStorage.setItem("AbonementType", data.abonementType);
  //       //       }
  //     })
  // }, [user?.userId])

    fetch(`${API_URL}api/user/id`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user?.userId })
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
        setUser(prev => ({...prev,abonnementType: data.abonnementType, abonnement: data.abonnement}));
        //       if (data.abonement) {
        //         localStorage.setItem("Abonement", data.abonement);
        //         localStorage.setItem("AbonementType", data.abonementType);
        //       }
      })
  }, [user?.userId])

  return (
    <Container sx={{ width: "80%", margin: "auto" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Paiement réussi !
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Merci pour votre achat. Votre paiement a été traité avec succès.
          Votre compte est actif
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Retour à l'accueil
        </Button>
      </Box>
    </Container>
  );
};

export default PaymentSuccess;
