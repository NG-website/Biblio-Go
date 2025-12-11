
import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";

interface TitleSectionProps {
    title: string,
    subtitle: string,
    url: string
}

function TitleSection({ title, subtitle, url }: TitleSectionProps) {
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: {xs:"row", sm:"column"},

                gap: 1,
                mt: {xs:0, sm:3},
                height: {xs:"60px", sm:"150px"},
                width: {xs:"100%", sm:"250px"},
            
                justifyContent: {xs:"space-around", sm:"left"},
                alignItems:{xs:"center", sm :"self-start"}
            }}
        >
            <Typography color="text.primary" variant="h2"   sx={{
                    fontSize: { xs: "20px", sm: "30px" }
                }}>
                {title}
            </Typography>

            <Typography  sx={{ fontStyle: "italic", display: { xs: "none", sm: "block" },  }} variant="body1" color="text.secondary">
                {subtitle}
            </Typography>

            <Button
                onClick={() => navigate(title)}
                endIcon={<ArrowForwardIcon />}
                sx={{
                    maxWidth: "150px",
                    color: "text.primary",

                }}
            >
                Tous voir
            </Button>
        </Box>
    );
}


export default TitleSection