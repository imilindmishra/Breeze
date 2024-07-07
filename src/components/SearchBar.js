import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query); // Fetch weather data for the entered query
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Enter city name or coordinates"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </form>
  );
};
export default SearchBar;
