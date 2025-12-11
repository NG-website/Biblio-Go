import { useLocation } from "react-router-dom";
import { Filter } from "./Context";
import { useEffect, useState, useRef } from "react";
import { Box, Button } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import theme from "../../../theme";
import { API_URL } from "../../../config";

function NavBar() {
  const { setFilter } = Filter();
  const url = useLocation();

  const [display, setDisplay] = useState(false);
  const [categories, setCategories] = useState<[]>([]);
  const [filterSelected, setFilterSelected] = useState(-3);

  const containerRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const manualScrollRef = useRef(false); // désactive auto-scroll si vrai

  const speed = 0.75; // pixels par tick
  const intervalMs = 16; // ~60fps
  const [offset, setOffset] = useState(0);
  const [totalWidth, setTotalWidth] = useState(0);

  // Récupération des catégories
  useEffect(() => {
    fetch(`${API_URL}api/book/categories`,{
      credentials:"include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
        console.log(data)
      });

    setDisplay(url.pathname === "/");
  }, [display]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = parseInt(e.currentTarget.id);
    setFilterSelected(id === -3 ? -3 : id );
    setFilter(id === -3 ? "" : id);
  };

  // Calcul largeur totale pour reset discret
  useEffect(() => {
    if (containerRef.current) {
      setTotalWidth(containerRef.current.scrollWidth / 2); // première moitié
    }
  }, [categories]);

  // Auto-scroll infini
  useEffect(() => {
    if (!categories.length || totalWidth === 0) return;

    const interval = setInterval(() => {
      if (hoverRef.current || manualScrollRef.current) return;

      setOffset((prev) => {
        let newOffset = prev + speed;
        if (newOffset >= totalWidth) newOffset -= totalWidth; // reset discret
        return newOffset;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [categories, totalWidth]);

  // On inclut "Tous" dans la liste originale et on double pour le loop
  const originalCategories = [{ id: -3, name: "Tous" }, ...categories];
  const loopedCategories = [...originalCategories, ...originalCategories];
  const totalLength = originalCategories.length;

  const baseButton = {
    fontSize: "clamp(10px, 1vw, 16px)",
    height: "90%",
    minWidth: "110px",
    "&:hover": {
      bgcolor: "primary.main",
      color: "white",
    },
    flexShrink: 0,
  };

  // Flèches pour scroll manuel
  const scrollLeft = () => {
    manualScrollRef.current = true;
    setOffset((prev) => {
      let newOffset = prev - 75;
      if (newOffset < 0) newOffset += totalWidth;
      return newOffset;
    });
  };

  const scrollRight = () => {
    manualScrollRef.current = true;
    setOffset((prev) => {
      let newOffset = prev + 75;
      if (newOffset >= totalWidth) newOffset -= totalWidth;
      return newOffset;
    });
  };

  return (
    <nav
      style={{
        gridRowStart: "2",
        gridRowEnd: "3",
        gridColumnStart: "2",
        gridColumnEnd: "4",
        display: display ? "block" : "none",
        alignSelf: "center",
        width: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <ArrowCircleLeftIcon
        onClick={scrollLeft}
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
        sx={{
          position: "absolute",
          left: 10,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 40,
          cursor: "pointer",
          zIndex: 10,
          fill: theme.palette.primary.main,
          backgroundColor: theme.palette.secondary.main,
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            fill: theme.palette.secondary.main,
          },
        }}
      />

      <ArrowCircleRightIcon
        onClick={scrollRight}
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
        sx={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 40,
          cursor: "pointer",
          zIndex: 10,
          fill: theme.palette.primary.main,
          backgroundColor: theme.palette.secondary.main,
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            fill: theme.palette.secondary.main,
          },
        }}
      />

      {/* Scroll infini */}
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          gap: "20px",
          transform: `translateX(-${offset}px)`,
          transition: "transform 0s linear",
          height: "80%",
          alignItems: "center",
        }}
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
      >
        {loopedCategories.map((category: any, index) => (
          <Button
            key={`${category.id}-${index}`}
            id={category.id.toString()}
            onClick={handleClick}
            sx={{
              textWrap: "nowrap",
              ...baseButton,
              bgcolor:
                filterSelected === (category.id === -3 ? -3 : index % totalLength)
                  ? "primary.main"
                  : "",
              color:
                filterSelected === (category.id === -3 ? -3 : index % totalLength)
                  ? "white"
                  : "text.primary",
            }}
            variant={
              filterSelected === (category.id === -3 ? -3 : index % totalLength)
                ? "contained"
                : "outlined"
            }
          >
            {category.name}
          </Button>
        ))}
      </Box>
    </nav>
  );
}

export default NavBar;
