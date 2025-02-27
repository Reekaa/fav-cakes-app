import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Cake } from "../types/cake";

interface CakeCardProps {
  cake: Cake;
}

const CakeCard: React.FC<CakeCardProps> = ({ cake }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/cakes/${cake.id}`);
  }
  
  return (
    <Card onClick={handleClick} sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
          {cake.name}
        </Typography>
        <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
          {cake.imageUrl}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CakeCard;
