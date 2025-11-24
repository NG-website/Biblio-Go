// import { useNavigate } from "react-router-dom"
import { useState } from "react"
import AddCoupon from "./AddCoupon"
import { Box, Button } from "@mui/material"
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Link } from "react-router-dom"
import theme from "../../../theme"


function Stripe() {
    const [openAddCoupon, setOpenAddCoupon] = useState(false)

    return (
        <>
            <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                p="20px"
                gap={"20px"}
                position="sticky"
                top={0}
                zIndex={3}
                bgcolor="primary.main"
            >

                <h2 >Les Payements</h2>
                <Button
                    onClick={() => { setOpenAddCoupon(true) }}
                    variant="contained"
                    sx={{
                        bgcolor: "secondary.main",
                        color: "text.primary",
                        "&:hover": {
                            bgcolor: "secondary.main",
                            color: "primary.main",
                        },
                        "&:hover *": { fill: theme.palette.primary.main }
                    }}
                    startIcon={<NoteAddIcon sx={{ fill: theme.palette.text.primary }} aria-hidden="true"/>}
                >
                    Coupon de reduction
                </Button>
                {openAddCoupon && <AddCoupon open={openAddCoupon} close={setOpenAddCoupon} />}
               
            </Box>

            <Link style={{ color: theme.palette.text.primary }} to={"https://dashboard.stripe.com/acct_1S8wB7It5Bww8MdM/test/payments"} >Dashbord de payment stripe</Link>

        </>
    )
}
export default Stripe