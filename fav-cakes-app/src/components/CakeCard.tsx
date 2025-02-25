import React from 'react';
import "./CakeCard.css";

interface CakeCardProps {
  name: string;
  imageUrl: string;
}

const CakeCard: React.FC<CakeCardProps> = ({ name, imageUrl }) => {
  return (
    <div className="cake-card">
      <h3 className="cake-card-title">{name}</h3>
      <h4 className="cake-card-image-text">{imageUrl}</h4>
    </div>
  );
};

export default CakeCard;
