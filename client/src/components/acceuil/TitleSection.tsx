
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
                flexDirection: "column",
                gap: 1,
                mb: 3,
                height: "150px",
                width: "250px",
            
                justifyContent: "center",
            }}
        >
            <Typography color="text.primary" variant="h2">
                {title}
            </Typography>

            <Typography sx={{ fontStyle: "italic" }} variant="body1" color="text.secondary">
                {subtitle}
            </Typography>

            <Button
                onClick={() => navigate(url)}
                endIcon={<ArrowForwardIcon sx={{

                }} />}
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