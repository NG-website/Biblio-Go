import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Button,
  Alert,
  IconButton,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../../../theme";

interface AddCouponProps {
  open: boolean;
  close: (value: boolean) => void;
}

export default function AddCoupon({ open, close }: AddCouponProps) {
  useEffect(()=>{

  },[])
  const [name, setName] = useState("");
  const [percentOff, setPercentOff] = useState("");
  const [duration, setDuration] = useState("once");
  const [durationInMonths, setDurationInMonths] = useState("");
  const [alertMessage, setAlertMessage] = useState("");


  const handleCreateCoupon = async (e: React.FormEvent<HTMLFormElement>) => {
  //  e.preventDefault();
    setAlertMessage("");


    if (!name || !percentOff || !duration) {
      setAlertMessage("Merci de remplir tous les champs obligatoires.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/admin/create-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          percent_off: parseFloat(percentOff),
          duration,
          duration_in_months:
            duration === "repeating" ? Number(durationInMonths) : null,

        }),
      });

      if (!res.ok) {
        setAlertMessage("Erreur lors de la création du coupon.");
        return;
      }

      const data = await res.json();
      if (data) {
        setAlertMessage(`la creation du coupon ${data.name} est un succès`)
        setName("");
        setPercentOff("");
        setDuration("once");
        setDurationInMonths("");
        setTimeout(() => {
          setAlertMessage("")
          close(false)
        }, 3000)
      }
    } catch (err) {
      setAlertMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  return (
        <Dialog open={open} sx={{
      "& .MuiDialog-paper": {
        width: { xs: "80%", md: "53%" },
        maxWidth: "none",
      }
    }}
    >
      <DialogTitle sx={{ backgroundColor: "primary.main" }} >
        Créer un coupon de réduction
        <IconButton
          onClick={() => close(false)}
          sx={{ 
            position: "absolute", 
            right: 8, 
            top: 8, 
               "&:hover *": { fill: theme.palette.text.primary }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box
          component="form"
          onSubmit={handleCreateCoupon}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          {alertMessage &&
            <Alert
              severity={alertMessage.includes("succès") ? "success" : "error"}
            >
              {alertMessage}
            </Alert>}

          <TextField
            label="Nom du coupon"
             autoFocus
            value={name}
            onClick={()=>console.log(1)}
            onChange={(e) =>{console.log(2); setName(e.target.value)}}
            required
            fullWidth
          
          />

          <TextField
            label="Pourcentage de réduction"
            type="number"
            value={percentOff}
            onChange={(e) => setPercentOff(e.target.value)}
            required
            fullWidth
            inputProps={{ min: 1, max: 100 }}
           
          />

          <TextField
            select
            label="Durée de validité"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            fullWidth
         
          >
            <MenuItem value="once">Une seule fois</MenuItem>
            <MenuItem value="repeating">Répétée</MenuItem>
            <MenuItem value="forever">À vie</MenuItem>
          </TextField>

          {duration === "repeating" && (
            <TextField
              label="Durée en mois"
              type="number"
              value={durationInMonths}
              onChange={(e) => setDurationInMonths(e.target.value)}
              fullWidth
            
            />
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
          >
            Créer le coupon
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
