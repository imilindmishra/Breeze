import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud"; // Import other weather icons as needed
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#030712",
  color: "white",
  overflowY: "auto", // Make container scrollable
  height: "500px", // Fixed height
   // 2/5 of the screen width
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Shadow effect
  marginLeft: "5px", // Left align the container
  "&::-webkit-scrollbar": {
    width: "1px", // Reducing the width of the scrollbar
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)", // Style the track
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "darkgrey", // Style the thumb of the scrollbar
    outline: "1px solid slategrey", // Style the outline of the thumb
  },
}));

const ForecastDisplay = ({ forecastData }) => {
  if (!forecastData) return <p>No forecast data available.</p>;

  return (
    <StyledBox marginRight={2}>
      <Typography
        variant="h4"
        component="h3"
        style={{ color: "#67e8f9" }}
        gutterBottom
        fontSize={25}
      >
        7-Day Weather Forecast
      </Typography>
      <Grid container spacing={2}>
        {forecastData.map((day, index) => (
          <Grid item xs={12} key={index}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 2,
                border: "none",
                color: "white",
                backgroundColor: "#1E293B",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 2,
                }}
              >
                <img
                  src={day.day.condition.icon}
                  alt="Weather condition"
                  style={{
                    width: 100,
                    height: 100,
                  }}
                />
              </Box>
              <Box>
                <Typography variant="h6" component="div">
                  {day.date}
                </Typography>
                <Typography
                  style={{ color: "white" }}
                  variant="body2"
                  color="text.secondary"
                >
                  {day.day.condition.text}
                </Typography>
                <Typography variant="body1">
                  Temp: {day.day.maxtemp_c}°C / {day.day.mintemp_c}°C
                </Typography>
                <Typography variant="body2">
                  Wind: {day.day.maxwind_kph} km/h
                </Typography>
                <Typography variant="body2">
                  Humidity: {day.day.avghumidity}%
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </StyledBox>
  );
};

export default ForecastDisplay;
