import { useState } from "react"
import Subscription from "./Subscription"
import { Box, Typography } from "@mui/material"
import { useAuthContext } from "../Context/AuthContext"


function ContainerSubscription() {
  
  const { user } = useAuthContext()
  const abonnementType = user ? user.abonnementType : null
  const [animation, setAnimation] = useState(false)

  const changeState = () => {
    setAnimation(!animation)
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      gap: "40px",
    }}>
      <Box
        sx={{
          mt: 3,
          width: "90%",
          mx: "auto",
          p: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          color="text.primary"
          fontWeight="bold"
          gutterBottom
          aria-label="Titre principal : Biblio Go"
        >
          Biblio Go
        </Typography>

        <Typography
          variant="h3"
          color="text.primary"
          gutterBottom
          aria-label="Description du service : réservation en ligne et retrait en drive"
        >
          Vous propose un tout nouveau service de <strong>réservation en ligne</strong> et de <strong>retrait en drive</strong>.
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 2 }}
          aria-label="Information : réservez votre livre en quelques clics, disponible dans les 2 heures pour le retrait"
        >
          Réservez votre livre en quelques clics : il sera disponible <strong>dans les 2 heures</strong> pour le retrait.
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 1 }}
          aria-label="Information : retrait et dépôt 24h/24 et 7j/7"
        >
          Vous pouvez retirer et déposer vos livres <strong>24h/24 et 7j/7</strong>.
        </Typography>
      </Box>

      <div
        style={{
          height: "500px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          marginBottom: "30px"
        }}
        aria-label="Section des abonnements disponibles"
      >
        {abonnementType === "Passion" ? null : <Subscription
          onClick={changeState}
          title={"Abonnement"}
          price={10}
          duration={"/an"}
          subtitle={"Découverte"}
          descriptions={["Réservation en ligne de vos livres préférés", "Jusqu’à 3 livres empruntés en simultané", "Emprunt de 30 jours"]}
          animation={!animation}
          aria-label="Abonnement Découverte, 10 euros par an"
        />}
        {abonnementType === "Découverte" ? null : <Subscription
          onClick={changeState}
          title={"Abonnement"}
          price={20}
          duration={"/an"}
          subtitle={"Passion"}
          descriptions={["Réservation en ligne de vos livres préférés", "Jusqu’à 3 livres empruntés en simultané", "Emprunt de 30 jours, renouvelable une fois"]}
          animation={animation}
          aria-label="Abonnement Passion, 20 euros par an"
        />}
      </div>
    </div>
  )
}

export default ContainerSubscription
