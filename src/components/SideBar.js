import React, { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { auth, db } from "../firebase"; // Adjust the import path as necessary
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const drawerWidth = 240;

export default function SideBar({ open, onClose, onCitySelect }) {
  // Add onCitySelect as a prop
  const [user, setUser] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFavoriteCities(docSnap.data().favoriteCities || []);
        }
      } else {
        setUser(null);
        setFavoriteCities([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);

      // Check if the user already exists in Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // If not, create a new user document
        await setDoc(docRef, {
          email: user.email,
          favoriteCities: [],
        });
      } else {
        setFavoriteCities(docSnap.data().favoriteCities || []);
      }
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setFavoriteCities([]);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleAddCity = async () => {
    if (city && user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        favoriteCities: arrayUnion(city),
      });
      setFavoriteCities([...favoriteCities, city]);
      setCity("");
    }
  };

  const handleCityClick = async (cityName) => {
    try {
      const apiKey = process.env.REACT_APP_WEATHERAPI_KEY;
      const weatherResponse = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7`
      );
      onCitySelect(weatherResponse.data); // Pass the weather data to the parent component
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        zIndex: (theme) => theme.zIndex.appBar + 1, // Ensure it's above the AppBar
      }}
    >
      <Box
        sx={{
          width: drawerWidth,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "#172554",
          color: "white",
        }}
        role="presentation"
      >
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <h3
            style={{
              color: "#67e8f9",
              fontWeight: "600",
              fontSize: "25px",
            }}
          >
            Breeze
          </h3>
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        {user && (
          <Box sx={{ p: 2 }}>
            <TextField
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              fullWidth
              sx={{ backgroundColor: "white", borderRadius: 1, mb: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<AddIcon />}
              onClick={handleAddCity}
            >
              Add
            </Button>
            <List>
              {favoriteCities.map((city, index) => (
                <Card
                  key={index}
                  sx={{
                    mt: 1,
                    borderRadius: 2,
                    backgroundColor: "#030712",
                    padding: 0,
                    cursor: "pointer",
                  }}
                  onClick={() => handleCityClick(city)}
                >
                  <CardContent style={{ margin: 4, padding: 2 }}>
                    <Typography
                      style={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: "20px",
                      }}
                    >
                      {city}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </List>
          </Box>
        )}
        <Box sx={{ p: 2 }}>
          {!user ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}
