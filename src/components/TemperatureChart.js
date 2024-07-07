import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { Box, useTheme, useMediaQuery } from "@mui/material";

ChartJS.register(...registerables);

const TemperatureChart = ({ forecastData }) => {
  const [pointStyle, setPointStyle] = useState("circle");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      animations: {
        radius: {
          duration: 400,
          easing: "linear",
          loop: (context) => context.active,
        },
      },
      interaction: {
        mode: "nearest",
        intersect: false,
        axis: "x",
      },
      plugins: {
        tooltip: {
          enabled: true,
        },
        title: {
          display: true,
          text: "Temperature Trends",
          font: {
            size: isMobile ? 14 : 18,
          },
        },
        legend: {
          display: !isMobile,
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: isMobile ? 8 : 12,
            },
            maxRotation: isMobile ? 90 : 0,
            minRotation: isMobile ? 90 : 0,
          },
        },
        y: {
          ticks: {
            font: {
              size: isMobile ? 8 : 12,
            },
          },
        },
      },
      elements: {
        point: {
          radius: isMobile ? 3 : 5,
          hoverRadius: isMobile ? 5 : 7,
        },
        line: {
          tension: 0.4,
        },
      },
      hoverRadius: isMobile ? 8 : 12,
      hoverBackgroundColor: "yellow",
    };

    setChartOptions(options);
  }, [isMobile]);

  const data = {
    labels: forecastData.map((day) => day.date),
    datasets: [
      {
        label: "Max Temperature (°C)",
        data: forecastData.map((day) => day.day.maxtemp_c),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointStyle: pointStyle,
        pointRadius: isMobile ? 3 : 10,
        pointHoverRadius: isMobile ? 5 : 15,
      },
    ],
  };

  return (
    <Box sx={{ height: isMobile ? 300 : 400, width: "100%" }}>
      <Line data={data} options={chartOptions} />
    </Box>
  );
};

export default TemperatureChart;