import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherDisplay from "./components/WeatherDisplay";
import ForecastDisplay from "./components/ForecastDisplay";
import TemperatureChart from "./components/TemperatureChart";
import NavBar from "./components/Navbar";
import SideBar from "./components/SideBar";
import {
  Card,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";

function App() {
  const [weather, setWeather] = useState({
    current: null,
    forecast: null,
    error: null,
  });

  const [sideBarOpen, setSideBarOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchWeather = async (location) => {
    const apiKey = process.env.REACT_APP_WEATHERAPI_KEY;
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&hour=yes&alerts=yes&day=yes`;

    try {
      const response = await axios.get(url);
      if (response.data) {
        console.log(response.data);
        setWeather({
          current: response.data.current,
          day: response.data.forecast.forecastday,
          forecast: response.data.forecast.forecastday,
          location: response.data.location.name,
          Description: response.data.alerts,
          error: null,
        });
      } else {
        throw new Error("No data returned from the API");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather({
        current: null,
        forecast: null,
        error: "Failed to fetch weather data.",
      });
    }
  };

  useEffect(() => {
    fetchWeather("Delhi");
  }, []);

  

  return (
    <Box
      sx={{
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        overflowX: "hidden",
        background: "radial-gradient(circle at top left, #2e1065, #0f172a)",
      }}
    >
      <NavBar onSearch={fetchWeather} />
      <SideBar
        open={sideBarOpen}
        onClose={() => setSideBarOpen(false)}
        
      />
      <Box
        className="App"
        sx={{
          marginTop: isMobile ? "100px" : "40px", // Ensure padding top is greater than the NavBar height
          paddingTop: isMobile ? "80px" : "100px", // Ensure padding top is greater than the NavBar height
          display: "flex",
          justifyContent: "center",
          paddingLeft: isMobile ? "10px" : "20px",
          paddingRight: isMobile ? "10px" : "20px",
          width: "100%",
        }}
      >
        <Grid container spacing={isMobile ? 1 : 2} justifyContent="center">
          <Grid item xs={12} md={6}>
            {weather.error && <p>{weather.error}</p>}
            {weather.current && (
              <Card
                sx={{
                  padding: isMobile ? 1 : 2,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  marginBottom: isMobile ? 1 : 2,
                  backgroundColor: "#030712",
                  marginLeft: isMobile ? 0 : 3,
                }}
              >
                <WeatherDisplay
                  weatherData={weather.current}
                  location={weather.location}
                  day={weather.day[0]}
                />
              </Card>
            )}

            {weather.forecast && (
              <Card
                sx={{
                  padding: isMobile ? 1 : 2,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  marginTop: isMobile ? 1 : 2,
                  marginBottom: isMobile ? 1 : 2,
                  backgroundColor: "#030712",
                  color: "white",
                  marginLeft: isMobile ? 0 : 3,
                }}
              >
                <TemperatureChart forecastData={weather.forecast} />
              </Card>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {weather.current && (
              <Grid
                container
                spacing={isMobile ? 1 : 2}
                marginBottom={isMobile ? 1 : 2}
              >
                <Grid item xs={6}>
                  <Card
                    sx={{
                      padding: isMobile ? 1 : 2,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      backgroundColor: "#030712",
                      color: "white",
                      marginBottom: isMobile ? 1 : 0,
                    }}
                  >
                    <Typography variant={isMobile ? "body2" : "body1"}>
                      <span style={{ color: "#67e8f9" }}>Humidity:</span>{" "}
                      {weather.current.humidity}%
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card
                    sx={{
                      padding: isMobile ? 1 : 2,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      backgroundColor: "#030712",
                      color: "white",
                      marginRight: isMobile ? 0 : 7,
                    }}
                  >
                    <Typography variant={isMobile ? "body2" : "body1"}>
                      <span style={{ color: "#67e8f9" }}>Wind Speed: </span>{" "}
                      {weather.current.wind_kph} km/h
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            )}
            {weather.forecast && (
              <Card
                sx={{
                  padding: isMobile ? 1 : 2,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "#030712",
                  color: "white",
                  marginRight: isMobile ? 0 : 7,
                }}
              >
                <ForecastDisplay forecastData={weather.forecast} />
              </Card>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
