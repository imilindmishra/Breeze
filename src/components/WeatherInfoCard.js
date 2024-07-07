import { Card, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#1E293B",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "150px",
  height: "100px",
  boxShadow:
    "0px 4px 10px rgba(0, 0, 0, 0.5), 0 0 15px 5px rgba(67, 181, 255, 0.6)", // Added blueish glow
  [theme.breakpoints.down("sm")]: {
    width: "120px",
    height: "80px",
    padding: theme.spacing(1),
  },
}));

const WeatherInfoCard = ({ icon, label, value }) => {
  return (
    <StyledCard>
      <Box
        sx={{
          fontSize: { xs: 30, sm: 40 }, // Responsive font size
        }}
      >
        {icon}
      </Box>
      <Typography
        sx={{
          color: "#67e8f9",
          fontSize: { xs: "0.8rem", sm: "1rem" }, // Responsive font size
        }}
        variant="subtitle1"
      >
        {label}
      </Typography>
      <Typography
        sx={{
          color: "#22D3EE",
          fontSize: { xs: "1rem", sm: "1.25rem" }, // Responsive font size
        }}
        variant="h6"
      >
        {value}
      </Typography>
    </StyledCard>
  );
};

export default WeatherInfoCard;
