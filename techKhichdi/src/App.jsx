import React, { useState } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import Landing from "../components/Landing";
import "./index.css"

function App() {
  const [stage, setStage] = useState("landing");
  const [projectInfo, setProjectInfo] = useState({});

  const handleLandingNext = (info) => {
    setProjectInfo(info);
    setStage("form");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, #202060, #602080, #b030b0, #6c91bf, #5bc8af)`,
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
            {stage === "landing" && <Landing onNext={handleLandingNext} />}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;