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
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
        paddingY: 6,
      }}
    >
      {/* Intro Text */}
      <Box
        sx={{
          maxWidth: "800px",
          mx: "auto",
          mb: 4,
          px: 2,
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontSize: "1.1rem", color: "white", fontFamily: "Poppins" }}
        >
          Whether you're building a website, mobile app, or desktop solution,
          TechKhichdi helps you pick the perfect tech stack tailored to your
          project's needs. <br></br>Just tell us what you're building, and we’ll
          serve you a customized blend of frontend, backend, database, and
          deployment technologies — no overthinking, no jargon. <br></br>Think
          of it as your personal recipe for success in the tech kitchen!
        </Typography>
      </Box>

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
              textShadow: "2px 2px 10px rgba(0, 0, 0, 0.13)",
            }}
          >
            🍛 TechKhichdi
          </Typography>

          <Box mt={8} textAlign={"center"}>
            <Typography variant="h5" gutterBottom>
              Choose your platform
            </Typography>

            <Grid
              container
              spacing={3}
              justifyContent="center"
              sx={{ marginBottom: 3, fontFamily: "Poppins" }}
            >
              {renderCard("🌐 Website", "Browser", projectKind, setProjectKind)}
              {renderCard("📱 App", "App", projectKind, setProjectKind)}
            </Grid>

            {projectKind === "App" && (
              <>
                <Typography variant="h6" gutterBottom>
                  Which kind of app?
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                  {renderCard("📲 Mobile App", "Mobile", appType, setAppType)}
                  {renderCard("💻 Desktop App", "Desktop", appType, setAppType)}
                </Grid>
              </>
            )}

            {(projectKind === "Browser" ||
              (projectKind === "App" && appType)) && (
              <Button
                variant="contained"
                size="large"
                onClick={handleNext}
                sx={{
                  marginTop: 3,
                  background: "#63228fda",
                  color: "white",
                  fontWeight: "bold",
                  paddingX: 5,
                  paddingY: 1.2,
                  borderRadius: "999px",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    background: "6#3228f",
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
