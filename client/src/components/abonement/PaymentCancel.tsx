import { Container, Box, Typography, Button } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{width:"80%", margin:"auto"}}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <CancelOutlinedIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Paiement annulé
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Votre paiement n'a pas été effectué. Veuillez réessayer.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/subscription')}>
          Retour à la caisse
        </Button>
      </Box>
    </Container>
  );
};

export default PaymentCancel;
