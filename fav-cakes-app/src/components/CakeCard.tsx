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
    <Card data-testid='cake-card' onClick={handleClick} 
    sx={{ 
      cursor: 'pointer', 
      maxWidth: 345, 
      borderRadius: 2, 
      boxShadow: 3,
      '&:hover': {
        boxShadow: 6,
        transform: 'scale(1.05)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      },
    }}>
      <CardContent sx={{ ml: 2, mt: 3, mb: 2, mr: 2, width: '250px' }}>
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
