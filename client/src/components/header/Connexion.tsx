import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Connexion() {
  return (
<ButtonGroup
 aria-label="Navigation utilisateur"
  disableElevation
  variant="contained"
  sx={{
    '& .MuiButtonGroup-grouped': {
      borderColor: 'background.default',
      backgroundColor: 'primary.main',
    },
  }}
>
  <Button component={Link} to="/login" aria-label="Se connecter">Connexion</Button>
  <Button component={Link} to="/register" aria-label="Créer un compte">Inscription</Button>
</ButtonGroup>

  );
}
