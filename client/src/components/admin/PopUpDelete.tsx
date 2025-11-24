import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import theme from "../../theme"

function PopUPDelete({confirmDelete, setConfirmDelete, deleteForever}){
    return(
  <Dialog
                open={confirmDelete}
                onClose={() => setConfirmDelete(null)}
                aria-label="Fenêtre de confirmation de suppression"
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle sx={{ fontWeight: 700, textAlign: "center", color:"text.primary" }}>
                    Confirmation de suppression
                </DialogTitle>

                <DialogContent>
                    <Typography align="center" sx={{color:"text.secondary"}}>
                        Voulez-vous vraiment le supprimer ?
                    </Typography>
                </DialogContent>

                <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                    <Button
                        sx={{borderColor:theme.palette.error.main, "&:hover":{backgroundColor:"red"}}}
                        variant="contained"
                        color="error"
                        aria-label="Confirmer la suppression"
                        onClick={() => deleteForever()}
                    >
                        Oui
                    </Button>
                    <Button

                    variant="outlined" 
                    aria-label="Annuler la suppression"
                    onClick={() => setConfirmDelete(null)}
                    >
                        Non
                    </Button>
                </DialogActions>
            </Dialog>
            )
}
export default PopUPDelete