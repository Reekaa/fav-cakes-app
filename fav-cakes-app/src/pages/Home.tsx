import React, { useEffect, useState } from "react";
import { getCakes } from "../api/cake";
import { Cake } from "../types/cake";
import CakeCard from "../components/CakeCard";
import {
  Container,
  Typography,
  Button,
  Grid2,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCakes()
      .then((data) => {
        setCakes(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setErrorMessage(err.response.data.error);
        setLoading(false);
      });
  }, []);

  const routeChange = () => {
    navigate("/create");
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom align="center" color="text.primary">
        Favorite Cakes
      </Typography>
      <Typography sx={{ p: 1, color: "red" }}>{errorMessage}</Typography>
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
            <Typography variant="h6" align="center" color="text.primary">
              No cakes added yet.
            </Typography>
          )}
        </Grid2>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={routeChange}
        sx={{ mb: 4, mt: 3 }}
      >
        Add a New Cake
      </Button>
    </Container>
  );
};

export default Home;
