import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface CakeCardProps {
  name: string;
  imageUrl: string;
}

const CakeCard: React.FC<CakeCardProps> = ({ name, imageUrl }) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
          {name}
        </Typography>
        <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
          {imageUrl}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CakeCard;
