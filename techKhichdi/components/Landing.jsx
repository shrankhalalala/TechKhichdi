import React, { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Button,
} from "@mui/material";

const Landing = ({ onNext }) => {
  const [projectKind, setProjectKind] = useState(null);
  const [appType, setAppType] = useState(null);

  const handleNext = () => {
    onNext({ projectKind, appType });
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
    <>
      <Typography variant="h5" gutterBottom >
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
              background:
                "radial-gradient(circle at center, #5bc8af, #202060)",
            },
          }}
          onClick={handleNext}
        >
          Next →
        </Button>
      )}
    </>
  );
};

export default Landing;