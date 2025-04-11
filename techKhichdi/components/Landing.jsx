import React, { useState } from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Button,
  Box,
  Paper,
} from "@mui/material";

const Landing = () => {
  const [projectKind, setProjectKind] = useState(null);
  const [appType, setAppType] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/survey");
  };

  const cardBaseStyle = {
    transition: "0.3s",
    borderRadius: "1rem",
    backgroundColor: "#f5f5f5",
    border: "2px solid transparent",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    "&:hover": {
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    },
  };

  const renderCard = (label, value, selectedValue, onClick) => (
    <Grid item xs={12} sm={6}>
      <Card
        onClick={() => onClick(value)}
        sx={{
          ...cardBaseStyle,
          borderColor: selectedValue === value ? "#b030b0" : "transparent",
          backgroundColor: selectedValue === value ? "#f0e6f8" : "#f9f9f9",
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography
              variant="h6"
              align="center"
              sx={{ fontWeight: 600, fontSize: "1.2rem", color: "#202060" }}
            >
              {label}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // background: `linear-gradient(135deg, #202060, #602080, #b030b0, #6c91bf, #5bc8af)`,
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
        paddingY: 6,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={5}
          sx={{
            padding: 4,
            borderRadius: 4,
            backgroundColor: "#fff",
            backdropFilter: "blur(10px)",
            color: "white",
          }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontFamily: "Poppins, sans-serif",
              color: "#000000",
              textShadow: "2px 2px 10px rgba(0,0,0,0.4)",
            }}
          >
            🍛 TechKhichdi
          </Typography>

          <Box mt={5}>
            <Typography variant="h5" gutterBottom>
              What kind of project are you making?
            </Typography>

            <Grid container spacing={3} sx={{ marginBottom: 3 }}>
              {renderCard("🌐 Browser-based", "Browser", projectKind, setProjectKind)}
              {renderCard("📱 App", "App", projectKind, setProjectKind)}
            </Grid>

            {projectKind === "App" && (
              <>
                <Typography variant="h6" gutterBottom>
                  Which kind of app?
                </Typography>
                <Grid container spacing={3}>
                  {renderCard("📲 Mobile App", "Mobile", appType, setAppType)}
                  {renderCard("💻 Desktop App", "Desktop", appType, setAppType)}
                </Grid>
              </>
            )}

            {(projectKind === "Browser" || (projectKind === "App" && appType)) && (
              <Button
                variant="contained"
                size="large"
                onClick={handleNext}
                sx={{
                  marginTop: 4,
                  background: "radial-gradient(circle at center, #b030b0, #602080)",
                  color: "white",
                  fontWeight: "bold",
                  paddingX: 5,
                  paddingY: 1.2,
                  borderRadius: "999px",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    background: "radial-gradient(circle at center, #5bc8af, #202060)",
                  },
                }}
              >
                Next →
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Landing;