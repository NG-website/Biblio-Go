import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface MainProps {
    children: React.ReactNode,
}

function Main({ children }: MainProps) {
    const [url, setUrl] = useState(false)
    const location = useLocation()
    console.log(location)
    const navigate = useNavigate()
    // const filter = Filter()
    // console.log(filter)

    useEffect(() => {
      //  window.scrollTo(0, 0);
        if (location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/forgot") {
            setUrl(true)
        } else {
            setUrl(false)
        }
    }, [location.pathname])

    return (
        <main
            style={{
                gridRowStart: "3",
                gridRowEnd: "4",
                gridColumnStart: "2",
                gridColumnEnd: "4",
                borderRadius: "25px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflowY: "auto",
                overflowX: "hidden",
                backgroundImage: url ? "url('/George-peabody-library.jpg')" : "",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
            }}
        >
            {location.pathname === '/' ? null : <ArrowBackIcon onClick={() => { navigate(-1) }}
                sx={{
                    fontSize: { xs: "25px", md: "50px" },
                    position: "absolute",
                    left: 10,
                    top: 10
                }} />}
            {children}
        </main>
    )
}
export default Main