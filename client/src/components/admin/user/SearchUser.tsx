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
  IconButton,
  Grow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchUser() {
  const [data, setData] = useState([]);
  const [author, setAuthor] = useState([]);
  const [choiceUser, setChoiceUser] = useState(false);
  const [choiceValueInput, setChoiceValueInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [prop, setProp] = useState(false);
  const [loading, setLoading] = useState(false);

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
    fetch("http://localhost:3000/user/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: value }),
    })
      .then((r) => {
        console.log(r)
        if (!r.ok) throw new Error("Erreur de requête");
        return r.json();
      })
      .then((db) => {
        console.log(db)
        if (!db || db.length === 0) {
          setData([{ id: 0, name: "Aucun résultat" }]);
          setAuthor([]);
        } else {
          setData(db[0] || []);
          setAuthor(db[1] || []);
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

    setTimeout(() => {
    //   window.location.href = `http://localhost:5173/${url}`;
    }, 800);
  };

  const clearChoice = () => {
    setTimeout(() => setProp(false), 100);
  };

  return (
    <Box sx={{ position: "relative", width: 350, mx: "auto" }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Rechercher un user"
        size="small"
        value={choiceUser ? choiceValueInput : valueInput}
        onChange={SearchDataAutoCompleted}
        onBlur={clearChoice}
        onFocus={() => setProp(true)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton size="small" disabled>
                <SearchIcon sx={{ color: "orange" }} />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: loading && <CircularProgress size={18} sx={{ color: "orange" }} />,
        }}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "50px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "50px",
            "& fieldset": {
              borderColor: "#ccc",
            },
            "&:hover fieldset": {
              borderColor: "orange",
            },
            "&.Mui-focused fieldset": {
              borderColor: "orange",
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
                  "&:hover": {
                    backgroundColor: "rgba(255, 152, 0, 0.1)",
                  },
                }}
              >
                <ListItemText primary={d.name} />
                <Chip label="Book" size="small" sx={{ bgcolor: "orange", color: "white" }} />
              </ListItemButton>
            ))}
            {author.map((a, i) => (
              <ListItemButton
                // key={`author-${i}`}
                data-id={a.id}
                data-name={a.name}
                // data-categories="user"
                onMouseDown={valueChoice}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 152, 0, 0.1)",
                  },
                }}
              >
                <ListItemText primary={a.name} />
                <Chip label="Author" size="small" sx={{ bgcolor: "#ff9800", color: "white" }} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </Grow>
    </Box>
  );
}
