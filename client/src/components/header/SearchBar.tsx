import React, { useState } from "react";
import {
  Box,
  TextField,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Chip,
  CircularProgress,
  InputAdornment,
  Grow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import theme from "../../theme";
import { API_URL } from "../../config";
import { Link, useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [data, setData] = useState([]);
  const [author, setAuthor] = useState([]);
  const [choiceUser, setChoiceUser] = useState(false);
  const [choiceValueInput, setChoiceValueInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [prop, setProp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const SearchDataAutoCompleted = (e) => {
    const value = e.target.value;
    setChoiceUser(false);
    setProp(true);
    setValueInput(value);

    if (value.trim() === "") {
      setData([]);
      setAuthor([]);
      return;
    }

    setLoading(true);
    fetch(`${API_URL}api/book/autocompleted`, {
      method: "POST",
      credentials:"include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: value }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Erreur de requête");
        return r.json();
      })
      .then((db) => {
        console.log(db)

        if (!db) {
          setData([{ id: 0, name: "Aucun résultat" }]);
          setAuthor([{ id: 0, name: "Aucun résultat" }]);
        } else {
          setData(db[0]);
          setAuthor(db[1]);
        }

        if (db[0].length != 0 && db[1].length === 0) {
          setAuthor([{ id: 0, name: "Aucun résultat" }])
          setData(db[0]);

        }

        if (db[0].length === 0 && db[1].length != 0) {
          setData([{ id: 0, name: "Aucun résultat" }]);
          setAuthor(db[1])
        }

        if (db[0].length === 0 && db[1].length === 0) {
          setData([{ id: 0, name: "Aucun résultat" }]);
          setAuthor([{ id: 0, name: "Aucun résultat" }])
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const valueChoice = (e) => {
    const category = e.currentTarget.dataset.categories;
    const id = e.currentTarget.dataset.id;
    const name = e.currentTarget.dataset.name;

    setChoiceUser(true);
    setChoiceValueInput(name);

    const url = `${category}/${id}`;
    document.body.style.background = "linear-gradient(rgb(0, 0, 0),#06060697)";
    document.body.style.opacity = "0";

   // setTimeout(() => {
   console.log("url", url)
      navigate(`${category}/${id}`)
     // window.location.href = `${FRONT_URL}${url}`;
    //}, 800);
  };

  const clearChoice = () => {
    setTimeout(() => setProp(false), 100);
  };

  return (
    <Box sx={{ position: "relative", maxWidth: 400, width: "100%", mx: "auto" }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Rechercher un livre ou un auteur"
        size="small"
        value={choiceUser ? choiceValueInput : valueInput}
        onChange={SearchDataAutoCompleted}
        onBlur={clearChoice}
        onFocus={() => setProp(true)}
        InputProps={{
          startAdornment: (
            <InputAdornment >
              <SearchIcon sx={{ fill: theme.palette.primary.main }} />
            </InputAdornment>
          ),
          endAdornment: loading && <CircularProgress size={18} sx={{ color: theme.palette.text.primary }} />,
        }}
        sx={{
          backgroundColor: "background.default",
          borderRadius: "50px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "50px",
            "& fieldset": {
              borderColor: theme.palette.primary.main,
            },
            "&:hover fieldset": {
              borderColor: theme.palette.primary.main,
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.primary.main,
              borderWidth: 2,
            },
          },
        }}
      />

      <Grow in={prop && (data.length > 0 || author.length > 0)}>
        <Paper
          elevation={4}
          sx={{
            position: "absolute",
            top: "105%",
            left: 0,
            right: 0,
            maxHeight: 200,
            overflowY: "auto",
            borderRadius: 2,
            mt: 1,
            zIndex: 10,
            transformOrigin: "top center",
          }}
        >
          <List dense>
            {data.map((d, i) => (
              <ListItemButton
                key={`book-${i}`}
                data-id={d.id}
                data-name={d.name}
                data-categories="book"
                onMouseDown={valueChoice}
                sx={{
                  "& .MuiTypography-root": {
                    color: "text.primary"
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255, 152, 0, 0.1)",
                  },
                }}
              >
                <ListItemText primary={d.name} />
                <Chip label="Book" size="small" sx={{ bgcolor: theme.palette.primary.main }} />
              </ListItemButton>
            ))}
            {author.map((a, i) => (
              <Link to={`author/${a.id}`}>
              <ListItemButton
                key={`author-${i}`}
                data-id={a.id}
                data-name={a.firstname}
                data-categories="author"
                onMouseDown={valueChoice}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 152, 0, 0.1)",
                  },
                  "& .MuiTypography-root": {
                    color: "text.primary"
                  }
                }}
              >
                <ListItemText primary={a.firstname + " " + a.lastname} />
                <Chip label="Author" size="small" sx={{ bgcolor: theme.palette.primary.main }} />
              </ListItemButton>
              </Link>
            ))}
          </List>
        </Paper>
      </Grow>
    </Box>
  );
}
