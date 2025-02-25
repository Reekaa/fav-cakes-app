import React, { useEffect, useState } from "react";
import { getCakes } from "../api/cake";
import { Cake } from "../types/cake";
import CakeCard from "../components/CakeCard";
import "../components/CakeCard.css";
import "../components/CakeList.css"

const Home: React.FC = () => {
  const [cakes, setCakes] = useState<Cake[]>([]);

  useEffect(() => {
    getCakes().then(setCakes).catch(() => alert("Failed to load cakes!"));
  }, []);

  return (
    <div className="container">
      <h1>Favorite Cakes</h1>
      <div className="cake-list">
        {cakes.length > 0 ? (
          cakes.map((cake) => (
            <CakeCard key={cake.id} name={cake.name} imageUrl={cake.imageUrl} />
          ))
        ) : (
         <p>No cakes added yet.</p> // This should never happen as we load sample data to the db
        )}
      </div>
    </div>
  );
};

export default Home;