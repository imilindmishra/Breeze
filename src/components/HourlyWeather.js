import React from "react";
import { Box, Card, Typography, useTheme } from "@mui/material";

const HourlyWeather = ({ hourlyData }) => {
  const theme = useTheme();

  if (!hourlyData) return <p>No hourly data available.</p>;
  console.log(hourlyData);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        maxHeight: "90vh",
        bgcolor: theme.palette.background.paper, // Ensures the background fits theme
        padding: theme.spacing(2),
      }}
    >
      {hourlyData.map((hour, index) => (
        <Card
          key={index}
          sx={{
            margin: theme.spacing(1),
            padding: theme.spacing(2),
            bgcolor: theme.palette.background.default,
          }}
        >
          <Typography variant="h6">
            {`${new Date(hour.time_epoch * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {`Temperature: ${hour.temp_c}°C`}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {`Wind: ${hour.wind_kph} km/h`}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {`Humidity: ${hour.humidity}%`}
          </Typography>
          <img
            src={hour.condition.icon}
            alt="Weather icon"
            style={{ width: 50, height: 50 }}
          />
          <Typography variant="caption" display="block" gutterBottom>
            {hour.condition.text}
          </Typography>
        </Card>
      ))}
    </Box>
  );
};

export default HourlyWeather;
