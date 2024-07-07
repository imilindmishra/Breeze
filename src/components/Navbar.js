import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import AirIcon from "@mui/icons-material/Air";
import SideBar from "./SideBar";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Autocomplete,
  TextField,
  useTheme,
  useMediaQuery,
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import axios from "axios";

const FloatingAppBar = styled(AppBar)(({ theme }) => ({
  position: "fixed",
  top: theme.spacing(2),
  marginBottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "95%",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#030712",
  zIndex: theme.zIndex.drawer + 1, // Ensure NavBar is always on top
  [theme.breakpoints.down("sm")]: {
    top: 0,
    width: "100%",
    borderRadius: 0,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

const Search = styled(Autocomplete)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  width: "300px",
  [theme.breakpoints.up("sm")]: {
    width: "400px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

export default function NavBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const loadSuggestions = async () => {
      if (query.length > 2) {
        const apiKey = process.env.REACT_APP_WEATHERAPI_KEY;
        const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`;

        try {
          const { data } = await axios.get(url);
          setOptions(data.map((item) => item.name));
        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
          setOptions([]);
        }
      }
    };

    loadSuggestions();
  }, [query]);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleInputChange = debounce((newValue) => {
    setQuery(newValue);
  }, 300);

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  return (
    <>
      <CssBaseline />
      <FloatingAppBar elevation={4}>
        <StyledToolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 0,
              width: isMobile ? "100%" : "auto",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {isMobile && (
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={toggleSideBar}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ ml: 1 }}
                style={{
                  color: "#67e8f9",
                  fontWeight: "600",
                  fontSize: isMobile ? "20px" : "25px",
                }}
              >
                <AirIcon style={{ marginRight: 2, marginTop: 2 }} /> Breeze
              </Typography>
            </Box>
          </Box>
          <SearchContainer>
            <Search
              freeSolo
              options={options}
              onInputChange={(event, newValue) => {
                event && handleInputChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={!query && !isFocused ? "Search Location" : ""}
                  variant="outlined"
                  size="small"
                  fullWidth
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    setIsFocused(false);
                    if (!params.inputProps.value) {
                      setQuery("");
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    placeholder: !query && !isFocused ? "Search Location" : "",
                  }}
                />
              )}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSearch}
              fullWidth={isMobile}
            >
              Search
            </Button>
          </SearchContainer>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {!isMobile && (
              <IconButton
                color="inherit"
                sx={{ mr: 0 }}
                onClick={toggleSideBar}
              >
                <AccountCircle />
              </IconButton>
            )}
          </Box>
        </StyledToolbar>
      </FloatingAppBar>
      <SideBar open={sideBarOpen} onClose={toggleSideBar} />
    </>
  );
}
