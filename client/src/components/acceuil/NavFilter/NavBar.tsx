import { useLocation } from "react-router-dom";
import { Filter } from "./Context";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { Padding } from "@mui/icons-material";

function NavBar() {
  const { setFilter } = Filter();
   
  const url = useLocation();
  const [display, setDisplay] = useState(false);
  const [categories, setCategories] = useState<[]>([]);
  const [filterSelected, setFilterSelected] = useState(-3);

  useEffect(() => {
    fetch("http://localhost:3000/api/book/categories")
      .then((res) => {
        if (!res.ok) console.log(res);
        return res.json();
      })
      .then((data) => setCategories(data));

    setDisplay(url.pathname === "/");
  }, [url]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = parseInt(e.currentTarget.id);
    setFilterSelected(id === -3 ? -3 : id - 1);
    setFilter(id === -3 ? "" : id);
  };

   const buttonBaseStyle = {
    // margin:0
     fontSize:"clamp(10px, 1vw, 16px)",
  //   listStyle: "none",
  //   cursor: "pointer",
    height: "90%",
    minWidth : "110px",
  //   alignContent: "center",
  //   borderRadius: "5px",
  //   paddingLeft: "10px",
  //   paddingRight: "10px",
  //   textTransform: "none",
  //   borderColor: "transparent",
  //   transition: "all 0.2s ease",
     "&:hover": {
      bgcolor: "primary",
     color: "white",
   },
   };

  return (
    <nav
      style={{
        gridRowStart: "2",
        gridRowEnd: "3",
        gridColumnStart: "2",
        gridColumnEnd: "4",
        display: display ? "block" : "none",
        width:"100%",
        overflowX:"auto",
        
        //scrollbarWidth:"none"
      }}
    >
      <Box
        sx={{
          height: "80%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textWrap:"nowrap",
          gap:" 20px",
        }}
      >
        {/* Bouton "Tous" */}
        <Button
          id="-3"
          onClick={handleClick}
          sx={{
             ...buttonBaseStyle,
            bgcolor: filterSelected === -3 ? "primary" : "white",
            color: filterSelected === -3 ? "black" : "black",
          }}
          variant={filterSelected === -3 ? "contained" : "outlined"}
        >
          Tous
        </Button>

        {/* Boutons dynamiques */}
        {categories.map((category, i) => (
          <Button
            key={category.id}
            id={category.id.toString()}
            onClick={handleClick}
            sx={{
               ...buttonBaseStyle,
              bgcolor: filterSelected === i ? "primary" : "secondary",
              color: filterSelected === i ?   "secondary" :"text.primary",
            }}
            variant={filterSelected === i ? "contained" : "outlined"}
          >
            {category.name}
          </Button>
        ))}
      </Box>
    </nav>
  );
}

export default NavBar;
