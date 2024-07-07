import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const WeatherDisplay = ({ weatherData, location, day }) => {
  if (!weatherData) return <p>No current weather data available.</p>;

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "rgba(3, 7, 18, 0.5)", // Semi-transparent version of #030712
        backdropFilter: "blur(10px)",
        color: "white",
        marginTop: "5px",
        padding: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: "#67e8f9",
        }}
      >
        <Typography variant="subtitle1">Current Weather</Typography>
        <Typography variant="body2">Current Time: {currentTime}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: 1,
        }}
      >
        <img
          src={day.day.condition.icon}
          alt="Weather condition"
          style={{ width: 50, height: 50, marginRight: 2 }}
        />
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            fontSize: "30px",
            marginRight: 2,
          }}
        >
          {location}
        </Typography>
        <Typography
          variant="body2"
          sx={{ flexGrow: 3, textAlign: "left", fontSize: "18px" }}
        >
          The Climate is {weatherData.condition.text}
        </Typography>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body1" style={{ fontSize: "18px" }}>
          Temperature: {weatherData.temp_c}°C
        </Typography>
      </Box>
    </Paper>
  );
};

export default WeatherDisplay;
