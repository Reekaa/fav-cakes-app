import React, { useEffect, useState } from "react";
import { getCakes } from "../api/cake";
import { Cake } from "../types/cake";
import CakeCard from "../components/CakeCard";
import { Container, Typography, Button, Grid2, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCakes()
      .then((data) => {
        setCakes(data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load cakes!");
        setLoading(false);
      });
  }, []);


  const routeChange = () => {
    navigate('/create');
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom align="center" color="text.primary">
        Favorite Cakes
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={routeChange}
        sx={{ mb: 4 }}
      >
        Add a New Cake
      </Button>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid2 container spacing={4} justifyContent="center">
          {cakes.length > 0 ? (
            cakes.map((cake) => (
                <Grid2 key={cake.id}>
                    <CakeCard cake={cake} />
                </Grid2>
            ))
          ) : (
            <Typography variant="h6" align="center">
              No cakes added yet.
            </Typography>
          )}
        </Grid2>
      )}
    </Container>
  );
};

export default Home;
