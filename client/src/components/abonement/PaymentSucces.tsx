import { Container, Box, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthContext } from '../Context/AuthContext';
import { API_URL } from "../../config";
  
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext()
  const userId = user ? user?.userId : null


  useEffect(() => {
    fetch(`${API_URL}api/user/update`, {
      method: "PUT",
      credentials:"include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 1 })
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
        if (data.abonement) {
          localStorage.setItem("Abonement", data.abonement);
          localStorage.setItem("AbonementType", data.abonementType);
        }
      })
  }, [])
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
          Afin de mettre a jour votre compte merci de vous reconnecter
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Retour à l'accueil
        </Button>
      </Box>
    </Container>
  );
};

export default PaymentSuccess;
